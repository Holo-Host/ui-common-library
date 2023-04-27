import { inspect } from 'util'
import axios from 'axios'
import { AdminWebsocket, AppWebsocket, generateSigningKeyPair } from '@holochain/client'
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
      const cellId = cell_info?.provisioned?.cell_id
      const provisioned_cell_id = [new Uint8Array(cellId[0]), new Uint8Array(cellId[1])]

      if (!provisioned_cell_id) {
        throw new Error(`Couldn't find provisioned cell with role_name ${role_name}`)
      }

      useIsLoadingStore().callIsLoading({ zome_name, fn_name })
      const [_, signingKey] = await generateSigningKeyPair()
      const uintSigningKey = new Uint8Array(signingKey)

      const params = {
        cellId: provisioned_cell_id,
        signingKey: uintSigningKey
      }

      console.log(`🦠callZome calling ⛓️ hposHolochainCall ⛓️`, params)
      const response = await this.hposHolochainCall({path: 'cap_token', headers: {}, params})
      console.log(`🦠callZome ⛓️ hposHolochainCall ⛓️ result`, response)

      // This works locally but need to figure out how to make an admin call on a holoport
      // const adminWs = await AdminWebsocket.connect("ws:localhost:4445")
      // await adminWs.authorizeSigningCredentials(cellId)

      try {
        const result = await this.client.callZome(
          {
            cap_secret: null,
            // role_name,
            zome_name,
            fn_name,
            payload,
            cell_id: cellId
          },
          HC_APP_TIMEOUT
        )
        
        return result
      } finally {
        useIsLoadingStore().callIsNotLoading({ zome_name, fn_name })
      }
    },

    async hposHolochainCall({
      path,
      headers: userHeaders = {},
      params
    }) {
      console.log(`🦠hposHolochainCall path: ${path}`, params)
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }

      const HPOS_API_URL = `${window.location.protocol}//${window.location.host}`
      // const HPOS_API_URL = `https://3ssb1tdbkc672uyygu7yqewlzlgo5s70an695hmgylqunnttjl.holohost.dev`
      // https://3ssb1tdbkc672uyygu7yqewlzlgo5s70an695hmgylqunnttjl.holohost.dev/holochain-api/v1/cap_token
      const pathPrefix = '/holochain-api/v1/'
      const fullUrl = `${HPOS_API_URL}${pathPrefix}${path}`
  
      const authToken = localStorage.getItem('authToken')
      // const authToken = 'KQZMEQnKNHaQx4h8As6dulxud3NR7mBCiVd2wOP2Z-Wd4K2DvM_a4KFQTwLVZ-SDQc0LwPHZr_Q6KzKD4XNNGQeyJOqRPzJjbLQsuCEdoTm1FHIi3wNRcRvNhf2tRpcqnuqHyqTAOZTBrSGbM8DMSlZH2iOF427q8GnNR9_cIv8'
  
      const headers = {
        'X-Hpos-Auth-Token': authToken,
        ...axiosConfig.headers,
        ...userHeaders
      }
  
      const response = await axios.post(fullUrl, params, { headers })
      return response.data
    }
  }
})

export default makeUseHolochainStore
