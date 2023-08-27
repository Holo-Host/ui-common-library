import { defineStore } from 'pinia'
import { authenticateAgent } from 'src/services/hbs'

const useHoloBusinessServiceStore = defineStore('hbs', {
  state: () => ({
    agentKeyLevel: 0
  }),
  getters: {
    isAgentKeyPopulated: state => state.agentKeyLevel > 0,
  },
  actions: {
    async loadAgentKycLevel(email, public_key) {
        if( ! this.isAgentAuthenticated ) {
            const authResult = await authenticateAgent(email, public_key)
            console.log(`agentKycLevel authResult`, authResult)
            this.agentKeyLevel = 99
        }
    }
  }
})

export default useHoloBusinessServiceStore
