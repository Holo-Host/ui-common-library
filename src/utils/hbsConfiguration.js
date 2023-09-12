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

  export const authServiceVersion = function(envirionment) {
    return (envirionment)
    ? AuthServiceVersion[envirionment]
    : AuthServiceVersion[Environment.local]
  }

  export const authServiceUrl = function(envirionment, hbsServicePort) {
    return HbsServiceURL(
      'auth',
      envirionment || Environment.localNoBackend,
      hbsServicePort || '3003'
    )    
  }
  
  