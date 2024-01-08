import axios from 'axios'
import { serviceLogApiUrl } from '../utils/serviceLogConfiguration'
import { serviceApiHttpCall } from '../utils/httpProvider'

async function serviceLogApiCall(args, signature, nonce, timestamp, pubkey, environment, serviceLogPort) {
    const { Codec } = await import('@holo-host/cryptolib')
    const url = serviceLogApiUrl(environment, serviceLogPort)

    return serviceApiHttpCall({
        serviceUrl: url,
        headers: {
            "X-Nonce": nonce,
            "X-Timestamp": timestamp,
            "X-Pubkey": Codec.AgentId.encode(pubkey),
            "X-Signature": signature
        },        
        method: 'get',
        ...args
    })
}

export async function hAppServiceLogs(payload, signature, pubkey, environment, serviceLogPort) {
    try {
        const result = await serviceLogApiCall({
            params: { happId: payload.happ_id },
            endpoint: 'service_logs',
        },
        signature,
        payload.nonce,
        payload.timestamp,
        pubkey,        
        environment,
        serviceLogPort
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

export async function hAppStats(payload, signature, pubkey, environment, serviceLogPort) {
    try {
        const result = await serviceLogApiCall({
            params: { happId: payload.happ_id, days: payload.days },
            endpoint: 'stats/happ',
        },
        signature,
        payload.nonce,
        payload.timestamp,
        pubkey,        
        environment,
        serviceLogPort
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

export async function allHappStats(payload, signature, pubkey, environment, serviceLogPort) {
    try {
        const result = await serviceLogApiCall({
            params: { happIds: payload.happIds,  days: payload.days },
            endpoint: 'stats/happs',
        },
        signature,
        payload.nonce,
        payload.timestamp,
        pubkey,        
        environment,
        serviceLogPort
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

export async function dashboardStats(payload, signature, pubkey, environment, serviceLogPort) {
    try {
        const result = await serviceLogApiCall({
            params: { days: payload.days },
            endpoint: 'stats/dashboard',
        },
        signature,
        payload.nonce,
        payload.timestamp,
        pubkey,
        environment,
        serviceLogPort
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
