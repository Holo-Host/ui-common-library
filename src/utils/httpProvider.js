import axios from 'axios'

const REQUEST_TIMEOUT = 10000


export async function httpCall({
  serviceUrl,
  version = 'v1',
  method = 'get',
  endpoint = '',
  headers = {},
  params = {},
  query = '',
  isRaw = false
}) {
  let url = isRaw ? serviceUrl ?? '' : `${serviceUrl}/api/${version}/${endpoint}`

  if (query) {
    url = `${url}${query}`
  }

  switch (method) {
    case 'get':
      return axios.get(url, { params, headers, timeout: REQUEST_TIMEOUT })

    case 'post':
      return axios.post(url, params, { headers, timeout: REQUEST_TIMEOUT })

    case 'patch':
      return axios.patch(url, params, { headers, timeout: REQUEST_TIMEOUT })

    case 'put':
      return axios.put(url, params, { headers, timeout: REQUEST_TIMEOUT })

    case 'delete':
      return axios.delete(url, { params, headers, timeout: REQUEST_TIMEOUT })

    default:
      throw new Error(`No case in httpProvider for ${method} method`)
  }
}
