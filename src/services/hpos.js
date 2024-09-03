import axios from 'axios'

export const getHolofuelAppIdAxios = async() => {

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }

  const HPOS_API_URL = `${location.protocol}//${location.host}`
  const pathPrefix = '/api/v2/'
  const path = 'apps/holofuel/version'
  const fullUrl = `${HPOS_API_URL}${pathPrefix}${path}`

  const authToken = localStorage.getItem('authToken')

  console.log(`🦋 getHolofuelAppIdAxios: authToken: ${authToken}`)

  const headers = {
    'X-Hpos-Auth-Token': authToken,
    ...axiosConfig.headers,
    ...userHeaders
  }

  response = await axios.get(fullUrl, { params, headers })
  return response.data.version

}

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
    const pathPrefix = '/api/v2/'
    const fullUrl = `${HPOS_API_URL}${pathPrefix}${path}`

    console.log(`🦋hpos.js hposHolochainCall fullUrl: ${fullUrl}`, params)
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