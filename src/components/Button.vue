<template>
  <button :style="style">
    <slot v-if="!isBusy"></slot>
    <div v-else class="snippet" data-title=".dot-pulse">
      <div class="stage">
        <div class="dot-pulse"></div>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: {
      type: String,
      default: 'none'
    },
    isBusy: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style () {
      var style = getComputedStyle(document.body)

      switch (this.color) {
        case 'primary':
          return {
            backgroundColor: '#735CFE',
            color: '#FFFFFF',
          }
        case 'secondary':
          return {
            backgroundColor: '#C7D3FF',
            color: '#313C59'
          }
        case 'disabled':
          return {
            backgroundColor: '#FFFFFF',
            color: '#735CFE',
            border: '1px solid #735CFE',
            opacity: 0.25
          }
        case 'grayed-out':
          return {
            backgroundColor: '#E5E5E5',
            color: '#FFFFFF'
          }
        case 'primary-disabled':
          return {
            backgroundColor: 'var(--btn-primary-disabled-bg-color)',
            color: 'var(--btn-primary-disabled-color)'
          }
        case 'primary-enabled':
          return {
            backgroundColor: 'var(--btn-primary-enabled-bg-color)',
            color: 'var(--btn-primary-enabled-color)'
          }          
        case 'none':
          return {}
        default:
          throw new Error (`Unknown color option ${this.color} for button`)
      }
    }
  }
}
</script>

<style scoped>
button {
  border-radius: 100px;
  border: none;
  height: 34px;
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  margin: 0 10px;
  cursor: pointer;
}

.stage {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 2rem 0;
    margin: 0 -5%;
    overflow: hidden;
  }

  .snippet {
    width: 2rem;
  }

/**
 * ==============================================
 * Dot Pulse - 'borrowed' CSS from here: https://codepen.io/nzbin/pen/GGrXbp under mit license 
 * ==============================================
 */
.dot-pulse {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--btn-busy-color);
  color: var(--btn-busy-color);
  box-shadow: 9999px 0 0 -5px var(--btn-busy-color);
  animation: dotPulse 1.5s infinite linear;
  animation-delay: .25s;
}

.dot-pulse::before, .dot-pulse::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--btn-busy-color);
  color: var(--btn-busy-color);
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px var(--btn-busy-color);
  animation: dotPulseBefore 1.5s infinite linear;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px var(--btn-busy-color);
  animation: dotPulseAfter 1.5s infinite linear;
  animation-delay: .5s;
}

@keyframes dotPulseBefore {
  0% {
    box-shadow: 9984px 0 0 -5px var(--btn-busy-color);
  }
  30% {
    box-shadow: 9984px 0 0 2px var(--btn-busy-color);
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px var(--btn-busy-color);
  }
}

@keyframes dotPulse {
  0% {
    box-shadow: 9999px 0 0 -5px var(--btn-busy-color);
  }
  30% {
    box-shadow: 9999px 0 0 2px var(--btn-busy-color);
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px var(--btn-busy-color);
  }
}

@keyframes dotPulseAfter {
  0% {
    box-shadow: 10014px 0 0 -5px var(--btn-busy-color);
  }
  30% {
    box-shadow: 10014px 0 0 2px var(--btn-busy-color);
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px var(--btn-busy-color);
  }
}
</style>