import HAppCardUsage from '../components/HAppCardUsage.vue'
import { hAppMock } from './mocks'

export default {
  title: 'HAppCardUsage',
  component: HAppCardUsage,

  argTypes: {
    happ: hAppMock
  }
}

const kTemplate = (args) => ({
  components: { HAppCardUsage },
  setup() {
    return { args }
  },
  template: '<HAppCardUsage v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  happ: hAppMock
}
