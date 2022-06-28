import wait from 'waait'
import { EventEmitter } from 'events'

const SIMULATE_LAG = false
const getRandomLoadingTime = () => 2000 + Math.floor(Math.random() * 4000)

export const zomeData = {}

// see the bottom of this file for structure of initialZomeData (go past all that mock data)
export const resetZomeData = () => {
  zomeData.hha = { ...initialZomeData.hha }
}

const zomeCall = async ({ zomeName, fnName, payload }) => {
  const zome = zomeData[zomeName]

  if (SIMULATE_LAG) {
    await wait(getRandomLoadingTime())
  }

  if (!zome)
    throw new Error(
      `Mock dna called with unrecognized zome: ${zomeName}.${fnName}(${payload})`
    )

  const fn_or_result = zome[fnName]

  if (fn_or_result === undefined)
    throw new Error(
      `Mock dna called with unrecognized zome function: ${zomeName}.${fnName}(${payload})`
    )

  let data

  if (typeof fn_or_result === 'function') {
    data = await fn_or_result(payload)
  } else {
    data = fn_or_result
  }

  // Currently doesn't support type: 'error'
  return {
    type: 'ok',
    data
  }
}

export default class WebSdkApi extends EventEmitter {
  constructor () {
    super()
    this.agent = {
      id: new Uint8Array(
        [...new Array(39)].map(() => Math.floor(Math.random() * 256))
      ),
      isAnonymous: false,
      isAvailable: true,
      unrecoverableError: null,
      hostUrl: 'hostUrl mock placeholder'
    }
  }

  static connect = async () => {
    const webSdkApi = new WebSdkApi()
    return webSdkApi
  }

  async signUp () {}
  async signIn () {}
  async signOut () {}


  appInfo () {
    return Promise.resolve({
      cell_data: [
        {
          cell_id: [
            'uhC0k.. dna hash mock placeholder',

          ],
          role_id: 'role id mock placeholder'
        }
      ]
    })
  }

  zomeCall (...args) {
    return zomeCall(...args)
  }

  addListener () {}
}

const oneHapp = {
  id: '000',
  provider_pubkey: 'uhCak...',
  is_draft: true,
  hosted_url: "https://chat.holo.host",
  bundle_url: "https://github.com/holochain/elemental-chat/releases/download/v0.2.0-alpha11/elemental-chat.0_2_0_alpha11.happ",
  ui_src_url: "/tmp/path/to/ui/file",
  logo_url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Grogu_%28Star_Wars%29.jpg',
  name: "A new draft happ",
  uid: "test-uid",
  description: "a chat happ",
  categories: [],
  jurisdictions: [],
  dnas: [{
    hash: "Qmtmp...",
    src_url: "https://github.com/holochain/elemental-chat/releases/download/v0.2.0-alpha11/elemental-chat.dna",
    nick: "elemental-chat",
  }],
  hosting_prices: {
    cpu: "1",
    storage: "2",
    bandwidth: "3"
  },
  login_config: {
    display_publisher_name: false,
    registration_info_url: "/path/to/help"
  }
}

const happs = [
  oneHapp,
  {
    ...oneHapp,
    id: '001',
    name: 'Elemental Chat',
    is_draft: false
  }
]

const initialZomeData = {
  hha: {
    get_my_happs: happs,
    create_draft: payload => ({
      ...payload,
      id: '000',
      provider_pubkey: 'uhCak...',
      is_draft: true
    }),
    publish_happ: draftId => {
      let happ = happs.find(happ => happ.id === draftId)

      if (!happ) {
        happ = happs[0]
      }

      return {
        ...happ,
        id: draftId + 'a',
        is_draft: false
      }
    }
  }
}

resetZomeData()
