import axios from 'axios'
import { authServiceUrl, authServiceVersion } from '../utils/hbsConfiguration'
import { httpCall } from '../utils/httpProvider'

export const kycLevel1 = 'holo_kyc_1'
export const kycLevel2 = 'holo_kyc_2'

async function authCall(args, envirionment, hbsServicePort) {
  return httpCall({
    serviceUrl: authServiceUrl(envirionment),
    version: authServiceVersion(hbsServicePort),
    method: 'post',
    ...args
  })
}
  
export async function authenticateAgent(payload, signature, envirionment, hbsServicePort) {
  try {
    const result = await authCall({
        params: payload,
        endpoint: 'holo-client',
        headers: {
          'X-Signature': signature
        },
      },
      envirionment,
      hbsServicePort
    )

    return result.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.message
    } else {
      return 'unknown error'
    }
  }
}

export async function fetchAgentKycLevel(payload, signature, envirionment, hbsServicePort) {
  const authResult = await authenticateAgent(payload, signature, envirionment, hbsServicePort)
  return (authResult && authResult.kyc) ? (authResult.kyc === kycLevel2) ? 2 : 1 : null
}
  