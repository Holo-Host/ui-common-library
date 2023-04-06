import { inspect } from 'util'
import { AppWebsocket } from '@holochain/client'
import { defineStore } from 'pinia'
import { presentHcSignal } from '../utils'
import useIsLoadingStore from './useIsLoadingStore'
import useSignalStore from './useSignalStore'

const HC_APP_TIMEOUT = 35_000

const makeUseHolochainStore = ({ installed_app_id, app_ws_url }) => defineStore('holochain', {
  state: () => ({
    client: null,
    // These two values are subscribed to by clientStore
    appInfo: null,
    isReady: false
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
      const { zome_name, fn_name, payload } = args
      console.log(`useHolochain store callZome role: ${role_name} zome: ${zome_name} fn: ${fn_name}`, payload)
      if (!this.appInfo) {
        throw new Error('Tried to make a zome call before storing appInfo')
      }

      const role_names = Object.keys(app_info.cell_info)
      if (role_names.length === 0 ) {
        throw new Error('No cells found in appInfo')
      }

      const roleName = role_names.find(roleName => roleName === role_name)

      if (!roleName) {
        throw new Error(`Couldn't find cell with role_name ${role_name}`)
      }

      useIsLoadingStore().callIsLoading({ zomeName: zome_name, fnName: fn_name })

      try {
        const result = await this.client.callZome(
          {
            cap_secret: null,
            role_name,
            zome_name,
            fn_name,
            payload,
            provenance: cell_id[1]
          },
          HC_APP_TIMEOUT
        )
        
        return result
      } finally {
        useIsLoadingStore().callIsNotLoading({ zomeName: zome_name, fnName: fn_name })
      }
    }
  }
})

export default makeUseHolochainStore
