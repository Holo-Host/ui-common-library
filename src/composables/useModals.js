import { ref } from 'vue'

const visibleModal = ref(null)

export function useModals() {
  function showModal(modalName) {
    visibleModal.value = modalName
  }

  function hideModal() {
    visibleModal.value = null
  }

  return {
    visibleModal,
    showModal,
    hideModal
  }
}
