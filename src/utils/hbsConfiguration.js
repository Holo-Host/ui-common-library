import { Environment } from './consts'

// HBS URLs:
const HbsServiceURL = (service, key, port) => {
    switch (key) {
      case Environment.local:
        return `http://localhost:${port}/${service}`
  
      case Environment.localNoBackend:
        return `https://hbs.dev.holotest.net/${service}`
        // return `http://localhost:3001/${service}`
  
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

  const AuthServiceVersion = {
    [Environment.local]: 'v1',
    [Environment.development]: 'v1',
    [Environment.qa]: 'v1',
    [Environment.production]: 'v1'
  }  
  const CONFIG_ENVIRONMENT = ( import.meta.env ) ? import.meta.env.VITE_ENV : process.env.VUE_ENV
  const HBS_SERVICE_PORT = ( import.meta.env ) ? import.meta.env.VITE_OPS_SERVICE_PORT : process.env.VUE_OPS_SERVICE_PORT

  export const AUTH_SERVICE_URL = HbsServiceURL(
    'auth',
    CONFIG_ENVIRONMENT || Environment.localNoBackend,
    HBS_SERVICE_PORT || '3003'
  )

  export const AUTH_SERVICE_VERSION = CONFIG_ENVIRONMENT
    ? AuthServiceVersion[CONFIG_ENVIRONMENT]
    : AuthServiceVersion[Environment.local]
  
  