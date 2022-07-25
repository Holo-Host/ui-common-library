<template>
  <button
    :disabled="isDisabled"
    class="base-button"
    :class="[{ 'disabled' : isDisabled }, kButtonTypeClass[type] ]"
		:style="computedCustomStyle"
		data-test-base-button-wrapper
    @click="onClick"
  >
    <!-- loading spinner -->
    <span
      v-if="spinnerSize !== ESpinnerSize.none"
      ref="spinner"
      class="base-button__spinner-wrapper"
      :class="[ isBusy ? 'visible' : 'hidden']"
      data-test-base-button-spinner-wrapper
    >
      <FlatSpinner
        :scale="0.5"
        :color="spinnerColor"
        data-test-base-button-spinner
      />
    </span>

    <!-- button content -->
    <span
      ref="content"
      class="base-button__content"
      :class="[ spinnerSize !== ESpinnerSize.none && isBusy ? 'hidden' : 'visible']"
      data-test-base-button-content-wrapper
    >
      <slot>
        <span data-test-base-button-default-slot-content>
          {{ title }}
        </span>
      </slot>
    </span>
  </button>
</template>

<script setup>
import { computed, ref } from 'vue'
import FlatSpinner from './FlatSpinner.vue'
import { EButtonType, ESpinnerSize } from '../types/ui'

const props = defineProps({
  type: {
    type: Number,
    default: EButtonType.primary,
    validator(value) {
      return [EButtonType.primary, EButtonType.secondary, EButtonType.gray, EButtonType.custom].includes(value)
    }
  },

  isDisabled: {
    type: Boolean,
    default: false
  },

  isBusy: {
    type: Boolean,
    default: false
  },

  spinnerSize: {
    type: Number,
    default: ESpinnerSize.small,
    validator(value) {
      return [ESpinnerSize.none, ESpinnerSize.small].includes(value)
    }
  },

  title: {
    type: String,
    default: ''
  },

  customTheme: {
    type: Object,
    default: () => ({})
  }
})

const spinner = ref()
const content = ref()

const kButtonTypeClass = {
  [EButtonType.primary]: 'primary',
  [EButtonType.secondary]: 'secondary',
  [EButtonType.tertiary]: 'tertiary',
  [EButtonType.gray]: 'gray',
  [EButtonType.custom]: 'custom'
}

const kSpinnerColor = {
	[EButtonType.primary]: {
		enabled: 'white',
		disabled: 'white'
	},
	[EButtonType.secondary]: {
		enabled: 'secondary',
		disabled: 'secondary'
	},
	[EButtonType.tertiary]: {
		enabled: 'primary',
		disabled: 'primary'
	},
	[EButtonType.gray]: {
		enabled: 'white',
		disabled: 'secondary'
	},
}

const spinnerColor = computed(() => {
  if (props.type === EButtonType.custom) {
    return props.customTheme.spinnerColor
  }

	const spinnerColor = kSpinnerColor[props.type]

	return props.isDisabled ? spinnerColor.disabled : spinnerColor.enabled
})

const computedCustomStyle = computed(() => {
  if (props.type === EButtonType.custom) {
    return {
      color: props.customTheme.fontColor,
      backgroundColor: props.customTheme.backgroundColor,
      borderColor: props.customTheme.backgroundColor,
      border: `solid 1px ${props.customTheme.backgroundColor}`,
      boxShadow: `0 0 1px 0 ${props.customTheme.backgroundColor}`
    }
  }

  return {}
})

const emit = defineEmits(['click'])

function onClick() {
  if (!props.isDisabled && !props.isBusy) {
    emit('click')
  }
}
</script>

<style scoped lang="scss">
.base-button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 32px;
  border-radius: 100px;
  overflow: hidden;
  line-height: 1;
  cursor: pointer;
  transition: transform 200ms;
  font-weight: 700;

  &.disabled {
    pointer-events: hover;
    cursor: not-allowed;
  }

  &.primary {
    color: white;
    border: solid 1px var(--primary-color);
    background-color: var(--primary-color);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--grey-color);
    }

    &.disabled {
      opacity: 0.4;
    }
  }

	&.secondary {
    color: var(--grey-dark-color);
    border: solid 1px var(--primary-light-color);
    background-color: var(--primary-light-color);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--grey-color);
    }

    &.disabled {
      opacity: 0.4;
    }
  }

	&.tertiary {
    color: var(--primary-color);
    border: solid 1px var(--primary-color);
    background-color: white;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--grey-color);
    }

    &.disabled {
      opacity: 0.4;
    }
  }

  &.gray {
    color: white;
    border: solid 1px var(--grey-color);
    background-color: var(--grey-color);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px white;
    }

    &.disabled {
      background-color: white;
      color: var(--grey-color);
      border: solid 1px var(--grey-color);
    }
  }

  &.custom {
    &:focus {
      outline: none;
    }
  }

  &__spinner-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.125rem; /* 2px */
    right: 0.125rem; /* 2px */
    transition: transform 200ms;

    &.visible {
      transform: translateY(0.4rem);
    }

    &.hidden {
      transform: translateY(-2.25rem);
    }
  }

  &__content {
    transition: transform 200ms;

    &.visible {
      transform: translateY(0);
    }

    &.hidden {
      transform: translateY(2.25rem);
    }
  }
}
</style>
