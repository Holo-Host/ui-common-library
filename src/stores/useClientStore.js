import { defineStore } from 'pinia'
import { encodeAgentId } from 'src/utils/agent'
import { inspect } from 'util'

const makeUseClientStore = ({ useInterfaceStore, onInit }) => defineStore('client', {
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

      this.callIsLoading(zomePath)

      if (!this.isReady) {
        this.callIsNotLoading(zomePath)
        throw new Error('Tried to make zome call while client is not ready')
      }
			
      const result = await useInterfaceStore().callZome({ roleId, zomeName, fnName, payload })

      console.log(`${zomePath} returned with ${inspect(result)}`)
      this.callIsNotLoading(zomePath)

			return result

    },
    callIsLoading (zomePath) {
      this.isLoading[zomePath] = true
    },
    callIsNotLoading (zomePath) {
      this.isLoading[zomePath] = false
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
