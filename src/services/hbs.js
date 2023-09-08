import axios from 'axios'
import { AUTH_SERVICE_URL, AUTH_SERVICE_VERSION } from '../utils/hbsConfiguration'
import { httpCall } from '../utils/httpProvider'

export const kycLevel1 = 'holo_kyc_1'
export const kycLevel2 = 'holo_kyc_2'

async function authCall(args) {
  return httpCall({
    serviceUrl: AUTH_SERVICE_URL,
    version: AUTH_SERVICE_VERSION,
    method: 'post',
    ...args
  })
}
  
export async function authenticateAgent(payload, signature) {
  try {
    const result = await authCall({
      params: payload,
      endpoint: 'holo-client',
      headers: {
        'X-Signature': signature
      }
    })

    return result.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.message
    } else {
      return 'unknown error'
    }
  }
}

export async function loadAgentKycLevel(payload, signature) {
  const authResult = await authenticateAgent(payload, signature)
  return (authResult && authResult.kyc) ? (authResult.kyc === kycLevel2) ? 2 : 1 : null
}
  