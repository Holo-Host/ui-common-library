<template>
  <div
    class="base-input"
    :class="{ 'base-input--disabled' : isDisabled, 'base-input--is-horizontal': isHorizontal }"
    data-test-base-input-wrapper
  >
    <slot
      v-if="label"
      name="label"
      :input-id="inputId"
    >
      <label
        :for="inputId"
        class="base-input__label"
        :class="{ 'base-input__label--is-horizontal': isHorizontal }"
        data-test-base-input-label
      >
        {{ label }}
      </label>
    </slot>

    <div class="base-input__content">
      <input
        :id="inputId"
        ref="inputRef"
        v-bind="$attrs"
        :name="inputName"
        :value="modelValue"
        :disabled="isDisabled"
        :type="computedInputType"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        class="base-input__input"
        :class="{ 'disabled' : isDisabled, 'invalid' : !isValid }"
        data-test-base-input-input
        @input="onInput($event)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @keydown="$emit('keydown', $event)"
      />

      <div v-if="inputType === EInputType.password" class="eye-icon">
        <VisibleEyeIcon v-if="isPasswordVisible" @click="hidePassword" />
        <InvisibleEyeIcon v-else @click="showPassword" />
      </div>
    </div>

    <p
      v-if="hasErrors"
      class="base-input__error"
      data-test-base-input-errors
    >
      <!-- If there is no message, put a non-breaking space to prevent collapse -->
      {{ message || '&nbsp;' }}
    </p>
  </div>
</template>

<script setup>
import InvisibleEyeIcon from './icons/InvisibleEyeIcon.vue'
import VisibleEyeIcon from './icons/VisibleEyeIcon.vue'
import { useInput } from '../composables/useInput'
import { EInputType } from '../types/ui'

const props = defineProps({
  autocomplete: {
    type: String,
    default: ''
  },

  autofocus: {
    type: Boolean,
    default: false
  },

  isDisabled: {
    type: Boolean,
    default: false
  },

  isValid: {
    type: Boolean,
    default: true
  },

  isHorizontal: {
    type: Boolean,
    default: false
  },

  inputType: {
    type: String,
    default: EInputType.text,
    validator(value) {
      return [
        EInputType.text,
        EInputType.password,
        EInputType.url,
        EInputType.tel,
        EInputType.email,
        EInputType.number
      ].includes(value)
    }
  },

  id: {
    type: String,
    default: ''
  },

  name: {
    type: String,
    default: ''
  },

  placeholder: {
    type: String,
    default: ''
  },

  modelValue: {
    type: String,
    default: ''
  },

  label: {
    type: String,
    default: ''
  },

  hasErrors: {
    type: Boolean,
    default: false
  },

  message: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'keydown'])

const {
  inputRef,
  isPasswordVisible,
  inputName,
  inputId,
  computedInputType,
  onInput,
  showPassword,
  hidePassword
} = useInput({ props, emit })
</script>

<style scoped lang="scss">
.base-input {
  position: relative;

  &--is-horizontal {
    display: flex;
    align-items: center;
  }

  &--disabled {
    opacity: 0.6;
    pointer-events: hover;
    cursor: not-allowed;
  }

  &__label {
    display: block;
    font-size: 14px;
    font-weight: 700;
    line-height: 19px;
    margin-bottom: 8px;
    color: var(--dark-grey-color);

    &--is-horizontal {
      margin-right: 10px;
      margin-bottom: 0;
      color: var(--grey-color);
    }
  }

  &__content {
    position: relative;
    width: 100%;
  }

  &__input {
    display: block;
    width: 100%;
    margin-top: 0;
    color: var(--dark-grey-color);
    border: 1px solid var(--grey-color);
    border-radius: 5px;
    padding: 9px 14px;
    font-size: 14px;
    font-weight: 400;

    &:focus {
      outline: none;
      border: 1px solid var(--primary-color);
    }

    &::placeholder {
      font-weight: 400;
      color: #acafbc;
    }

    &.disabled {
      opacity: 0.4;
      background-color: transparent;
      pointer-events: hover;
      cursor: not-allowed;
    }

    &.invalid {
      border-color: var(--red-color);
    }
  }

  &__error {
    margin: 5px 0 4px 1px;
    font-size: 12px;
    color: var(--red-color);
    font-weight: 600;
  }

  .eye-icon {
    position: absolute;
    right: -20px;
    top: 5px;
    cursor: pointer;
  }
}
</style>
