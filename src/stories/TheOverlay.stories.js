import { onMounted } from 'vue'
import TheOverlay from '../components/TheOverlay.vue'
import { EOverlayTheme, EOverlayType, useOverlay } from '../composables/useOverlay'

const { showOverlay, hideOverlay } = useOverlay()

export default {
  title: 'TheOverlay',
  component: TheOverlay
}

export const Loading = (args) => ({
  components: { TheOverlay },

  setup() {
    onMounted(() => {
      showOverlay()

      setTimeout(() => {
        hideOverlay()
      }, 5000)
    })

    return { args }
  },

  template: '<div><TheOverlay /></div>'
})

export const WithContent = (args) => ({
  components: { TheOverlay },

  setup() {
    onMounted(() => {
      showOverlay({
        type: EOverlayType.message,
        message: 'Logging out...'
      })

      setTimeout(() => {
        hideOverlay()
      }, 5000)
    })

    return { args }
  },

  template: '<div><TheOverlay /></div>'
})

export const DarkTheme = (args) => ({
  components: { TheOverlay },

  setup() {
    onMounted(() => {
      showOverlay({
        theme: EOverlayTheme.dark
      })

      setTimeout(() => {
        hideOverlay()
      }, 5000)
    })

    return { args }
  },

  template: '<div><TheOverlay /></div>'
})
