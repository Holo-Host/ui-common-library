import { inspect } from 'util'
import axios from 'axios'
import { AdminWebsocket, AppWebsocket, generateSigningKeyPair } from '@holochain/client'
import { defineStore } from 'pinia'
import { presentHcSignal } from '../utils'
import useIsLoadingStore from './useIsLoadingStore'
import useSignalStore from './useSignalStore'

const HC_APP_TIMEOUT = 35_000

const makeUseHolochainStore = ({ installed_app_id, app_ws_url, is_hpos_served }) => defineStore('holochain', {
  state: () => ({
    client: null,
    // These two values are subscribed to by clientStore
    appInfo: null,
    isReady: false,
    capToken: null,
    isAuthorized: false
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
  
      // const cell_info = this.appInfo.cell_info[role_name][0]
      // const cellId = cell_info?.provisioned?.cell_id

      // if (!cellId) {
      //   throw new Error(`Couldn't find provisioned cell with role_name ${role_name}`)
      // }

      // args.cellId = cellId

      useIsLoadingStore().callIsLoading({ zome_name, fn_name })

      try {
        const result = await this.zomeCall(args)
        return result
      } finally {
        useIsLoadingStore().callIsNotLoading({ zome_name, fn_name })
      }

      if( is_hpos_served && !this.capToken ) { // If hosted on a holoport we need a cap_token to make zome calls
        const { signingkey, cap_token } = await this.getCapToken(cellId)
        this.capToken = await Object.values(cap_token)
        console.log(`🦠callZome HPOS_SERVED cap_token set`, this.capToken)
      }

      if( !is_hpos_served && !this.isAuthorized ) { // If running a raw holochain we need to authorize zome calls once
        const adminWs = await AdminWebsocket.connect("ws:localhost:4445")
        await adminWs.authorizeSigningCredentials(cellId)
        this.isAuthorized = true
      }

      try {
        const result = await this.client.callZome(
          {
            cap_secret: this.capToken ? this.capToken : null,
            zome_name,
            fn_name,
            payload,
            cell_id: cellId,
            provenance: signingkey,
            signature: sig
          },
          HC_APP_TIMEOUT
        )
        
        return result
      } finally {
        useIsLoadingStore().callIsNotLoading({ zome_name, fn_name })
      }
    },
    async getCapToken(cellId) {
      const [_, signingKey] = await generateSigningKeyPair()

      const params = {
        cellId,
        signingKey
      }

      console.log(`🦠callZome calling ⛓️ hposHolochainCall ⛓️`, params)
      const response = await this.hposHolochainCall({path: 'cap_token', headers: {}, params})
      console.log(`🦠callZome ⛓️ hposHolochainCall ⛓️ result`, response)

      return { signingKey, response }
    },
    async zomeCall(args) {
      const zomeCallArgs = {
        appId: installed_app_id,
        roleId: args.role_name,
        zomeName: args.zome_name,
        fnName: args.fn_name,
        payload: args.payload
      }

      console.log(`🦠callZome calling zomeCall(🤷🏽) - hposHolochainCall ⛓️`, zomeCallArgs)
      const response = await this.hposHolochainCall({path: 'zome_call', headers: {}, zomeCallArgs})
      return response
    },
    async hposHolochainCall({
      path,
      headers: userHeaders = {},
      params
    }) {
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }

      const HPOS_API_URL = `${window.location.protocol}//${window.location.host}`
      const pathPrefix = '/holochain-api/v1/'
      const fullUrl = `${HPOS_API_URL}${pathPrefix}${path}`
  
      const authToken = localStorage.getItem('authToken')
  
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
