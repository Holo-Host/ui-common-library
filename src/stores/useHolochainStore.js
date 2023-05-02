import { inspect } from 'util'
import axios from 'axios'
import { AdminWebsocket, AppWebsocket, generateSigningKeyPair, setSigningCredentials } from '@holochain/client'
import { defineStore } from 'pinia'
import { presentHcSignal } from '../utils'
import useIsLoadingStore from './useIsLoadingStore'
import useSignalStore from './useSignalStore'

const HC_APP_TIMEOUT = 35_000

const makeUseHolochainStore = ({ installed_app_id, app_ws_url, is_hpos_served, hc_admin_port }) => defineStore('holochain', {
  state: () => ({
    client: null,
    // These two values are subscribed to by clientStore
    appInfo: null,
    isReady: false,
    signingCredentials: null,
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
      const { zome_name, fn_name } = args
      if (!this.appInfo) {
        throw new Error('Tried to make a zome call before storing appInfo')
      }
  
      useIsLoadingStore().callIsLoading({ zome_name, fn_name })

      try {
        // if( is_hpos_served ) {
        //   return await this.zomeCall(args)
          
        // } else {
        //   return await this.holochainCallZome(args)
        // }

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

      let retryCount = 0
      while( is_hpos_served && !this.signingCredentials && retryCount++ < 15) {
        await this.setHCSigningCredentials(cellId)
      }
      
      if( !is_hpos_served && !this.isAuthorized ) { // If running a raw holochain we need to authorize zome calls once
        console.log(`🌀holochainCallZome authorizeSigningCredentials AdminWebsocket: ws:localhost:${hc_admin_port}`)
        const adminWs = await AdminWebsocket.connect(`ws:localhost:${hc_admin_port}`)
        await adminWs.authorizeSigningCredentials(cellId)
        this.isAuthorized = true
      }

      const result = await this.client.callZome(
        {
          zome_name,
          fn_name,
          payload,
          cell_id: cellId
        },
        HC_APP_TIMEOUT
      )

      console.log(`🖲️holochainCallZome calling holochain callZome -- signingCredentials set: ${this.signingCredentials !== null} is_authorized: ${this.isAuthorized} zome_name: ${zome_name} fn_name: ${fn_name} (payload, cellId, result attached)`, payload, cellId, result)
      
      return result
    },
    async zomeCall(args) {
      const zomeCallArgs = {
        appId: installed_app_id,
        roleId: args.role_name,
        zomeName: args.zome_name,
        fnName: args.fn_name,
        payload: args.payload
      }

      console.log(`🦠callZome calling zomeCall - hposHolochainCall`, zomeCallArgs)
      const response = await this.hposHolochainCall({path: 'zome_call', headers: {}, params: zomeCallArgs})
      return response
    },
    async setHCSigningCredentials(cellId) {
      try {
        const [keyPair, signingKey] = await generateSigningKeyPair()

        const params = { cellId, signingKey }

        const cap_token = await this.hposHolochainCall({path: 'cap_token', headers: {}, params})

        const signingCredentials = {
          capSecret: Object.values(cap_token),
          keyPair: {publicKey: Object.values(keyPair[0]), secretKey: Object.values(keyPair[1])},
          signingKey: Object.values(signingKey)
        }

        await setSigningCredentials(cellId, signingCredentials)
        this.signingCredentials = signingCredentials
        console.log(`🔓 setSigningCredentials`, signingCredentials)
      } catch (e) {
        console.log(`🔒🛑Error setting signing credentials`, e, this.signingCredentials)
      }
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
