import HAppCardUsageItem from '../components/HAppCardUsageItem.vue'

export default {
  title: 'HAppCardUsageItem',
  component: HAppCardUsageItem,

  argTypes: {
    item: {
      value: 12345,
      unit: 'MB',
      isDisabled: false
    }
  }
}

const kTemplate = (args) => ({
  components: { HAppCardUsageItem },
  setup() {
    return { args }
  },
  template: '<HAppCardUsageItem v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  item: {
    value: 12345,
    unit: 'MB',
    isDisabled: false
  }
}

export const Disabled = kTemplate.bind({})
Disabled.args = {
  item: {
    value: 12345,
    unit: 'MB',
    isDisabled: true
  }
}
