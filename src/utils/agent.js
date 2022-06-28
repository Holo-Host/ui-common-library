export const agentIdRegex = /^uhCAk([A-Za-z0-9_\-]{48})$/

export const decodeAgentId = base64AgentId =>
  new Uint8Array(Buffer.from(base64AgentId.slice(1), 'base64'))

export const encodeAgentId = agentIdBuffer => {
  const base64 = Buffer.from(agentIdBuffer).toString('base64')
  let urlSafeBase64 = ''
  for (let i = 0; i < base64.length; i++) {
    let char = base64.charAt(i)
    if (char === '/') {
      char = '_'
    } else if (char === '+') {
      char = '-'
    }
    urlSafeBase64 += char
  }
  if (urlSafeBase64.charAt(0) !== 'u') {
    return 'u' + urlSafeBase64
  } else {
    return urlSafeBase64
  }
}
