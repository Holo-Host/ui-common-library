<template>
  <Icon class="icon">
    <path
      d="M5 12h14M15 16l4-4M15 8l4 4" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Icon>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'ArrowIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 26px;
  height: 26px;
  stroke: var(--primary-color);
}
</style>
