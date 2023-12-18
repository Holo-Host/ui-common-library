import axios from 'axios'
import { serviceLogApiUrl } from '../utils/serviceLogConfiguration'
import { serviceApiHttpCall } from '../utils/httpProvider'

async function serviceLogApiCall(args, environment, serviceLogPort) {
    const url = serviceLogApiUrl(environment, serviceLogPort)

    console.log(`🧮 serviceLogApiCall url: ${url}`, args)

    return serviceApiHttpCall({
        serviceUrl: url,
        method: 'get',
        ...args
    })
}

export async function hAppServiceLogs(payload, signature, nonce, timestamp, pubkey, environment, serviceLogPort) {
    try {
        const result = await serviceLogApiCall({
            params: payload,
            headers: {
                "X-Nonce": nonce,
                "X-Timestamp": timestamp,
                "X-Pubkey": pubkey,
                "X-Signature": signature
            },
            endpoint: 'service_logs',
        },
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

export async function hAppStats(happId, days, signature, nonce, timestamp, pubkey, environment, serviceLogPort) {
    try {
        const result = await serviceLogApiCall({
            params: { happId, days },
            headers: {
                "X-Nonce": nonce,
                "X-Timestamp": timestamp,
                "X-Pubkey": pubkey,
                "X-Signature": signature
            },
            endpoint: 'happ',
        },
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

export async function dashboardStats(days, signature, nonce, timestamp, pubkey, environment, serviceLogPort) {
    console.log(`🧮 fetchDashboardStats environment: ${environment} serviceLogPort: ${serviceLogPort} timestamp: ${timestamp} nonce: ${nonce} pubkey: ${pubkey} signature: ${signature}`)
    try {
        const result = await serviceLogApiCall({
            params: { days },
            headers: {
                "X-Nonce": nonce,
                "X-Timestamp": timestamp,
                "X-Pubkey": pubkey,
                "X-Signature": signature
            },
            endpoint: 'dashboard',
        },
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
