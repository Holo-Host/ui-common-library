import WebSdk from '@holo-host/web-sdk'
import { defineStore } from 'pinia'
import useIsLoadingStore from './useIsLoadingStore'
import useSignalStore from './useSignalStore'
import { fetchAgentKycLevel } from '../services/hbs'
import { hAppServiceLogs, hAppStats, dashboardStats, allHappStats } from '../services/servicelogApi'
import { generateServiceLogPayload } from '../utils/serviceLogPayload'

const msgpack = require('@msgpack/msgpack')

let client

const makeUseHoloStore = ({ connectionArgs, MockWebSdk }) => defineStore('holo', {
  state: () => ({
    agentState: {},
    happId: null,
    connectionError: null,
    isAuthFormOpen: false,
    // These two values are subscribed to by clientStore
    isReady: false,
    appInfo: null,
    kycLevel: null
  }),
  getters: {
    isAnonymous: state => state.agentState && state.agentState.isAnonymous,
    isAvailable: state => state.agentState && state.agentState.isAvailable,
    isLoggedIn: state => state.agentState && state.agentState.isAnonymous === false && state.agentState.isAvailable === true,
    error: state => state.agentState && !state.agentState.isAvailable && (state.connectionError || state.agentState.unrecoverableError),
    agentKey: (state) => state.appInfo?.agent_pub_key,
    agentId: state => state.agentState?.id,
    agentEmail: state => state.agentState?.email,
    agentKycLevel: state => state.kycLevel
  },
  actions: {
    async initialize() {
      try {
        if (MockWebSdk) {
          client = await MockWebSdk.connect(connectionArgs)
        } else {
          client = await WebSdk.connect(connectionArgs)
        }
      } catch (e) {
        throw e
      }

      const onAgentState = agentState => {
        if (agentState && agentState.unrecoverableError) {
          console.error('unrecoverable agent state', agentState.unrecoverableError)
        }

        // This is a temporary addition, until chaperone is updated to include app info as part of agent state
        client.appInfo().then((appInfo) => {
          this.appInfo = appInfo
        })

        this.agentState = agentState

        this.isReady = this.isLoggedIn
      }

      client.on('agent-state', onAgentState)
      client.on('signal', payload => useSignalStore().handleSignal(payload))

      this.happId = client.happId

      // Set agent state in case `agent-state` event is never emitted. This is the case with Mock Web SDK because it never emits events
      onAgentState(client.agent)
    },

    signIn() {
      this.isAuthFormOpen = true
      return client.signIn({ cancellable: false })
    },

    signUp() {
      this.isAuthFormOpen = true
      client.signUp({ cancellable: false })
    },

    signOut() {
      client.signOut()
    },

    async callZome(args) {
      const { role_name, zome_name, fn_name, payload } = args

      useIsLoadingStore().callIsLoading({ zome_name, fn_name })

      let result

      try {
        result = await client.callZome({
          role_name,
          zome_name,
          fn_name,
          payload
        })        
      } finally {
        useIsLoadingStore().callIsNotLoading({ zome_name, fn_name })
      }

      return result
    },

    async loadAppInfo() {
      this.appInfo = await client.appInfo()
      return this.appInfo
    },
    async loadAgentKycLevel(environment, hbsServicePort) {
      const payload = {
        "email": this.agentEmail,
        "timestamp": Date.now() - (30 * 1000), // Subtract 30 sec to prevent "future" timestamp error from API
        "pubKey": this.agentId
      }

      const { _, signature  } = await client.signPayload(payload)
      const kycLevel = await fetchAgentKycLevel(payload, signature, environment, hbsServicePort)
      this.kycLevel = kycLevel
      return kycLevel
    },
    async fetchHAppServiceLogs(happId, environment, serviceLogPort) {
      const payload = generateServiceLogPayload({ "happ_id": happId })
      const { _, signature  } = await client.signPayload(payload)
      const encoded_service_logs = await hAppServiceLogs(payload, signature, this.agentKey, environment, serviceLogPort)
      // const service_logs = msgpack.decode(encoded_service_logs)

      console.log('encoded_service_logs', encoded_service_logs)
      return encoded_service_logs
    },
    async fetchHAppStats(happId, days, environment, serviceLogPort) {
      const payload = generateServiceLogPayload({ "days": days.toString(), "happ_id": happId })
      const { _, signature  } = await client.signPayload(payload)
      const hAppStatistics = await hAppStats(payload, signature, this.agentKey, environment, serviceLogPort)

      return hAppStatistics
    },
    async fetchAllHAppStats(happIds, days, environment, serviceLogPort) {
      const payload = generateServiceLogPayload({ "happIds": happIds, "days": days.toString() })
      const { _, signature  } = await client.signPayload(payload)
      const hAppStatistics = await allHappStats(payload, signature, this.agentKey, environment, serviceLogPort)

      return hAppStatistics
    },    
    async fetchDashboardStats(days, environment, serviceLogPort) {
      const payload = generateServiceLogPayload({ "days": days.toString() })
      const { _, signature  } = await client.signPayload(payload)
      const dashboardStatistics = await dashboardStats(payload, signature, this.agentKey, environment, serviceLogPort)

      return dashboardStatistics
    },    
  }
})

export default makeUseHoloStore
