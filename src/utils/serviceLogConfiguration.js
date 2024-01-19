import { Environment } from './consts'

// HBS URLs:
const ServicelogApiURLForEnvironment = (key, port) => {
    switch (key) {
      case Environment.local:
        return `http://localhost:${port}`
  
      case Environment.localNoBackend:
        return `https://servicelog-vault.dev.holotest.net/v1`
  
      case Environment.development:
        return `https://servicelog-vault.dev.holotest.net/v1`
      case Environment.qa:
        return `https://servicelog-vault.qa.holotest.net/v1`
      case Environment.production:
        return `https://servicelog-vault.holo.host/v1`
  
      default:
        throw new Error('Error resolving service url. Found invalid environment key.')
    }
  }

  export const serviceLogApiUrl = function(environment, serviceLogPort) {
    const servicelog_api_url = ServicelogApiURLForEnvironment(
      environment || Environment.localNoBackend,
      serviceLogPort || '8000'
    )

    return servicelog_api_url
  }