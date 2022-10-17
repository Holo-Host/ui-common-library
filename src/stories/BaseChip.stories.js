import BaseChip from '../components/BaseChip.vue'
import { EChipType } from '../types/ui'

export default {
  title: 'BaseChip',
  component: BaseChip,

  argTypes: {
    type: {
      options: [
        EChipType.info,
        EChipType.danger,
        EChipType.success,
        EChipType.custom
      ],
      control: {
        type: 'select',
        labels: {
          [EChipType.info]: 'info',
          [EChipType.danger]: 'danger',
          [EChipType.success]: 'success',
          [EChipType.custom]: 'custom'
        }
      }
    },
    label: 'Chip',
    customTheme: {}
  }
}

const kTemplate = (args) => ({
  components: { BaseChip },
  setup() {
    return { args }
  },
  template: '<BaseChip v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  type: EChipType.info,
  label: 'Chip'
}

export const CustomTheme = kTemplate.bind({})
CustomTheme.args = {
  type: EChipType.custom,
  label: 'CuStOm ChIp',
  customTheme: {
    fontColor: 'gray',
    backgroundColor: 'yellow'
  }

}
