<template>
  <Icon :fill="color" class='icon'>
    <path :fill-opacity="fillOpacity" d="M17.3432 1H2.65684C1.74179 1 1 1.74179 1 2.65684V7.34316C1 8.25821 1.74179 9 2.65684 9H17.3432C18.2582 9 19 8.25821 19 7.34316V2.65684C19 1.74179 18.2582 1 17.3432 1Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path :fill-opacity="fillOpacity" d="M17.3432 9H2.65684C1.74179 9 1 9.74179 1 10.6568V15.3432C1 16.2582 1.74179 17 2.65684 17H17.3432C18.2582 17 19 16.2582 19 15.3432V10.6568C19 9.74179 18.2582 9 17.3432 9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </Icon>
</template>
  
<script>

import Icon from './Icon.vue'

export default {
  name: 'HappsIcon',
  components: {
    Icon
  },
  props: {
    disabled: {type: Boolean, default: false },
    color: {
      type: String,
      default: "#21BE98"
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
  width: 26px;
  height: 26px;
}
</style>  