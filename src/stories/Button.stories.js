import Button from '../components/Button.vue'

export default {
  title: 'Button',
  component: Button,

  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'disabled',
        'grayed-out',
        'primary-disabled',
        'primary-enabled',
        'none'
      ],
      control: {
        type: 'select'
      }
    },
    isBusy: false,
    onClick: {}
  }
}

const kTemplate = (args) => ({
  components: { Button },
  setup() {
    return { args }
  },
  template: '<Button v-bind="args">Slot content</Button>'
})

export const Default = kTemplate.bind({})
Default.args = {
  color: 'primary',
  isBusy: false,
}
