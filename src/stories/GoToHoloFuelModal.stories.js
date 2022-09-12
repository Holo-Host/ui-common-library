import GoToHoloFuelModal from '../components/GoToHoloFuelModal.vue'

export default {
  title: 'GoToHoloFuelModal',
  component: GoToHoloFuelModal,

  argTypes: {
    isVisible: true,
    dontShowModalAgainLocalStorageKey: 'holo.ui-common-library.dontShowGoToHoloFuelModalAgain',
    holoFuelUrl: 'http://localhost:8000/holofuel',
  }
}

const kTemplate = (args) => ({
  components: { GoToHoloFuelModal },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<GoToHoloFuelModal v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  isVisible: true,
  dontShowModalAgainLocalStorageKey: 'holo.ui-common-library.dontShowGoToHoloFuelModalAgain',
  holoFuelUrl: 'http://localhost:8000/holofuel',
}
