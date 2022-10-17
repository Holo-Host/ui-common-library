import BaseSearchInput from '../components/BaseSearchInput.vue'

export default {
  title: 'BaseSearchInput',
  component: BaseSearchInput,

  argTypes: {
    isDisabled: false,
    value: ''
  }
}

const kTemplate = (args) => ({
  components: { BaseSearchInput },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseSearchInput v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  isDisabled: false,
  value: ''
}
