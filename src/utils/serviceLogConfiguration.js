import { Environment } from './consts'

// HBS URLs:
const ServicelogApiURLForEnvironment = (key, port) => {
    switch (key) {
      case Environment.local:
        return `http://localhost:${port}`
  
      case Environment.localNoBackend:
        return `http://localhost:${port}`
  
      case Environment.development:
        return `https://servicelog-api.dev.holotest.net`
  
      case Environment.qa:
        return `https://servicelog-api.qa.holotest.net`
  
      case Environment.production:
        return `https://servicelog-api.holo.host`
  
      default:
        throw new Error('Error resolving service url. Found invalid environment key.')
    }
  }

  export const serviceLogApiUrl = function(environment, serviceLogPort) {
    const servicelog_api_url = ServicelogApiURLForEnvironment(
      environment || Environment.localNoBackend,
      serviceLogPort || '3004'
    )

    return servicelog_api_url
  }