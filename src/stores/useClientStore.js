import { defineStore } from 'pinia'
import { encodeAgentId } from '../utils/agent'
import { inspect } from 'util'

const makeUseClientStore = ({ useInterfaceStore, onInit, useIsLoadingStore }) => defineStore('client', {
  state: () => ({
    agentKey: null, // the Uint8Array of raw bytes. See also agentId in getters, below
    isReady: false,
    isLoading: {}
  }),
  getters: {
    agentId: state => state.agentKey && encodeAgentId(state.agentKey),
  },
  actions: {
    async initialize () {
      if (onInit) { // onInit is a hack, see stores/index.js for details
        onInit()
      }

      useInterfaceStore().$subscribe((_, state) => {
        // This could be more efficient by inspecting the contents of mutation
        this.isReady = state.isReady
        if (state.appInfo?.cell_data) {
          this.setAgentKeyFromAppInfo(state.appInfo)
        }
      })

      useInterfaceStore().initialize()
    },
    async appInfo () {
      return useInterfaceStore().loadAppInfo()
    },
    async callZome ({ roleId, zomeName, fnName, payload = null }) {            
      const zomePath = `${zomeName}.${fnName}`
      console.log(`calling ${zomePath} with ${inspect(payload)}`)

      if (!this.isReady) {
        throw new Error('Tried to make zome call while client is not ready')
      }
			
      this.callIsLoading({ zomeName, fnName })

      let result

      try {
        result = await useInterfaceStore().callZome({ roleId, zomeName, fnName, payload })
      } finally {
        this.callIsNotLoading({ zomeName, fnName })
      }

      console.log(`${zomePath} returned with ${inspect(result)}`)

			return result
    },
    callIsLoading (callSpec) {
      if (useIsLoadingStore) {
        useIsLoadingStore().callIsLoading(callSpec)
      }
    },
    callIsNotLoading (callSpec) {
      if (useIsLoadingStore) {
        useIsLoadingStore().callIsNotLoading(callSpec)
      }
    },
    setAgentKeyFromAppInfo (appInfo) {
      const {
        cell_data: [
          {
            cell_id: [_dnaHash, agentKey]
          }
        ]
      } = appInfo

      this.agentKey = agentKey
      console.log(`setting agentKey = ${encodeAgentId(agentKey)}`)
    },
  },
})

export default makeUseClientStore
