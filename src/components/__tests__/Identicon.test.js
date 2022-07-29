import { mount } from '@vue/test-utils'
import Identicon from '../Identicon.vue'

const agentKey = new Uint8Array([132, 32, 36, 177, 62, 112, 123, 211, 45, 109, 216, 192, 55, 44, 229, 215, 241, 44, 157, 52, 13, 33, 118, 253, 61, 108, 253, 255, 19, 42, 222, 25, 214, 65, 243, 197, 214, 210, 8])

describe('Identicon', () => {
  const setup = (props) => {
    return mount(Identicon, {
      propsData: {
        agentKey,
        ...props
      }
    })
  }

  it('renders', () => {
    const wrapper = setup()
    expect(wrapper.findAll("[data-testid='identicon']")).toHaveLength(1)
  })
})
