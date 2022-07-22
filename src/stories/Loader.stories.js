import Loader from 'components/Loader.vue'

export default {
  title: 'Loader',
  component: Loader,

  parameters: {
    backgrounds: {
      default: 'light'
    }
  },

  argTypes: {
    scale: '1'
  }
}

const kTemplate = (args) => ({
  components: { Loader },

  setup() {
    return { args }
  },

  template: '<div :class="args.classes"><Loader v-bind="args" /></div>'
})

export const Default = kTemplate.bind({})
Default.args = {
  scale: 1,
  color: 'primary',
  classes: 'add-space-at-the-top'
}
