import { ref } from 'vue'

const visibleModal = ref(null)
const modalProps = ref({})

export function useModals() {
  function showModal(modalName, props) {
    visibleModal.value = modalName
    modalProps.value = props
  }

  function hideModal() {
    visibleModal.value = null
    modalProps.value = {}
  }

  return {
    visibleModal,
    showModal,
    hideModal,
    modalProps
  }
}
