<template>
  <Icon class='icon' viewBox="4 7 16 10">
    <path class="icon-path" d="M5 12h14M15 16l4-4M15 8l4 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </Icon>
</template>

<script setup>
import Icon from './Icon.vue'

</script>

<style scoped>
.icon {
  width: 16px;
}

.icon-path {
	stroke: var(--primary-color);
}
</style>
