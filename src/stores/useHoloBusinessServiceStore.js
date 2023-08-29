import { defineStore } from 'pinia'
// import { authenticateAgent } from 'src/services/hbs'
import { authenticateAgent } from "@uicommon/services/hbs"

const kycLevel1 = 'holo_kyc_1'
const kycLevel2 = 'holo_kyc_2'

const useHoloBusinessServiceStore = defineStore('hbs', {
  state: () => ({
    agentKeyLevel: null
  }),
  actions: {
    async loadAgentKycLevel(email, public_key) {

      const authResult = await authenticateAgent(email, public_key)
      if( authResult && authResult.id ) {
        switch(authResult.kyc) {
          case kycLevel1: {
            this.agentKeyLevel = 1
            break
          }
          case kycLevel2: {
            this.agentKeyLevel = 2
            break
          }
          default: {
            this.agentKeyLevel = null
          }
        }
            
      }
    }
  }
})

export default useHoloBusinessServiceStore
