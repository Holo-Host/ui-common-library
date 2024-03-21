import { inspect } from 'util'
import { AdminWebsocket, AppWebsocket, generateSigningKeyPair, setSigningCredentials } from '@holochain/client'
import { defineStore } from 'pinia'
import { presentHcSignal, listify } from '../utils'
import useIsLoadingStore from './useIsLoadingStore'
import useSignalStore from './useSignalStore'
import { kycLevel2 } from '../services/hbs'
import { hposHolochainCall } from '../services/hpos'

const HC_APP_TIMEOUT = 35_000

const makeUseHolochainStore = ({ installed_app_id, app_ws_url, hc_admin_port }) => defineStore('holochain', {
  state: () => ({
    client: null,
    // These two values are subscribed to by clientStore
    appInfo: null,
    isReady: false,
    signingCredentials: null
  }),
  actions: {
    async initialize() {
      try {
        const holochainClient = await AppWebsocket.connect(
          app_ws_url,
          HC_APP_TIMEOUT,
          signal => useSignalStore().handleSignal(presentHcSignal(signal))
        )

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
    async holochainCallZome(args) {
      const { zome_name, fn_name, payload, role_name } = args

      const cell_info = this.appInfo.cell_info[role_name][0]
      const cellId = cell_info?.provisioned?.cell_id

      if (!cellId) {
        throw new Error(`Couldn't find provisioned cell with role_name ${role_name}`)
      }

      if( !this.signingCredentials)
      {
        this.setCredentials(cellId)
      }

      await this.signingCredentials

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
      this.signingCredentials = new Promise(async (resolve, reject) => {
        try {
          const adminWs = await AdminWebsocket.connect(`ws:localhost:${hc_admin_port}`)
          await adminWs.authorizeSigningCredentials(cellId)
        } catch(e) {
          console.log(`holochainCallZome error authorizeSigningCredentials AdminWebsocket: ws:localhost:${hc_admin_port}`, e)
          reject()
        }

        resolve()
      })
    },
    async fetchAgentKycLevel(_, __) {
      const kycLevel = await hposHolochainCall({path: 'kyc', headers: {}, params: {}, method: 'get'})
      return kycLevel ? (kycLevel === kycLevel2) ? 2 : 1 : null
    },
  }
})

export default makeUseHolochainStore
