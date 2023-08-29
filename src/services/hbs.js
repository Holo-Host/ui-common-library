import axios from 'axios'
import { AUTH_SERVICE_URL, AUTH_SERVICE_VERSION } from '../utils/hbsConfiguration'
import { httpCall } from '../utils/httpProvider'
import { useHoloStore } from 'src/stores'

async function authCall(args) {
  return httpCall({
    serviceUrl: AUTH_SERVICE_URL,
    version: AUTH_SERVICE_VERSION,
    method: 'post',
    ...args
  })
}
  
  export async function authenticateAgent(email, public_key) {
    console.log(`hbs->authenticateAgent - email: ${email} public_key: ${public_key}`)

    const holoStore = useHoloStore();
    const payload = {
      "email": email,
      "timestamp": Date.now() - (30 * 1000), // Subtract 30 sec to prevent "future" timestamp error from API
      "pubKey": public_key
    }

    const { _, signature  }  = await holoStore.signPayload(payload)
    console.log(`authenticateAgent - signature: ${signature}`, payload)

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
  