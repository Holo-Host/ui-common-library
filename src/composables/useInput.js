import { computed, nextTick, onMounted, ref } from 'vue'
import { EInputType } from '../types/ui'
import { getUniqueId } from '../utils/domUtils'

export function useInput({ props, emit }) {
  const inputRef = ref()
  const isPasswordVisible = ref(false)

  onMounted(async() => {
    await nextTick(() => {
      if (props.autofocus) {
        inputRef.value?.focus()
      }
    })
  })

  const inputName = ref('')
  const inputId = ref('')
  const inputKey = ref(0)

  const computedInputType = computed(() => {
    if (props.inputType !== EInputType.password) {
      return props.inputType
    } else {
      return isPasswordVisible.value ? EInputType.text : EInputType.password
    }
  })

  if (props.id || props.name) {
    if (props.id) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      inputId.value = props.id

      if (!props.name) {
        inputName.value = inputId.value
      }
    }

    if (props.name) {
      if (!inputName.value) {
        // eslint-disable-next-line vue/no-setup-props-destructure
        inputName.value = props.name
      }
    }
  } else {
    // If no name is passed, calculate a name (and corresponding id)
    inputName.value = getUniqueId()
    inputId.value = inputName.value
  }

  async function onInput(event) {
    let value = event.target?.value

    if (props.inputType === EInputType.number && props.decimalPlaces >= 0 && !!event.target.value) {
      const [wholeValue = '0', decimalValue = ''] = event.target.value.split('.')

      if (decimalValue) {
        // Restrict the number of decimal places
        value =
          props.decimalPlaces === 0
            ? wholeValue // No decimal places
            : `${wholeValue}.${decimalValue.substring(0, props.decimalPlaces)}`

        // Re-render the input to sync with the new value
        inputKey.value = inputKey.value + 1

        await nextTick(() => {
          // Focus the input so user can continue typing
          inputRef.value?.focus()
        })
      }
    }

    emit('update:modelValue', value)
  }

  function showPassword() {
    isPasswordVisible.value = true
  }

  function hidePassword() {
    isPasswordVisible.value = false
  }

  onMounted(() => {})

  return {
    props,
    inputRef,
    inputKey,
    isPasswordVisible,
    emit,
    inputName,
    inputId,
    computedInputType,
    onInput,
    showPassword,
    hidePassword
  }
}
