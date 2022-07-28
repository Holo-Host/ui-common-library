import Identicon2 from 'components/IdentIcon2.vue'

export default {
  title: 'Identicon2',
  component: Identicon2,

  parameters: {
    backgrounds: {
      default: 'light'
    }
  },

  argTypes: {
    hash: '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5',
    size: '100',
    backgroundColor: '#FF175D',
    styleProp: Object
  }
}

const kTemplate = (args) => ({
  components: { Identicon2 },

  setup() {
    return { args }
  },

  template: '<div :class="args.classes"><Identicon2 v-bind="args" /></div>'
})

export const Default = kTemplate.bind({})
Default.args = {
  hash: '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5',
  size: '100',
  backgroundColor: '#FF175D'
}
