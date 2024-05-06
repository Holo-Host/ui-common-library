import axios from 'axios'
import { authServiceUrl, authServiceVersion, registrationServiceUrl, registrationServiceVersion } from '../utils/hbsConfiguration'
import { httpCall } from '../utils/httpProvider'

export const kycLevel1 = 'holo_kyc_1'
export const kycLevel2 = 'holo_kyc_2'

async function authCall(args, environment, hbsServicePort) {
  return httpCall({
    serviceUrl: authServiceUrl(environment),
    version: authServiceVersion(hbsServicePort),
    method: 'post',
    ...args
  })
}
  
export async function authenticateAgent(payload, signature, environment, hbsServicePort) {
  try {
    const result = await authCall({
        params: payload,
        endpoint: 'holo-client',
        headers: {
          'X-Signature': signature
        },
      },
      environment,
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

export async function fetchAgentKycLevel(payload, signature, environment, hbsServicePort) {
  const authResult = await authenticateAgent(payload, signature, environment, hbsServicePort)
  return (authResult && authResult.kyc) ? (authResult.kyc === kycLevel2) ? 2 : 1 : null
}


async function registrationCall(args, environment, hbsServicePort) {
  return httpCall({
    serviceUrl: registrationServiceUrl(environment),
    version: registrationServiceVersion(hbsServicePort),
    method: 'post',
    ...args
  })
}

async function registrationFetchHostCriteria(payload, environment, hbsServicePort) {
  try {
    const result = await registrationCall({
        params: payload,
        endpoint: 'fetch-host-criteria',
      },
      environment,
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

export async function fetchHostCriteria(hostIds, environment, hbsServicePort) {
  const payload = {
    "ids": hostIds || []
  }

  const result = await registrationFetchHostCriteria(payload, environment, hbsServicePort)
  return result
}

export async function registrationFetchJurisdictions(environment, hbsServicePort) {
  const result = httpCall({
    serviceUrl: registrationServiceUrl(environment),
    version: registrationServiceVersion(hbsServicePort),
    method: 'get',
    endpoint: 'jurisdictions'
  })

  return result
}