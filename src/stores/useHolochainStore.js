import { defineStore } from 'pinia'
import { inspect } from 'util'
import { AppWebsocket } from "@holochain/client";
import { HC_APP_TIMEOUT } from "src/utils/const"
import { presentHcSignal } from "src/utils"

const makeUseHolochainStore = ({ installed_app_id, app_ws_url, useSignalStore, useIsLoadingStore }) => defineStore('holochain', {
  state: () => ({
    client: null,
    // These two values are subscribed to by clientStore
    appInfo: null,
    isReady: false
  }),
  actions: {
    async initialize () {
      try {
        const holochainClient = await AppWebsocket.connect(
          app_ws_url,
          HC_APP_TIMEOUT,
          signal => useSignalStore().handleSignal(presentHcSignal(signal))
        )
        
        this.client = holochainClient

        holochainClient.client.socket.onclose = function (e) {
          console.log(
            `Socket to Holochain App Interface has closed.`,
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
    async loadAppInfo () {
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
    async callZome ({ roleId, zomeName, fnName, payload = null }) {
      if (!this.appInfo) {
        throw new Error('Tried to make a zome call before storing appInfo')
      }

      const cellDatum = this.appInfo.cell_data.find(c => c.role_id === roleId)

      if (!cellDatum) {
        throw new Error (`Couldn't find cell with role_id ${roleId}`)
      }

      const { cell_id } = cellDatum

      this.callIsLoading({ zomeName, fnName })

      try {
        const result = await this.client.callZome(
          {
            cap_secret: null,
            cell_id,
            zome_name: zomeName,
            fn_name: fnName,
            payload: payload,
            provenance: cell_id[1],
          },
          HC_APP_TIMEOUT
        )
  
        // Wrap the result in an ok enum to match the structure returned from chaperone
        return {
          type: 'ok',
          data: result
        }
      } catch (e) {        
        // unthrow the error from holochain, to match the chaperone pattern of just returning the error object
        return e
      } finally {
        this.callIsNotLoading({ zomeName, fnName })
      }
    },
    callIsLoading (callSpec) {
      if (useIsLoadingStore) {
        useIsLoadingStore().callIsLoading(callSpec)
      }
    },
    callIsNotLoading (callSpec) {
      if (useIsLoadingStore) {
        useIsLoadingStore().callIsNotLoading(callSpec)
      }
    },
  }
})

export default makeUseHolochainStore
