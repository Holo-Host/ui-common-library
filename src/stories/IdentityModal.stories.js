import IdentityModal from 'components/IdentityModal.vue'

export default {
  title: 'IdentityModal',
  component: IdentityModal,

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
  components: { IdentityModal },

  setup() {
    return { args }
  },

  template: '<div :class="args.classes"><IdentityModal v-bind="args" /></div>'
})

export const Default = kTemplate.bind({})
Default.args = {
  holoHash: Uint8Array.from('5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5'),
  size: '100',
  backgroundColor: '#FF175D'
}
