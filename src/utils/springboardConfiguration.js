import { Environment } from './consts'

const CONFIG_ENVIRONMENT = ( import.meta.env ) ? import.meta.env.VITE_ENV : process.env.VUE_ENV

const SpringboardURL = {
    [Environment.local]: 'https://local-springboard.holo.host:8081',
    [Environment.localNoBackend]: 'https://local-springboard.holo.host:8081',
    [Environment.development]: 'https://springboard.dev.holotest.net',
    [Environment.qa]: 'https://springboard.qa.holotest.net',
    [Environment.alpha]: 'https://springboard.holo.host',
    [Environment.production]: 'https://springboard.holo.host'
}
  
export const SPRINGBOARD_URL = CONFIG_ENVIRONMENT
    ? SpringboardURL[CONFIG_ENVIRONMENT]
    : SpringboardURL[Environment.local]
