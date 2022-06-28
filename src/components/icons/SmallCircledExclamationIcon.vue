
<template>
  <Icon :fill="color" class='icon' viewBox="0 0 22 22" >
    <path d="M11 22c6.066 0 11-4.934 11-11 0-6.065-4.934-11-11-11C4.936 0 0 4.934 0 11c.001 6.066 4.935 11 11 11Zm0-19.814c4.862 0 8.814 3.954 8.814 8.815 0 4.859-3.952 8.813-8.813 8.813-4.86 0-8.815-3.954-8.815-8.813.001-4.86 3.955-8.815 8.815-8.815Z" />
    <path d="M11 13.347c.604 0 1.094-.489 1.094-1.094v-5.83a1.094 1.094 0 0 0-2.187 0v5.83c0 .605.491 1.094 1.094 1.094ZM11 16.67c.604 0 1.094-.489 1.094-1.093v-.182a1.094 1.094 0 0 0-2.187 0v.182c0 .604.491 1.093 1.094 1.093Z" />
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'SmallCircledExclamationIcon',
  components: {
    Icon
  },
  props: {
    color: {
      type: String,
      default: "#FF5F5F"
    }
  }
}
</script>

<style scoped>
.icon {
  width: 22px;
  height: 22px;
}
</style>
