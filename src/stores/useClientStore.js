import { inspect } from 'util'
import { defineStore } from 'pinia'
import { encodeAgentId } from '../utils/agent'

const makeUseClientStore = ({ useInterfaceStore, onInit, fetchKycLevel }) => defineStore('client', {
  state: () => ({
    agentKey: null, // the Uint8Array of raw bytes. See also agentId in getters, below
    isReady: false,
    agentKyc: null
  }),
  getters: {
    agentId: state => state.agentKey && encodeAgentId(state.agentKey),
    agentKycLevel: state => state.agentKyc
  },
  actions: {
    async initialize() {
      // onInit is a hack, see stores/index.js for details
      onInit?.()

      useInterfaceStore().$subscribe((_, state) => {
        // This could be more efficient by inspecting the contents of mutation
        this.isReady = state.isReady

        if (state.appInfo?.agent_pub_key) {
          this.agentKey = state.appInfo.agent_pub_key
        }
      })

      useInterfaceStore().initialize()
    },

    async appInfo() {
      return useInterfaceStore().loadAppInfo()
    },

    async callZome({ role_name, zome_name, fn_name, payload = null }) {
      const zomePath = `${zome_name}.${fn_name}`
      console.log(`calling ${zomePath} with ${inspect(payload)}`)

      if (!this.isReady) {
        throw new Error('Tried to make zome call while client is not ready')
      }

      const result = await useInterfaceStore().callZome({ role_name, zome_name, fn_name, payload })

      console.log(`${zomePath} result`, result)

      return result
    },

    async loadAgentKycLevel(environment, hbsServicePort) {
      const kycLevel = await fetchKycLevel(environment, hbsServicePort)
      this.agentKyc = kycLevel
      return kycLevel
    }
  }
})

export default makeUseClientStore
