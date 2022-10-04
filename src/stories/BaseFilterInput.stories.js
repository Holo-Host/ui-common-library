import BaseFilterInput from '../components/BaseFilterInput.vue'

export default {
  title: 'BaseFilterInput',
  component: BaseFilterInput,

  argTypes: {
    isDisabled: false,
    value: ''
  }
}

const kTemplate = (args) => ({
  components: { BaseFilterInput },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseFilterInput v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  isDisabled: false,
  value: ''
}
