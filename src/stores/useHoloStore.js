import WebSdk from '@holo-host/web-sdk'
import { defineStore } from 'pinia'
import useIsLoadingStore from './useIsLoadingStore'
import useSignalStore from './useSignalStore'
import { fetchAgentKycLevel } from '../services/hbs'
import { hAppServiceLogs, hAppStats, dashboardStats, allHappStats } from '../services/servicelogApi'
import { generateServiceLogPayload } from '../utils/serviceLogPayload'
import { emptyHappStatistics } from 'src/utils/hAppStatistics'

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
    kycLevel: null,
    dashboardStatistics: emptyHappStatistics,
    allHappStatistics: []
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

      return encoded_service_logs
    },
    async fetchHAppStats(happId, days, environment, serviceLogPort) {
      try {
        const payload = generateServiceLogPayload({ "days": days.toString(), "happ_id": happId })
        const { _, signature  } = await client.signPayload(payload)
        const hAppStatistics = await hAppStats(payload, signature, this.agentKey, environment, serviceLogPort)
  
        return hAppStatistics
      } catch (e) {
        console.error('Error fetching hApp stats', e.message)
        return emptyHappStatistics
      }
    },
    async fetchAllHAppStats(happIds, days, environment, serviceLogPort) {
      try {
        // NB: The happ_ids param needs to be a string to succeed the msgpack serialization
        // and validation check in the server.
        const happIdsString = JSON.stringify(happIds)
        const payload = generateServiceLogPayload({ "days": days.toString(), "happ_ids": happIdsString })
        const { _, signature  } = await client.signPayload(payload)
        allHappStats(payload, signature, this.agentKey, environment, serviceLogPort)
          .then((hApp_stats) => {
            if( hApp_stats && hApp_stats.length > 0 ) {
              const {hAppStatsList, hAppStatsErrors } = hApp_stats.reduce((acc, res) => {
                if (res["Ok"]) {
                  acc.hAppStatsList.push(res["Ok"])
                } else {
                  acc.hAppStatsErrors.push(res["Err"])
                }
                return acc
              }, {hAppStatsList:[], hAppStatsErrors: []});
      
              this.allHappStatistics = hAppStatsList
            }
          })
      } catch (e) {
        console.error('Error fetching all hApp stats', e.message)
        allHappStatistics = []
      }
    },    
    async fetchDashboardStats(days, environment, serviceLogPort) {
      try {
        const payload = generateServiceLogPayload({ "days": days.toString() })
        const { _, signature  } = await client.signPayload(payload)
        const dashboardStatistics = await dashboardStats(payload, signature, this.agentKey, environment, serviceLogPort)
  
        this.dashboardStatistics = dashboardStatistics
      } catch (e) {
        console.error('Error fetching dashboard stats', e.message)
        this.dashboardStatistics = emptyHappStatistics
      }
    },    
  }
})

export default makeUseHoloStore
