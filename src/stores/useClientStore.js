import { inspect } from 'util'
import { defineStore } from 'pinia'
import { encodeAgentId } from '../utils/agent'

const makeUseClientStore = ({ useInterfaceStore, onInit }) => defineStore('client', {
  state: () => ({
    agentKey: null, // the Uint8Array of raw bytes. See also agentId in getters, below
    isReady: false
  }),
  getters: {
    agentId: state => state.agentKey && encodeAgentId(state.agentKey)
  },
  actions: {
    async initialize() {
      // onInit is a hack, see stores/index.js for details
      onInit?.()

      useInterfaceStore().$subscribe((_, state) => {
        // This could be more efficient by inspecting the contents of mutation
        this.isReady = state.isReady

        if (state.appInfo?.cell_data) {
          this.setAgentKeyFromAppInfo(state.appInfo)
        }
      })

      useInterfaceStore().initialize()
    },

    async appInfo() {
      return useInterfaceStore().loadAppInfo()
    },

    async callZome({ roleId, zomeName, fnName, payload = null }) {
      const zomePath = `${zomeName}.${fnName}`
      console.log(`calling ${zomePath} with ${inspect(payload)}`)

      if (!this.isReady) {
        throw new Error('Tried to make zome call while client is not ready')
      }

      const result = await useInterfaceStore().callZome({ roleId, zomeName, fnName, payload })

      console.log(`${zomePath} returned with ${inspect(result)}`)

      return result
    },

    setAgentKeyFromAppInfo(appInfo) {
      const {
        cell_data: [
          {
            cell_id: [_dnaHash, agentKey]
          }
        ]
      } = appInfo

      this.agentKey = agentKey
      console.log(`setting agentKey = ${encodeAgentId(agentKey)}`)
    }
  }
})

export default makeUseClientStore
