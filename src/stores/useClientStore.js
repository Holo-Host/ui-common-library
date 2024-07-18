import { inspect } from 'util'
import { defineStore } from 'pinia'
import { encodeAgentId } from '../utils/agent'

let completeInitialization = () => {} // updated in the state fn below

const makeUseClientStore = ({ useInterfaceStore, onInit, fetchKycLevel }) => defineStore('client', {
  state: () => ({
    agentKey: null, // the Uint8Array of raw bytes. See also agentId in getters, below
    isReady: false,
    hasMemproofs: true, // we assume we have memproofs until holochain tells us otherwise
    agentKyc: null,
    waitTilInitialized: new Promise(resolve => completeInitialization = resolve)
  }),
  getters: {
    agentId: state => state.agentKey && encodeAgentId(state.agentKey),
    agentKycLevel: state => state.agentKyc,
    isAnonymous: _ => useInterfaceStore().isAnonymous,
    agentEmail: _ => useInterfaceStore().agentEmail,
  },
  actions: {
    async initialize() {
      // onInit is a hack, see stores/index.js for details
      onInit?.()

      // TODO: this subscribe is getting hacky. investigate a neater way of doing this
      useInterfaceStore().$subscribe((_, state) => {
        // This could be more efficient by inspecting the contents of mutation
        this.isReady = state.isReady

        this.hasMemproofs = state?.agentState?.hasMemproofs

        if (state.appInfo?.agent_pub_key) {
          this.agentKey = state.appInfo.agent_pub_key
        }

        // we override here the above here because in the holo case, agentState is in general much more up to date than appInfo
        if (state.agentState?.pubkey) {

          console.log('^&* useClientStore agent.id', state.agentState?.id)
          console.log('^&* useClientStore setting pubkey', state.agentState?.pubkey)

          this.agentKey = state.agentState.pubkey
        }
      })

      await useInterfaceStore().initialize()

      completeInitialization()
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

    async provideMemproofs(memproofs) { // memproofs is { [key: string]: Uint8Array }
      await useInterfaceStore().provideMemproofs(memproofs)
      return this.appInfo()
    },

    async loadAgentKycLevel(environment, hbsServicePort) {
      const kycLevel = await fetchKycLevel(environment, hbsServicePort)
      this.agentKyc = kycLevel
      return kycLevel
    }
  }
})

export default makeUseClientStore
