import { inspect } from 'util'
import { defineStore } from 'pinia'
import RealWebSdk from '@holo-host/web-sdk'
import MockWebSdk from '../../__mocks__/@holo-host/web-sdk'

const WebSdk = process.env.VUE_APP_MOCK_WEB_SDK
  ? MockWebSdk
  : RealWebSdk

let client

const makeUseHoloStore = ({ connectionArgs, useSignalStore }) => defineStore('holo', {
  state: () => ({
    agentState: {},
    happId: null,
    connectionError: null,
    is_auth_form_open: false,
    // These two values are subscribed to by clientStore
    isReady: false,
    appInfo: null
  }),
  getters: {
    is_anonymous: state => state.agentState.isAnonymous,
    is_available: state => state.agentState.isAvailable,
    is_logged_in: state => state.agentState.isAnonymous === false && state.agentState.isAvailable === true,
    error: state => !state.agentState.isAvailable && (state.connectionError || state.agentState.unrecoverableError),
    agentKey: (state) => state.appInfo?.cell_data[0],
    agentId: state => state.agentState.id,
  },
  actions: {
    async initialize() {
      try {
        client = await WebSdk.connect(connectionArgs)
      } catch (e) {
        throw e
      }

      client.on('agent-state', agentState => {
        // This is a temporary addition, until chaperone is updated to include app info as part of agent state
        client.appInfo().then((appInfo) => {
          this.appInfo = appInfo
          // can this line be done using subscription instead? That seems better. If client subscribes to appInfo
        })
        
        if (agentState.isAvailable && !agentState.isAnonymous) {
          // better to use a subscription? In this case probably not
          this.isReady = true
        } else {
          this.isReady = false
        }

        this.agentState = agentState
      })
      client.on('signal', payload => useSignalStore().handleSignal(payload))

      this.happId = client.happId

      // Set agent state in case `agent-state` event is never emitted. This is the case with Mock Web SDK because it never emits events
      this.agentState = client.agent
    },
    signIn () {
      this.is_auth_form_open = true
      return client.signIn({ cancellable: false })
    },
    signUp () {
      this.is_auth_form_open = true
      client.signUp({ cancellable: false })
    },
    signOut () {
      client.signOut()
    },
    async callZome (args) {
      const { roleId, zomeName, fnName, payload } = args

      const result = await client.zomeCall({
        roleId,
        zomeName,
        fnName,
        payload
      })      

      // result may be of form { type: 'ok', data: ... } or { type 'error', data: ... }, we're letting the caller deal with that
      return result
    },
    async loadAppInfo () {
      this.appInfo = await client.appInfo()
      return this.appInfo
    },
    setAgentState (agentState) {
      this.agentState = agentState
      console.log("Setting agent state: ", agentState);
      if (agentState.unrecoverableError) {
        console.error('unrecoverable agent state', agentState.unrecoverableError)
      }
    },
  }
})

export default makeUseHoloStore
