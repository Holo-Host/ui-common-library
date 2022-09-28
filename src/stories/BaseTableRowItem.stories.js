import BaseTableRowItem from '@/components/BaseTableRowItem.vue'

export default {
  title: 'BaseTableRowItem',
  component: BaseTableRowItem,

  argTypes: {
    align: {
      options: ['start', 'end', 'center'],
      control: {
        type: 'select'
      }
    },
    isBold: false,
    isVisibleOnMobile: false,
    value: 'Value'
  }
}

const kTemplate = (args) => ({
  components: { BaseTableRowItem },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseTableRowItem v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  align: 'start',
  isBold: false,
  isVisibleOnMobile: false,
  value: 'Value'
}
