import Identicon from 'components/Identicon.vue'

const agentKey = new Uint8Array([132, 32, 36, 177, 62, 112, 123, 211, 45, 109, 216, 192, 55, 44, 229, 215, 241, 44, 157, 52, 13, 33, 118, 253, 61, 108, 253, 255, 19, 42, 222, 25, 214, 65, 243, 197, 214, 210, 8])

export default {
  title: 'Identicon',
  component: Identicon,

  parameters: {
    backgrounds: {
      default: 'light'
    }
  },

  argTypes: {
    clickable: true,
    agentKey,
    size: '100',
    backgroundColor: String,
    styleProp: Object
  }
}

const kTemplate = (args) => ({
  components: { Identicon },

  setup() {
    return { args }
  },

  template: '<div :class="args.classes"><Identicon v-bind="args" /></div>'
})

export const Default = kTemplate.bind({})
Default.args = {
  clickable: true,
  agentKey,
  size: '100',
}
