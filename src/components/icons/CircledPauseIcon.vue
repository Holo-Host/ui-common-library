<template>
  <Icon class='icon' viewBox="0 0 50 50">
    <path d="M25 0a25 25 0 1 0 25 25A25.028 25.028 0 0 0 25 0Zm0 46.512A21.512 21.512 0 1 1 46.512 25 21.536 21.536 0 0 1 25 46.512Z" fill="#735CFE"/>
    <path d="M19.767 13.14h-.233c-.899 0-1.628.728-1.628 1.627v20c0 .9.73 1.628 1.628 1.628h.233c.899 0 1.628-.729 1.628-1.628v-20c0-.899-.73-1.627-1.628-1.627ZM31.046 13.14h-.232c-.9 0-1.628.728-1.628 1.627v20c0 .9.728 1.628 1.628 1.628h.232c.9 0 1.628-.729 1.628-1.628v-20c0-.899-.729-1.627-1.628-1.627Z" fill="#735CFE"/>
  </Icon>
</template>

<script>

import Icon from './Icon.vue'

export default {
  name: 'CircledExclamationIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 50px;
  height: 50px;
}
</style>