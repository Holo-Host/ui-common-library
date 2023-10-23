import HAppCard from '../components/HAppCard.vue'
import CashIcon from '../components/icons/CashIcon.vue'
import { hAppMock } from './mocks'

export default {
  title: 'HAppCard',
  component: HAppCard,

  argTypes: {
    happ: hAppMock,
    isEmpty: false,
    emptyCardLabel: '',
    areDetailsAvailable: false
  }
}

const kTemplate = (args) => ({
  components: { HAppCard },
  setup() {
    return { args }
  },
  template: '<HAppCard v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  happ: hAppMock,
  isEmpty: false,
  emptyCardLabel: '',
  areDetailsAvailable: false
}

export const EmptyWithLabel = kTemplate.bind({})
EmptyWithLabel.args = {
  happ: null,
  isEmpty: true,
  emptyCardLabel: '$.errors.no_data',
  areDetailsAvailable: false
}

export const WithEnabledLink = kTemplate.bind({})
WithEnabledLink.args = {
  happ: hAppMock,
  isEmpty: false,
  emptyCardLabel: '',
  areDetailsAvailable: true
}

const kEmptyWithCustomContentTemplate = (args) => ({
  components: { HAppCard, CashIcon },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<HAppCard v-bind="args"><template #empty-content><CashIcon/> Custom empty content slot</template></HAppCard>'
})

export const EmptyWithCustomContent = kEmptyWithCustomContentTemplate.bind({})
EmptyWithCustomContent.args = {
  happ: null,
  isEmpty: true
}
