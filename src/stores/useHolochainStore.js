import { inspect } from 'util'
import { AdminWebsocket, AppWebsocket } from '@holochain/client'
import { defineStore } from 'pinia'
import { presentHcSignal } from '../utils'
import useIsLoadingStore from './useIsLoadingStore'
import useSignalStore from './useSignalStore'

import { encodeAgentId } from '../utils/agent'

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
      const { zome_name, fn_name, payload, role_name } = args
      if (!this.appInfo) {
        throw new Error('Tried to make a zome call before storing appInfo')
      }
  
      const cell_info = this.appInfo.cell_info[role_name][0]
      const provisioned_cell_id = cell_info?.provisioned?.cell_id

      if (!provisioned_cell_id) {
        throw new Error(`Couldn't find provisioned cell with role_name ${role_name}`)
      }

      useIsLoadingStore().callIsLoading({ zome_name, fn_name })

      // This works locally but need to figure out how to make an admin call on a holoport
      // const adminWs = await AdminWebsocket.connect("ws:localhost:4445")
      // await adminWs.authorizeSigningCredentials(provisioned_cell_id)

      try {
        const result = await this.client.callZome(
          {
            cap_secret: null,
            // role_name,
            zome_name,
            fn_name,
            payload,
            cell_id: provisioned_cell_id
          },
          HC_APP_TIMEOUT
        )
        
        return result
      } finally {
        useIsLoadingStore().callIsNotLoading({ zome_name, fn_name })
      }
    }
  }
})

export default makeUseHolochainStore
