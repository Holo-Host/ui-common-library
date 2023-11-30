
<template>
  <Icon class='icon' viewBox="0 0 66 66">
    <path d="M33 66a33 33 0 100-66 33 33 0 000 66zm0-60.5a27.5 27.5 0 110 55 27.5 27.5 0 010-55z" :fill="color"/>
    <path d="M28.3 43.2a2.75 2.75 0 001.95.8h.12a2.75 2.75 0 001.99-.99l13.75-16.5a2.75 2.75 0 00-4.22-3.52L30.06 37.17l-6.11-6.12a2.75 2.75 0 10-3.9 3.9l8.25 8.25z" :fill="color"/>
  </Icon>
</template>

<script>

import Icon from './Icon.vue'

export default {
  name: 'CircledCheckIcon',
  components: {
    Icon
  },
  props: {
    color: {
      type: String,
      default: "#735CFE"
    }
  }
}
</script>

<style scoped>
.icon {
  width: 63px;
  height: 63px;
}
</style>
