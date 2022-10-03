import BaseTableEmptyContent from '@/components/BaseTableEmptyContent.vue'

export default {
  title: 'BaseTableEmptyContent',
  component: BaseTableEmptyContent,

  argTypes: {
    isLoading: false,
    isError: false,
    emptyMessageTranslationKey: ''
  }
}

const kTemplate = (args) => ({
  components: { BaseTableEmptyContent },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseTableEmptyContent v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  isLoading: false,
  isError: false,
  emptyMessageTranslationKey: undefined
}

export const Loading = kTemplate.bind({})
Loading.args = {
  isLoading: true,
  isError: false,
  emptyMessageTranslationKey: ''
}

export const Error = kTemplate.bind({})
Error.args = {
  isLoading: false,
  isError: true,
  emptyMessageTranslationKey: ''
}
