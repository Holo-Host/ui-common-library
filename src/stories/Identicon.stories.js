import Identicon from 'components/Identicon.vue'

export default {
  title: 'Identicon',
  component: Identicon,

  parameters: {
    backgrounds: {
      default: 'light'
    }
  },

  argTypes: {
    holoHash: Uint8Array.from('5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5'),
    size: '100',
    backgroundColor: '#FF175D',
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
  holoHash: Uint8Array.from('5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5'),
  size: '100',
  backgroundColor: '#FF175D'
}
