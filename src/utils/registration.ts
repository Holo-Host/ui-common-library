import * as msgpack from '@msgpack/msgpack'

// getMembraneProof has two cases. If membrane_proof_server_url is provided
// it passes registration_code to the membrane proof server and returns the membrane proof returned from the server
// if no server is provided, it treats the registration_code itself as the membrane proof.
// In either case, the membrane_proof is assumed to be the original element, msgpack encoded and then encoded as a base64 string
// Envoy expects the msgpack encoded data, so we decode the base64 string before passing it to Envoy

export type GetMembraneProofInput = {
  registration_code: string,
  membrane_proof_server_url?: string, // the presence or absence of the url changes the behavior of the function
  membrane_proof_server_payload: string,
  agent_id: string,
  email: string
}

export type MembraneProof = Buffer

// Mostly for internal use and testing. You probably want getMembraneProof below
export async function getBase64EncodedMembraneProof ({
  registration_code,
  membrane_proof_server_url,
  membrane_proof_server_payload,
  agent_id,
  email
}: GetMembraneProofInput): Promise<string> {
  if (!registration_code) {
    throw new Error('No registration code provided')
  }

  if (!membrane_proof_server_url) {
    // if there's no server, use the registration_code as a membrane_proof
    return registration_code
  }

  // Get the membrane_proof from the server
  let params

  const payload = typeof membrane_proof_server_payload === 'string'
    ? JSON.parse(membrane_proof_server_payload)
    : membrane_proof_server_payload

  try {
      params = {
        registration_code,
        agent_pub_key: agent_id,
        email: email,
        payload,
      }
  } catch {
      throw new Error('Membrane Proof payload parsing error')
  }

  console.log(`^&* about to fetch registration`, membrane_proof_server_url)
  console.log(`^&* params`, params)
  console.log(`^&* JSON.stringify(params)`, JSON.stringify(params))

  let data
  try {
      const resp = await fetch(`${membrane_proof_server_url}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
      })

      data = await resp.json()

      console.log("^&* data", data)
  } catch (e: any) {
      throw new Error(`Membrane Proof Server network error: ${e?.message}`)
  }

  if (data.error) {
      throw data
  }

  return data.mem_proof
}

export async function getMembraneProof (input: GetMembraneProofInput): Promise<Buffer> {  
  return Buffer.from(await getBase64EncodedMembraneProof(input), 'base64')
}

export function generateUnusedMemproof (): Buffer {
  return Buffer.from(msgpack.encode(process.env.UNUSED_MEMPROOF))
}

