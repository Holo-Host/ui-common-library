import { onMounted, shallowRef } from 'vue'
import TheOverlay from '../components/TheOverlay.vue'
import { EOverlayTheme, EOverlayType } from '@/utils/notifications'

export default {
  title: 'TheOverlay',
  component: TheOverlay
}

const kTemplate = (args) => ({
  components: { TheOverlay },

  argTypes: {
    theme: EOverlayTheme.light,
    type: EOverlayType.loading,
    icon: '',
    message: ''
  },

  setup() {
    const overlayRef = shallowRef()

    onMounted(() => {
      overlayRef.value?.show(args)
    })

    return { args, overlayRef }
  },

  template: '<div><TheOverlay ref="overlayRef" /></div>'
})

export const Default = kTemplate.bind({})

export const DarkTheme = kTemplate.bind({})
DarkTheme.args = {
  theme: EOverlayTheme.dark
}

export const WithContent = kTemplate.bind({})
WithContent.args = {
  type: EOverlayType.message,
  message: 'Check your email'
}
