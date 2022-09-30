import { ESortDirections } from '../types/ui'
import BaseTableHeaderItem from '@/components/BaseTableHeaderItem.vue'
import { headersMap } from "@/stories/mocks";

export default {
  title: 'BaseTableHeaderItem',
  component: BaseTableHeaderItem,

  argTypes: {
    header: [...headersMap.values()][0],
    isSelected: false,
    sortDirection: {
      options: [ESortDirections.asc, ESortDirections.desc],
      control: {
        type: 'select'
      }
    }
  }
}

const kTemplate = (args) => ({
  components: { BaseTableHeaderItem },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseTableHeaderItem v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  header: [...headersMap.values()][0],
  isSelected: false,
  sortDirection: ESortDirections.desc
}
