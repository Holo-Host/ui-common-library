import { inspect } from 'util'
import RealWebSdk from '@holo-host/web-sdk'
import MockWebSdk from '../../__mocks__/@holo-host/web-sdk'
const WebSdk = process.env.VUE_APP_MOCK_WEB_SDK
  ? MockWebSdk
  : RealWebSdk

const CHAPERONE_URL = process.env.VUE_APP_CHAPERONE_SERVER_URL
  ? process.env.VUE_APP_CHAPERONE_SERVER_URL
  : "http://localhost:24274"

// Must match the role ID defined in happ.yaml of holo-hosting-app
// https://github.com/Holo-Host/holo-hosting-app-rsm/blob/8a40aa2c2053e9f3fd31311720fd6861ebb75d96/happ.yaml#L6

let client

export default {
  namespaced: true,
  state: {
    agentState: {},
    appInfo: {},
    happId: null,
    isLoading: {},
    connectionError: null
  },
  actions: {
    async init({ dispatch, commit }) {
      try {
        client = await WebSdk.connect({
          chaperoneUrl: CHAPERONE_URL,
          authFormCustomization: {
            publisherName: 'Holo',
            appName: 'Publisher Portal',
            infoLink: 'https://holo.host/faq-tag/elemental-chat',
            skipRegistration: false,
            anonymousAllowed: false,
            membraneProofServer: {
              url: "https://devnet-membrane-proof-service.holo.host",
              payload: {
                role: 'publisher'
              }
            }
          }
        })
      } catch (e) {
        commit('setConnectionError', e.message)
        throw e
      }

      client.on('agent-state', agentState => {
        // This is a temporary addition, until chaperone is updated to include app info as part of agent state
        client.appInfo().then((appInfo) => {
          commit('setAppInfo', appInfo);
        })
        
        commit('setAgentState', agentState)
      })
      client.on('signal', payload => dispatch('handleSignal', payload))

      commit('setHappId', client.happId)

      // Set agent state in case `agent-state` event is never emitted. This is the case with Mock Web SDK because it never emits events
      commit('setAgentState', client.agent)
      console.log('Publisher Portal: host url', client.agent.hostUrl)
    },
    async signIn () {
      await client.signIn({ cancellable: false })
    },
    async signUp () {
      await client.signUp({ cancellable: false })
    },
    async signOut () {
      await client.signOut()
    },
    handleSignal (_, signal) {
      console.log('PUBLISHER PORTAL: Got Signal', inspect(signal))
    },
    async zomeCall ({ dispatch, state }, args) {
      const { roleId, zomeName, fnName, payload } = args

      const zomePath = `${zomeName}.${fnName}`
      dispatch('callIsLoading', zomePath)

      const result = await client.zomeCall({
        roleId,
        zomeName,
        fnName,
        payload
      })

      dispatch('callIsNotLoading', zomePath)

      // result may be of form { type: 'ok', data: ... } or { type 'error', data: ... }, we're letting the caller deal with that
      return result
    },
    appInfo () {
      return client.appInfo()
    },
    callIsLoading ({ commit }, payload) {
      commit('updateIsLoading', { zomePath: payload, value: true })
    },
    callIsNotLoading ({ commit }, payload) {
      commit('updateIsLoading', { zomePath: payload, value: false })
    }

  },
  mutations: {
    setAgentState (state, agentState) {
      state.agentState = agentState
      console.log("Setting agent state: ", agentState);
      if (agentState.unrecoverableError) {
        console.error('unrecoverable agent state', agentState.unrecoverableError)
      }
    },
    setAppInfo (state, appInfo) {
      state.appInfo = appInfo
    },
    setHappId (state, happId) {
      state.happId = happId
    },
    setConnectionError (state, error) {
      state.connectionError = error
    },
    updateIsLoading (state, { zomePath, value }) {
      state.isLoading = {
        ...state.isLoading,
        [zomePath]: value
      }
    }
  },
  getters: {
    is_anonymous: state => state.agentState.isAnonymous,
    is_available: state => state.agentState.isAvailable,
    is_logged_in: state => state.agentState.isAnonymous === false && state.agentState.isAvailable === true,
    error: state => !state.agentState.isAvailable && (state.connectionError || state.agentState.unrecoverableError),
    agentKey: (state) => {
      const agentKey = state.appInfo?.cell_data?.find(c => c.role_id === 'holofuel')?.cell_id[1]
      return agentKey
    },
    agentId: state => state.agentState.id,
  }
}
