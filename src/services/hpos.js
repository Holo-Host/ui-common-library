import axios from 'axios'

export const hposHolochainCall = async ({
    path,
    headers: userHeaders = {},
    params,
    method = 'post',
  }) => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }

    const HPOS_API_URL = `${window.location.protocol}//${window.location.host}`
    const pathPrefix = '/holochain-api/v1/'
    const fullUrl = `${HPOS_API_URL}${pathPrefix}${path}`

    const authToken = localStorage.getItem('authToken')

    const headers = {
      'X-Hpos-Auth-Token': authToken,
      ...axiosConfig.headers,
      ...userHeaders
    }

    let response

    switch (method) {
      case 'get':
        response = await axios.get(fullUrl, { params, headers })
        return response.data

      case 'post':
        response = await axios.post(fullUrl, params, { headers })
        return response.data

      case 'put':
        response = await axios.put(fullUrl, params, { headers })
        return response.data

      case 'delete':
        response = await axios.delete(fullUrl, { params, headers })
        return response.data

      default:
        throw new Error(`No case in hposCall for ${method} method`)
      }
  }