<template>
 <canvas ref="canvas" width="1" height="1" :class="['identicon-button', $attrs.class]"
    :style="style"
    data-testid='identicon'
    @click="copyToClipboard"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip" />
  <div v-if="tooltipVisible" class='tooltip-wrapper' data-testid='identicon-tooltip'>
    <div class='tooltip' :style="tooltipStyle"><span class='agentId'>{{ encodedKey }}</span> <br />- {{ copied ? 'Copied' : 'Click to copy' }} </div>
  </div>
</template>

<script setup>
import renderIconRaw from '../utils/identicon'
import { copyToClipboard as copyToClipboardRaw } from '../utils/clipboardUtils'
import { encodeAgentId } from '../utils/agent'
import { computed, watchEffect, ref } from 'vue'

const props = defineProps({
  clickable: {
    type: Boolean,
    default: true
  },

  agentKey: {
    type: Uint8Array,
    required: true
  },

  size: {
    type: String,
    required: true
  },

  styleProp: Object,

  tooltipLeft: Boolean
})

const canvas = ref()
const tooltipVisible = ref()
const copied = ref()

const options = computed(() => ({
  hash: props.agentKey,
  size: props.size,
}))


const encodedKey = computed(() => encodeAgentId(props.agentKey))

function copyToClipboard () {
  if (!props.clickable) return

  copyToClipboardRaw(encodedKey.value)
  copied.value = true
}

function showTooltip () {
  if (!props.clickable) return

  tooltipVisible.value = true
  copied.value = false
}

function hideTooltip () {
  if (!props.clickable) return

  tooltipVisible.value = false
  copied.value = false
}

function renderIcon () {
  if (!canvas.value) return
  renderIconRaw(options.value, canvas.value)
}

watchEffect(() => {
  renderIcon()
})

const style = computed(() => ({
  'border-radius': '50%',
  'width': `${props.size}px`,
  'height': `${props.size}px`,
  ...props.styleProp
}))

const tooltipStyle = computed(() => {
  if (props.tooltipLeft) {
    return {
      'right': '50px'
    }
  } else {
    return {}
  }
})

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

  background: #EDF1FF;
  border: 1px solid #ECEEF1;
  box-shadow: 0px 4px 10px #E5E5E5;
  border-radius: 2px;

  padding: 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 15px;
  color: #606C8B;
}
.agentId {
  white-space: nowrap
}
</style>