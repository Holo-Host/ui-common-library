import { defineStore } from 'pinia'
import { registrationFetchJurisdictions } from '../services/hbs'

const makeUseHbsStore = ({ useHoloStore }) => {
    return defineStore('hbs', {
        state: () => ({
            kycLevel: null,
            publisherJurisdiction: null,
            jurisdictions: []
        }),
        getters: {
            agentKycLevel: state => state.kycLevel,
            hbsJurisdictions: state => state.jurisdictions            
        },
        actions: {
            async loadAgentKycLevel(environment, hbsServicePort) {
                const { kycLevel } = this.loadAgent(environment, hbsServicePort);
                this.kycLevel = kycLevel
                return kycLevel
            },
            async loadAgent(environment, hbsServicePort) {
                const payload = {
                    "email": useHoloStore().agentEmail,
                    "timestamp": Date.now() - (30 * 1000), // Subtract 30 sec to prevent "future" timestamp error from API
                    "pubKey": useHoloStore().agentId
                }
            
                const { _, signature  } = await await useHoloStore().signPayload(payload)
                const result = await authenticateAgent(payload, signature, environment, hbsServicePort)
                if (result) {
                    if (result.kyc)
                        this.kycLevel = result.kyc === kycLevel2 ? 2 : 1;
                    if (result.jurisdiction)
                        this.publisherJurisdiction = result.jurisdiction;
                }
                return {
                    kycLevel: this.kycLevel,
                    publisherJurisdiction: this.publisherJurisdiction
                };
            },
            async loadJurisdictions(environment, hbsServicePort) {
                try {
                    registrationFetchJurisdictions(environment, hbsServicePort).then((jurisdictions) => {
                    this.jurisdictions = jurisdictions.data
                    })
                } catch (e) {
                    console.error(`Error fetching jurisdictions: ${e}`)
                }
            }
        }        
    })
}
 
export default makeUseHbsStore