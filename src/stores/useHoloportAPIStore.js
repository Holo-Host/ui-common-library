import axios from 'axios'
import { generateSigningKeyPair, setSigningCredentials } from '@holochain/client'
import { defineStore } from 'pinia'
import { listify } from '../utils'
import { kycLevel2 } from '../services/hbs'

const makeUseHoloportAPIStore = ({ useHolochainStore }) => defineStore('holoportAPI', {
  state: () => ({
    client: useHolochainStore().client,
    // These two values are subscribed to by clientStore
    appInfo: useHolochainStore().appInfo,
    isReady: false,
    signingCredentials: null
  }),
  actions: {
    async initialize() {
        this.isReady = true
    },

    async loadAppInfo() {
        useHolochainStore().loadAppInfo()
        this.isReady = true
    },

    async callZome(args) {
      const zomeCallArgs = {
        appId: installed_app_id,
        roleId: args.role_name,
        zomeName: args.zome_name,
        fnName: args.fn_name,
        payload: args.payload
      }

      const response = await this.hposHolochainCall({path: 'zome_call', headers: {}, params: zomeCallArgs})
      return response
    },
    setCredentials(cellId) {
      this.signingCredentials = new Promise(async (resolve, reject) => {
          try {
            const [keyPair, signingKey] = await generateSigningKeyPair()
            const params = { cellId, signingKey }    
            const cap_token = await this.hposHolochainCall({path: 'cap_token', headers: {}, params})
    
            const signingCredentials = {
              capSecret: new Uint8Array(listify(cap_token, (_, value) => (Number(value)))),
              keyPair,
              signingKey
            }
    
            await setSigningCredentials(cellId, signingCredentials)
          } catch (e) {
            console.log(`Error setting signing credentials`, e)
            reject()
          }

          resolve()
      })
    },
    async hposHolochainCall({
      path,
      headers: userHeaders = {},
      params,
      method = 'post',
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
  
      let response

      switch (method) {
        case 'get':
          response = await axios.get(fullUrl, { params, headers })
          return response.data
    
        case 'post':
          response = await axios.post(fullUrl, params, { headers })
          return response.data
    
        case 'put':
          response = await axios.put(fullUrl, params, { headers })
          return response.data
    
        case 'delete':
          response = await axios.delete(fullUrl, { params, headers })
          return response.data
    
        default:
          throw new Error(`No case in hposCall for ${method} method`)
        }
    },
    async loadAgentKycLevel(_, __) {
      const kycLevel = await this.hposHolochainCall({path: 'kyc', headers: {}, params: {}, method: 'get'})
      return kycLevel ? (kycLevel === kycLevel2) ? 2 : 1 : null
    },
  }
})

export default makeUseHoloportAPIStore
