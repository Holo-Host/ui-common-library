import axios from 'axios'
import { authServiceUrl, authServiceVersion, registrationServiceUrl, registrationServiceVersion } from '../utils/hbsConfiguration'
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


async function registrationCall(args, envirionment, hbsServicePort) {
  return httpCall({
    serviceUrl: registrationServiceUrl(envirionment),
    version: registrationServiceVersion(hbsServicePort),
    method: 'post',
    ...args
  })
}

async function registrationFetchHostCriteria(payload, envirionment, hbsServicePort) {
  try {
    const result = await registrationCall({
        params: payload,
        endpoint: 'fetch-host-criteria',
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

export async function fetchHostCriteria(hostIds, envirionment, hbsServicePort) {
  const payload = {
    "ids": hostIds || []
  }

  const result = await registrationFetchHostCriteria(payload, envirionment, hbsServicePort)
  return result
}