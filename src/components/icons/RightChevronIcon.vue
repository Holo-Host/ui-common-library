<template>
  <Icon :fill="color" class='icon' viewbox="0 0 8 8">
    <path :fill-opacity="fillOpacity" d="M0 7.06L3.05 4 0 .94.94 0l4 4-4 4L0 7.06z" />
  </Icon>
</template>

<script>

import Icon from './Icon.vue'

export default {
  name: 'RightChevronIcon',
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
