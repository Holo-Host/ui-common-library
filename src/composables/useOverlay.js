import { ref } from 'vue'

export const EOverlayType = {
  loading: 0,
  message: 1
}

export const EOverlayTheme = {
  light: 0,
  dark: 1
}

const isVisible = ref(false)
const message = ref('')
const type = ref(EOverlayType.loading)
const icon = ref(null)
const theme = ref(EOverlayTheme.light)

// We use setTimeout to delay the showing of the overlay.
// When the overlay is hidden we must cancel the timeout.
let timeout = 0

const kMinShowTime = 750 // ms

/*
 We want the overlay to appear for at least kMinShowTime, even if it is hidden
 before then. It doesn't look good if it just flashes on screen. So we keep
 track of the time after which it can be hidden.
*/
let hideTime = 0

export function useOverlay() {
  function showOverlay(object) {
    const delay = object?.delay ?? 0

    type.value = object?.type ?? EOverlayType.loading
    theme.value = object?.theme ?? EOverlayTheme.light
    message.value = object?.message ?? ''
    icon.value = object?.icon ?? null

    // We can hide the overlay kMinShowTime ms after it appears
    hideTime = Date.now() + delay + kMinShowTime
    timeout = window.setTimeout(() => {
      isVisible.value = true
    }, delay)
  }

  function hideOverlay() {
    clearTimeout(timeout)
    const timeLeft = hideTime - Date.now()

    if (timeLeft > 0) {
      setTimeout(() => {
        isVisible.value = false
      }, timeLeft)
    } else {
      isVisible.value = false
    }
  }

  function showLoadingOverlay() {
    showOverlay()
  }

  return {
    isVisible,
    message,
    type,
    icon,
    theme,
    showOverlay,
    hideOverlay,
    showLoadingOverlay
  }
}
