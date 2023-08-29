import { Environment } from './consts'

// HBS URLs:
const HbsServiceURL = (service, key, port) => {
    switch (key) {
      case Environment.local:
        return `http://localhost:${port}/${service}`
  
      case Environment.localNoBackend:
        // return `https://hbs.dev.holotest.net/${service}`
        return `http://localhost:3001/${service}`
  
      case Environment.development:
        return `https://hbs.dev.holotest.net/${service}`
  
      case Environment.qa:
        return `https://hbs.qa.holotest.net/${service}`
  
      case Environment.production:
        return `https://hbs.holo.host/${service}`
  
      default:
        throw new Error('Error resolving service url. Found invalid environment key.')
    }
  }

  export const AUTH_SERVICE_URL = HbsServiceURL(
    'auth',
    process.env.VUE_ENV || Environment.localNoBackend,
    process.env.VUE_OPS_SERVICE_PORT || '3003'
  )
  
  const AuthServiceVersion = {
    [Environment.local]: 'v1',
    [Environment.development]: 'v1',
    [Environment.qa]: 'v1',
    [Environment.production]: 'v1'
  }
  
  export const AUTH_SERVICE_VERSION = process.env.VUE_ENV
    ? AuthServiceVersion[process.env.VUE_ENV]
    : AuthServiceVersion[Environment.local]
  
  