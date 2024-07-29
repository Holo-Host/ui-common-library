import { inspect } from 'util'
import { AdminWebsocket, AppWebsocket } from '@holochain/client'
import { defineStore } from 'pinia'
import { presentHcSignal, listify } from '../utils'
import useIsLoadingStore from './useIsLoadingStore'
import useSignalStore from './useSignalStore'
import { kycLevel2 } from '../services/hbs'
import { hposHolochainCall } from '../services/hpos'

const __HC_LAUNCHER_ENV__ = "__HC_LAUNCHER_ENV__";
const __HC_ZOME_CALL_SIGNER__ = "__HC_ZOME_CALL_SIGNER__";
const isLauncher = () => globalThis.window && __HC_LAUNCHER_ENV__ in globalThis.window;
const getLauncherEnvironment = () => isLauncher() ? globalThis.window[__HC_LAUNCHER_ENV__] : undefined;

const HC_APP_TIMEOUT = 35_000

const makeUseHolochainStore = ({ installed_app_id, app_ws_url, hc_admin_port }) => defineStore('holochain', {
  state: () => ({
    client: null,
    // These two values are subscribed to by clientStore
    appInfo: null,
    isReady: false,
    isLauncherEnv: false,
    adminWebsocketCache: null,
    signingCredentialsCache: {}, // An installed app may have multiple cells, therefore we create a map of signing credentials per cell id 
    happConnectionCache: {}
  }),
  getters: {
    isAnonymous: _ => false, // for compatibility with holo
    agentEmail: _ => null, // for compatibility with holo
  },
  actions: {
    // BEGIN useInterfaceStore methods

    async initialize() {
      try {
        let happConnectionExpiration = this.happConnectionCache["expiresAt"];
        let happConnectionToken = this.happConnectionCache["token"];
        let launcherEnv = getLauncherEnvironment();

        if (!!launcherEnv) {
          this.isLauncherEnv = true;
          if (!launcherEnv.APP_INTERFACE_TOKEN) {
            console.warn(`Failed to locate the app interface token for app in launcher env: ${launcherEnv}`);
          }
          if (!launcherEnv.APP_INTERFACE_PORT) {
            console.warn(`Failed to locate the app interface port for app in launcher env: ${launcherEnv}`);
          }
          this.happConnectionCache["token"] = launcherEnv.APP_INTERFACE_TOKEN;
          happConnectionToken = launcherEnv.APP_INTERFACE_TOKEN;
          app_ws_url = `ws:localhost:${launcherEnv.APP_INTERFACE_PORT}`
        } else if (!happConnectionToken || !happConnectionExpiration || happConnectionExpiration <= Date.now()) {
            if (!this.adminWebsocketCache) {
              this.adminWebsocketCache = await AdminWebsocket.connect({
                url: new URL(`ws:localhost:${hc_admin_port}`),
                wsClientOptions: { origin: 'ui-common-lib' },
              });
            }
            let adminWs = this.adminWebsocketCache;
            const issuedToken = await adminWs.issueAppAuthenticationToken({
              installed_app_id,
              expiry_seconds: 0,
            });
  
            this.happConnectionCache["expiresAt"] = issuedToken.expires_at;
            this.happConnectionCache["token"] = issuedToken.token;
            happConnectionToken = issuedToken.token
          }

        console.log("app_ws_url : ", app_ws_url)
        console.log("happConnectionToken : ", happConnectionToken)

        holochainClient = await AppWebsocket.connect({
          url: new URL(app_ws_url),
          wsClientOptions: { origin: 'ui-common-lib' },
          token: happConnectionToken, // do we need this for launcher?
          defaultTimeout: HC_APP_TIMEOUT,
        })
          
        console.log("holochainClient : ", happConnectionToken)

        holochainClient.on("signal", useSignalStore().handleSignal(presentHcSignal(signal)));
        this.client = holochainClient

        holochainClient.client.socket.onclose = function(e) {
          console.log(
            'Socket to Holochain App Interface has closed.',
            inspect(e)
          )
          this.client = null
          this.isReady = false
        }

        this.loadAppInfo()
      } catch (e) {
        console.error('Holochain connection error ', e)
        this.isReady = false
      }
    },

    async loadAppInfo() {
      try {
        const appInfo = await this.client.appInfo({
          installed_app_id
        })
        this.appInfo = appInfo
        this.isReady = true

        return appInfo
      } catch (error) {
        console.error('appInfo() returned error.', inspect(error))
      }
    },

    async callZome(args) {
      const { zome_name, fn_name } = args
      if (!this.appInfo) {
        throw new Error('Tried to make a zome call before storing appInfo')
      }
  
      useIsLoadingStore().callIsLoading({ zome_name, fn_name })

      try {
        return await this.holochainCallZome(args)
      } finally {
        useIsLoadingStore().callIsNotLoading({ zome_name, fn_name })
      }
    },

    async provideMemproofs(memproofs) {
      await this.client.provideMemproofs(memproofs)
       // attempt to enable after providing memproofs (we don't need to do this on the holo side because envoy does it automatically)
      return this.client.enableApp()
    },

    // END useInterfaceStore methods
    // BEGIN holochain specific methods

    async holochainCallZome(args) {
      const { zome_name, fn_name, payload, role_name } = args

      const cell_info = this.appInfo.cell_info[role_name][0]
      const cellId = cell_info?.provisioned?.cell_id

      if (!cellId) {
        throw new Error(`Couldn't find provisioned cell with role_name ${role_name}`)
      }

      if (!this.isLauncherEnv) {
        if(!this.signingCredentialsCache[cellId])
        {
          this.setCredentials(cellId)
        }
  
        await this.signingCredentialsCache[cellId]
      }

      let result = null

      const cell_id = [new Uint8Array(listify(cellId[0], (_, value) => (Number(value)))), new Uint8Array(listify(cellId[1], (_, value) => (Number(value))))]

      try {
        result = await this.client.callZome(
          {
            zome_name,
            fn_name,
            payload,
            cell_id,
            provenance: cell_id[1]
          },
          HC_APP_TIMEOUT
        )
      } catch (e) {
        console.log(`holochainCallZome error -- zome_name: ${zome_name} fn_name: ${fn_name}`, e)
      }

      return result
    },
    setCredentials(cellId) {
      this.signingCredentialsCache[cellId] = new Promise(async (resolve, reject) => {
        try {
          if (!this.adminWebsocketCache) {
            this.adminWebsocketCache = await AdminWebsocket.connect({
              url: new URL(`ws:localhost:${hc_admin_port}`),
              wsClientOptions: { origin: 'ui-common-lib' },
            });
          }
          let adminWs = this.adminWebsocketCache;
          await adminWs.authorizeSigningCredentials(cellId)
        } catch(e) {
          console.log(`holochainCallZome error authorizeSigningCredentials AdminWebsocket: ws:localhost:${hc_admin_port}`, e)
          reject()
        }

        resolve()
      })
    },
    async fetchAgentKycLevel(_, __) {
      const kycLevel = await hposHolochainCall({path: 'host/kyc_level', headers: {}, params: {}, method: 'get'})
      return kycLevel ? (kycLevel === kycLevel2) ? 2 : 1 : null
    },
  }
})

export default makeUseHolochainStore
