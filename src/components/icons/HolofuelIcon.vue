<template>
  <Icon :fill="color" class='icon'>
    <path d="M12.5323 0C9.03138 9.21986 -6.88601 10.1205 3.42728 22.4312C-0.174536 13.8011 18.5794 12.0867 12.5323 0Z" />
    <path d="M14.2099 10.9653C12.685 15.17 6.36074 17.023 5.52324 20.5945C4.95397 23.7362 6.39437 26.6014 10.5728 27.9999C1.25619 21.4919 19.1471 19.2763 14.2099 10.9653Z" />
  </Icon>
</template>

<script>

import Icon from './Icon.vue'

export default {
  name: 'HolofuelIcon',
  components: {
    Icon
  },
  props: {
    color: {
      type: String,
      default: "#21BE98"
    }
  }
}
</script>

<style scoped>
.icon {
  width: 16px;
  height: 28px;
}
</style>
