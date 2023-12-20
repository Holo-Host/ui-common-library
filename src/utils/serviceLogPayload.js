import { generateB64Nonce } from '../utils/nonce'

export const generateServiceLogPayload = (payload) => {
    const timestamp = Date.now() - (30 * 1000)
    const nonce = generateB64Nonce() 
    const service_log_payload = {
        "nonce": nonce,
        "timestamp": timestamp,
        "payload": payload
    }    

    return service_log_payload
}