import BaseCard from '@/components/BaseCard.vue'

export default {
  title: 'BaseCard',
  component: BaseCard,

  argTypes: {
    title: '',
    subtitle: '',
    withMoreButton: false
  }
}

const kTemplate = (args) => ({
  components: { BaseCard },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseCard v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  title: 'Card Title',
  subtitle: 'Card Subtitle',
  withMoreButton: false
}
