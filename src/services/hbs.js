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

// Returns:
// [
//   {
//     "_id": "string",
//     "jurisdiction": "string",
//     "kyc": "string", // Note: Either `holo_kyc_1` or `holo_kyc_2`
//     "error": "string",
//     "pubkey": "string"
//   }
// ]
export async function fetchHostCriteria(hostIds = [], environment, hbsServicePort, page = 0, itemsPerPage = 50) {
  let currentPageNumber = page;
  let hostsWithCriteria = [];
  let currentItems = 0
  let totalItems = itemsPerPage

  do {
    console.log(`Fetching page ${currentPageNumber} from uptime records...`)
    const payload = {
      "page": currentPageNumber,
      "itemsPerPage": itemsPerPage,
      "ids": hostIds
    }
  
    // TODO: This endpoint needs to be update in HBS to return the standard hbs "pagination" type,
    // which returns a result obj containing 3 things: items, page, & totalItems.
    // Note: This currently endpoint implementation seems to return ALL results still, which means it doesn't matter right now
    // that the result obj isn't reutrning the total number of items, as we get the full run the first time
    const items = await registrationFetchHostCriteria(payload, environment, hbsServicePort)

    for (let item of items) {
      hostsWithCriteria.push(item)
    }

    currentPageNumber++;  // result.page + 1 // NB: the first page starts at 0, not 1    
    currentItems = currentPageNumber * itemsPerPage; // result.itemsPerPage
    totalItems = totalItems; // result.totalItems
  } while (totalItems > currentItems);

  return hostsWithCriteria
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