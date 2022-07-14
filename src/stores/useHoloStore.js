import { defineStore } from 'pinia'
import WebSdk from '@holo-host/web-sdk'
import useIsLoadingStore from './useIsLoadingStore'
import useSignalStore from './useSignalStore'

let client

const makeUseHoloStore = ({ connectionArgs, MockWebSdk }) => defineStore('holo', {
  state: () => ({
    agentState: {},
    happId: null,
    connectionError: null,
    isAuthFormOpen: false,
    // These two values are subscribed to by clientStore
    isReady: false,
    appInfo: null
  }),
  getters: {
    isAnonymous: state => state.agentState.isAnonymous,
    isAvailable: state => state.agentState.isAvailable,
    isLoggedIn: state => state.agentState.isAnonymous === false && state.agentState.isAvailable === true,
    error: state => !state.agentState.isAvailable && (state.connectionError || state.agentState.unrecoverableError),
    agentKey: (state) => state.appInfo?.cell_data?.find(c => c.role_id === 'holofuel')?.cell_id[1],
    agentId: state => state.agentState.id,
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

      client.on('agent-state', agentState => {
        // This is a temporary addition, until chaperone is updated to include app info as part of agent state
        client.appInfo().then((appInfo) => {
          this.appInfo = appInfo
        })
        
        this.agentState = agentState

        this.isReady = this.isLoggedIn
      })
      client.on('signal', payload => useSignalStore().handleSignal(payload))

      this.happId = client.happId

      // Set agent state in case `agent-state` event is never emitted. This is the case with Mock Web SDK because it never emits events
      this.agentState = client.agent
    },

    signIn () {
      this.isAuthFormOpen = true
      return client.signIn({ cancellable: false })
    },

    signUp () {
      this.isAuthFormOpen = true
      client.signUp({ cancellable: false })
    },

    signOut () {
      client.signOut()
    },

    async callZome (args) {
      const { roleId, zomeName, fnName, payload } = args

      useIsLoadingStore().callIsLoading({ zomeName, fnName })

      let result

      try {
        result = await client.zomeCall({
          roleId,
          zomeName,
          fnName,
          payload
        })  
      } finally {
        useIsLoadingStore().callIsNotLoading({ zomeName, fnName })
      }

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
