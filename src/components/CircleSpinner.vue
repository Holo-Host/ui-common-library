<template>
  <div
    v-if="scale !== ESpinnerSize.none"
    class="loader"
		:style="computedScale"
    data-test-circle-spinner-wrapper
  >
    <div
      class="dot-spin"
      :class="[theme === EOverlayTheme.light ? 'color-primary' : 'color-white']"
      data-test-circle-spinner-dots
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ESpinnerSize } from '../types/ui'
import { EOverlayTheme } from '../utils/notifications'

const props = defineProps({
	scale: {
		type: Number,
		default: ESpinnerSize.small
	},

  theme: {
    type: Number,
    default: EOverlayTheme.light
  }
})

const computedScale = computed(() => ({
	transform: `scale(${props.scale})`
}))
</script>

<style lang="scss" scoped>
.loader {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .dot-spin {
    position: relative;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: transparent;
    box-shadow: 0 -18px 0 0, 12.72984px -12.72984px 0 0, 18px 0 0 0,
      12.72984px 12.72984px 0 0 rgba(152, 128, 255, 0), 0 18px 0 0 rgba(152, 128, 255, 0),
      -12.72984px 12.72984px 0 0 rgba(152, 128, 255, 0), -18px 0 0 0 rgba(152, 128, 255, 0),
      -12.72984px -12.72984px 0 0 rgba(152, 128, 255, 0);
    animation: dotSpin 1.5s infinite linear;
  }

  @keyframes dotSpin {
    0%,
    100% {
      box-shadow: 0 -18px 0 0, 12.72984px -12.72984px 0 0, 18px 0 0 0,
        12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0),
        -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
        -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    12.5% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 0, 18px 0 0 0,
        12.72984px 12.72984px 0 0, 0 18px 0 -5px rgba(152, 128, 255, 0),
        -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
        -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    25% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
        12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0, 12.72984px 12.72984px 0 0,
        0 18px 0 0, -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
        -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    37.5% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
        12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0),
        12.72984px 12.72984px 0 0, 0 18px 0 0, -12.72984px 12.72984px 0 0,
        -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    50% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
        12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0),
        12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0, -12.72984px 12.72984px 0 0,
        -18px 0 0 0, -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    62.5% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
        12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0),
        12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0),
        -12.72984px 12.72984px 0 0, -18px 0 0 0, -12.72984px -12.72984px 0 0;
    }
    75% {
      box-shadow: 0 -18px 0 0, 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0),
        18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
        0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
        -18px 0 0 0, -12.72984px -12.72984px 0 0;
    }
    87.5% {
      box-shadow: 0 -18px 0 0, 12.72984px -12.72984px 0 0, 18px 0 0 -5px rgba(152, 128, 255, 0),
        12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0),
        -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
        -12.72984px -12.72984px 0 0;
    }
  }
}

.color-white {
  color: white;
}

.color-primary {
  color: var(--primary-color);
}
</style>

