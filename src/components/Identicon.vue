<template>
  <canvas
    ref="canvas"
    width="1"
    height="1"
    :class="['identicon-button', $attrs.class]"
    :style="computedStyle"
    data-testid='identicon'
    @click="copyToClipboard"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  />
  <div
    v-if="isTooltipVisible"
    class='tooltip-wrapper'
    data-testid='identicon-tooltip'
  >
    <div class='tooltip' :style="tooltipStyle">
      <span class='agentId'>{{ encodedKey }}</span> <br />- {{ isCopied ? 'Copied' : 'Click to copy' }} </div>
  </div>
</template>

<script setup>
import renderIconRaw from '../utils/identicon'
import { copyToClipboard as copyToClipboardRaw } from '../utils/clipboardUtils'
import { encodeAgentId } from '../utils/agent'
import { computed, watchEffect, ref } from 'vue'

const props = defineProps({
  isClickable: {
    type: Boolean,
    default: true
  },

  agentKey: {
    type: Uint8Array,
    required: true
  },

  size: { // in pixels
    type: String,
    required: true
  },

  styleProp: {
    type: Object,
    default: () => ({})
  },

  tooltipStyle: {
    type: Object,
    default: () => ({})
  },

  backgroundColor: {
    validator: prop => typeof prop === 'string' || prop === null,
    default: null,
  }
})

const canvas = ref()
const isTooltipVisible = ref(false)
const isCopied = ref(false)

const options = computed(() => ({
  hash: props.agentKey,
  size: props.size,
  backgroundColor: props.backgroundColor,
}))


const encodedKey = computed(() => encodeAgentId(props.agentKey))

function copyToClipboard () {
  if (!props.isClickable) return

  copyToClipboardRaw(encodedKey.value)
  isCopied.value = true
}

function showTooltip () {
  if (!props.isClickable) return

  isTooltipVisible.value = true
  isCopied.value = false
}

function hideTooltip () {
  if (!props.isClickable) return

  isTooltipVisible.value = false
  isCopied.value = false
}

function renderIcon () {
  if (!canvas.value) return
  renderIconRaw(options.value, canvas.value)
}

// render on mount and when options change
watchEffect(() => {
  renderIcon()
})

const computedStyle = computed(() => ({
  'border-radius': '50%',
  'width': `${props.size}px`,
  'height': `${props.size}px`,
  ...props.styleProp
}))

</script>

<style scoped>
.identicon-button {
  cursor: pointer;
}

.tooltip-wrapper {
  position: relative;
}

.tooltip {
  position: absolute;
  background: #edf1ff;
  border: 1px solid #eceef1;
  box-shadow: 0 4px 10px #e5e5e5;
  border-radius: 2px;
  padding: 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 15px;
  color: #606c8b;
}

.agentId {
  white-space: nowrap;
}
</style>
