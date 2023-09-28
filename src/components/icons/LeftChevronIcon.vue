<template>
  <Icon :fill="color" class='icon' viewbox="0 0 8 8">
    <path :fill-opacity="fillOpacity" d="M4.94.94L1.89 4l3.05 3.06L4 8 0 4l4-4 .94.94z" />
  </Icon>
</template>

<script>

import Icon from './Icon.vue'

export default {
  name: 'LeftChevronIcon',
  components: {
    Icon
  },
  props: {
    disabled: {type: Boolean, default: false },
    color: {
      type: String,
      default: "#606C8B"
    }
  },
  computed: {
    fillOpacity () {
      return this.disabled ? '0.18' : '1'
    }
  } 
}
</script>

<style scoped>
.icon {
  width: 8px;
  height: 8px;
}
</style>
