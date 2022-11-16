<template>
  <div
    class="happ-image"
    :style="wrapperStyle"
  >
    <img
      v-if="happ.logoUrl || happ.logo_url"
      :src="happ.logoUrl || happ.logo_url"
      ref="image"
      alt="app-logo"
      :style="style"
      class="happ-image__image"
    >
    <div
      v-else
      class="happ-image--empty"
      :style="style"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const image = ref()
const style = ref()

const props = defineProps({
  happ: {
    type: Object,
    required: true
  },

  size: {
    type: String,
    default: '140px'
  }
})

function resizeImage() {
  const imageWidth = image.value.clientWidth
  const imageHeight = image.value.clientHeight

  // Resize based on higher value (width/height),
  // this way we always keep the original image ratio.
  style.value = imageWidth > imageHeight
    ? { width: props.size }
    : { height: props.size }
}

const wrapperStyle = computed(() => ({
  width: props.size,
  height: props.size,
  'font-size': props.size,
  'line-height': props.size
}))

onMounted(() => {
  if (image.value) {
    image.value.addEventListener('load', resizeImage)
  }
})
</script>

<style lang="scss" scoped>
.happ-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border: 1px solid var(--grey-color);
  border-radius: 12px;
  font-weight: bold;
  color: rgb(96 108 139 / 46%);
  margin-right: 10px;
  overflow: hidden;

  &--empty {
    &::before,
    &::after {
      position: absolute;
      left: -25px;
      content: "";
      width: calc(100% + 50px);
      height: 1px; /* cross thickness */
      background-color: #909c9b;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}
</style>
