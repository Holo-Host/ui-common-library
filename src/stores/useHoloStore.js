import WebSdk from '@holo-host/web-sdk'
import { defineStore } from 'pinia'
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
    isAnonymous: state => state.agentState && state.agentState.isAnonymous,
    isAvailable: state => state.agentState && state.agentState.isAvailable,
    isLoggedIn: state => state.agentState && state.agentState.isAnonymous === false && state.agentState.isAvailable === true,
    error: state => state.agentState && !state.agentState.isAvailable && (state.connectionError || state.agentState.unrecoverableError),
    agentKey: (state) => state.appInfo?.agent_pub_key,
    agentId: state => state.agentState?.id
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
    }

  }
})

export default makeUseHoloStore
