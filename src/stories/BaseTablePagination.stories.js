import BaseTablePagination from '@/components/BaseTablePagination.vue'

const kPageSizeOptions = [5, 10, 20, 30, 50]

export default {
  title: 'BaseTablePagination',
  component: BaseTablePagination,

  argTypes: {
    pageSize: {
      options: kPageSizeOptions,
      control: {
        type: 'select'
      }
    },
    itemsCount: 38,
    currentPage: 0
  }
}

const kTemplate = (args) => ({
  components: { BaseTablePagination },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseTablePagination v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  pageSize: 10,
  itemsCount: 38,
  currentPage: 0
}
