import { onMounted, shallowRef } from 'vue'
import TheOverlay from '../components/TheOverlay.vue'
import { EOverlayTheme, EOverlayType } from '@/utils/notifications'
import Docs from './markdown/TheOverlay.mdx'

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
      overlayRef.value?.hide()
      overlayRef.value?.show(args)

      setTimeout(() => {
        overlayRef.value?.hide()
      }, 5000)
    })

    return { args, overlayRef }
  },

  template: '<div><TheOverlay ref="overlayRef" /></div>'
})

export const Readme = () => ({
  setup() {
    const overlayRef = shallowRef()

    onMounted(() => {
      overlayRef.value?.hide()
    })

    return { overlayRef }
  },

  template: '<div></div>'
})

Readme.parameters = {
  docs: {
    page: Docs
  }
}

export const Default = kTemplate.bind({})
Default.parameters = {
  docs: {
    page: null
  }
}

export const DarkTheme = kTemplate.bind({})
DarkTheme.args = {
  theme: EOverlayTheme.dark
}
DarkTheme.parameters = {
  docs: {
    page: null
  }
}

export const WithContent = kTemplate.bind({})
WithContent.args = {
  type: EOverlayType.message,
  message: 'Logging out...'
}
WithContent.parameters = {
  docs: {
    page: null
  }
}
