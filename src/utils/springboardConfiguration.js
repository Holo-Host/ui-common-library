import { Environment } from './consts'

const SpringboardURL = {
    [Environment.local]: 'https://local-springboard.holo.host:8081',
    [Environment.localNoBackend]: 'https://local-springboard.holo.host:8081',
    [Environment.development]: 'https://springboard.dev.holotest.net',
    [Environment.qa]: 'https://springboard.qa.holotest.net',
    [Environment.alpha]: 'https://springboard.holo.host',
    [Environment.production]: 'https://springboard.holo.host'
}
  
export const springBoardUrl = function(envirionment) {
    return (envirionment)
    ? SpringboardURL[envirionment]
    : SpringboardURL[Environment.local]
}