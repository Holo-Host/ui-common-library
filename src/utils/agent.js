import {Base64} from "js-base64";

export const agentIdRegex = /^uhCAk([A-Za-z0-9_\-]{48})$/

export const decodeAgentId = base64AgentId =>
  Base64.toUint8Array(base64AgentId)

export const encodeAgentId = agentIdBuffer => `u${Base64.fromUint8Array(agentIdBuffer, true)}`