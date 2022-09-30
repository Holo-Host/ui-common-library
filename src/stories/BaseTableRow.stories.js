import BaseTableRow from '@/components/BaseTableRow.vue'

export default {
  title: 'BaseTableRow',
  component: BaseTableRow
}

const kTemplate = () => ({
  components: { BaseTableRow },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseTableRow>Slot content<template #expanded-content>Expanded content</template></BaseTableRow>'
})

export const Default = kTemplate.bind({})
Default.args = {}
