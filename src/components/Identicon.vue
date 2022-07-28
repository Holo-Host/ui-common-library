<template>
 <canvas ref='canvas' width="1" height="1" :class="['identicon-button', $attrs.class]"
    :style="style"
    data-testid='identicon'
    @click="copyToClipboard"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip" />
  <div v-if="tooltipVisible" class='tooltip-wrapper' data-testid='identicon-tooltip'>
    <div class='tooltip' :style="tooltipStyle"><span class='agentId'>{{ encodedKey }}</span> <br />- {{ copied ? 'Copied' : 'Click to copy' }} </div>
  </div>
</template>

<script>
import renderIcon from '../utils/identicon'
import { copyToClipboard } from '../utils/clipboardUtils'
import { encodeAgentId } from '../utils/agent'

export default {
  name: 'Identicon',
  props: {
    agentKey: {
      type: Uint8Array,
      required: true
    },
    size: String,
    styleProp: Object,
    tooltipLeft: Boolean
  },
  data () {
    return {
      tooltipVisible: false,
      copied: false
    }
  },
  methods: {
    copyToClipboard () {
      copyToClipboard(this.encodedKey)
      this.copied = true
    },
    renderIcon () {
      renderIcon(this.opts, this.$refs.canvas)
    },
    showTooltip () {
      this.tooltipVisible = true
      this.copied = false
    },
    hideTooltip () {
      this.tooltipVisible = false
      this.copied = false
    },
  },
  computed: {
    opts () {
      return {
        hash: this.agentKey,
        size: this.size
      }
    },
    style () {
      return {
        'border-radius': '50%',
        'width': `${this.size}px`,
        'height': `${this.size}px`,
        ...this.styleProp
      }
    },
    tooltipStyle () {
      if (this.tooltipLeft) {
        return {
          'right': '50px'
        }
      } else {
        return {}
      }
    },
    encodedKey () {
      return encodeAgentId(this.agentKey)
    }
  },
  mounted () {
    this.renderIcon()
  },
  watch: {
    agentKey () {
      this.renderIcon()
    },
    size () {
      this.renderIcon()
    }
  }
}
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