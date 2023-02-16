<template>
  <div class="base-filter">
    <div
      v-if="hasLabel"
      class="base-filter__label"
      :class="{ 'base-filter--disabled': isDisabled }"
    >
      {{ $t(labelTranslationKey) }}:&nbsp;
    </div>
    <div
      class="base-filter__filter"
      :class="{ 'base-filter--disabled': isDisabled }"
    >
      <input
        :value="value"
        :style="inputStyles"
        class="base-filter__filter-input"
        :placeholder="placeholder"
        @input="onInput"
      />

      <ExIcon
        v-if="value"
        :size="12"
        :style="iconStyles"
        class="base-filter__ex-icon"
        @click="clear"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ExIcon from './icons/ExIcon.vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  },

  placeholder: {
    type: String,
    default: ''
  },

  inputStyles: {
    type: Object,
    default: {}
  },

  iconStyles: {
    type: Object,
    default: {}
  },

  isDisabled: {
    type: Boolean,
    default: false
  },

  hasLabel: {
    type: Boolean,
    default: true
  },

  labelTranslationKey: {
    type: String,
    default: '$.search'
  },

  debounce: {
    type: Number,
    default: 500
  },

  minLength: {
    type: Number,
    default: 3
  }
})

const emit = defineEmits(['update'])

const debounceTimeout = ref(null)

const onInput = (event) => {
  if (event.target.value.length >= props.minLength) {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value)
    }

    debounceTimeout.value = setTimeout(() => {
      emit('update', { value: event.target.value, isActive: true })
      clearTimeout(debounceTimeout.value)
    }, props.debounce)
  } else {
    // Return isActive = false when the value length is less than the minimum length
    emit('update', { value: event.target.value, isActive: false })
  }
}

const clear = () => {
  emit('update', { value: '', isActive: true })
}
</script>

<style lang="scss" scoped>
.base-filter {
  position: relative;
  display: flex;
  align-items: center;

  &__label {
    color: var(--grey-color);
    font-size: 12px;
    margin-left: 30px;
    margin-right: 2px;
  }

  &__filter {
    display: flex;
    position: relative;
    font-size: 12px;
  }

  &__filter-input {
    border: 1px solid rgb(0 129 141);
    border-radius: 8px;
    padding: 3px 5px;

    &:focus {
      outline-color: var(--primary-color);
    }

    &::placeholder {
      color: var(--grey-light-color);
    }
  }

  &__ex-icon {
    position: absolute;
    top: 5px;
    right: 6px;
    cursor: pointer;
    color: var(--grey-light-color);
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
