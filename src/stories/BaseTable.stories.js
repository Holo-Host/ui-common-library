import BaseTable from '@/components/BaseTable.vue'
import BaseTableRow from '@/components/BaseTableRow.vue'
import BaseTableRowItem from '@/components/BaseTableRowItem.vue'
import {
  headersMap,
  mockPaidInvoicesData
} from "@/stories/mocks";

export default {
  title: 'BaseTable',
  component: BaseTable,

  argTypes: {
    headers: [...headersMap.values()],
    initialSortBy: 'completed_date',
    items: mockPaidInvoicesData,
    isLoading: false,
    isError: false
  }
}

const kTemplate = (args) => ({
  components: {
    BaseTable,
    BaseTableRow,
    BaseTableRowItem
  },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '' +
    '<BaseTable v-slot="{ items }" v-bind="args">' +
    ' <BaseTableRow v-for="item in items" :key="item.id">' +
    '   <BaseTableRowItem :value="item.note" is-visible-on-mobile is-bold/>' +
    '   <BaseTableRowItem :value=""/>' +
    '   <BaseTableRowItem :value="item.completed_date" is-visible-on-mobile is-bold/>' +
    '   <BaseTableRowItem :value="item.expiration_date" is-visible-on-mobile is-bold/>' +
    '   <BaseTableRowItem :value="" is-visible-on-mobile is-bold/>' +
    '   <BaseTableRowItem :value="item.amount" is-visible-on-mobile is-bold/>' +
    ' </BaseTableRow>' +
    '</BaseTable>'
})

export const Default = kTemplate.bind({})
Default.args = {
  headers: [...headersMap.values()],
  initialSortBy: 'completed_date',
  items: mockPaidInvoicesData,
  isLoading: false,
  isError: false
}

export const EmptyTable = kTemplate.bind({})
EmptyTable.args = {
  headers: [...headersMap.values()],
  initialSortBy: 'completed_date',
  items: [],
  isLoading: false,
  isError: false
}

export const LoadingState = kTemplate.bind({})
LoadingState.args = {
  headers: [...headersMap.values()],
  initialSortBy: 'completed_date',
  items: [],
  isLoading: true,
  isError: false
}

export const ErrorState = kTemplate.bind({})
ErrorState.args = {
  headers: [...headersMap.values()],
  initialSortBy: 'completed_date',
  items: [],
  isLoading: false,
  isError: true
}
