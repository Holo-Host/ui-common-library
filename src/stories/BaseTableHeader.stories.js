import BaseTableHeader from '@/components/BaseTableHeader.vue'
import { headersMap } from "@/stories/mocks";

export default {
  title: 'BaseTableHeader',
  component: BaseTableHeader,

  argTypes: {
    headers: [...headersMap.values()],
    sortBy: {
      options: [...headersMap.keys()],
      control: {
        type: 'select'
      }
    }
  }
}

const kTemplate = (args) => ({
  components: { BaseTableHeader },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseTableHeader v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  headers: [...headersMap.values()],
  sortBy: 'completed_date'
}
