<template>
  <div class='loader' :style="dims">
    <div class='loader-scale' :style="scale">
      <div class='dot'></div>
      <div class='dot'></div>
      <div class='dot'></div>
      <div class='dot'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    scale: {
      type: String,
      default: '1'
    }
  },
  computed: {
    dims () {
      return {
        width: `calc(61px * ${this.scale})`,
        height: `calc(13px * ${this.scale})`
      }
    },
    scale () {
      return {
        transform: `scale(${this.scale})`
      }
    }
  }
}
</script>

<style scoped>
.loader {
  display: inline-block;
  position: relative;
}
.loader-scale {
  position: absolute;
  transform-origin: top left;
}
.loader .dot {
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #313C59;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader .dot:nth-child(1) {
  animation: grow 0.6s infinite;
}
.loader .dot:nth-child(2) {
  animation: shift 0.6s infinite;
}
.loader .dot:nth-child(3) {
  left: 24px;
  animation: shift 0.6s infinite;
}
.loader .dot:nth-child(4) {
  left: 48px;
  animation: shrink 0.6s infinite;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes shrink {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes shift {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
