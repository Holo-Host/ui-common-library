import { ref, shallowRef } from 'vue'

export const EBannerType = {
  error: 'error',
  warning: 'warning',
  success: 'success'
}

let timeout = 0
const kHideTime = 5000

const isVisible = ref(false)
const message = ref('')
const type = ref(EBannerType.error)
const hasCloseButton = ref(false)
const contentComponent = shallowRef()

export function useBanner() {
  function showBanner(props) {
    clearTimeout(timeout)

    type.value = props?.type ?? EBannerType.error
    message.value = props?.message ?? ''
    hasCloseButton.value = props?.hasCloseButton ?? false
    contentComponent.value = props?.contentComponent ?? ''
    isVisible.value = true

    timeout = window.setTimeout(() => {
      isVisible.value = false
    }, kHideTime)
  }

  function hideBanner() {
    clearTimeout(timeout)
    isVisible.value = false
  }

  return {
    isVisible,
    message,
    type,
    hasCloseButton,
    contentComponent,
    showBanner,
    hideBanner
  }
}
