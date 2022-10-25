<template>
  <Icon class='icon' :fill="color">
    <path d="M19.3432 4H4.65684C3.74179 4 3 4.74179 3 5.65684V10.3432C3 11.2582 3.74179 12 4.65684 12H19.3432C20.2582 12 21 11.2582 21 10.3432V5.65684C21 4.74179 20.2582 4 19.3432 4Z" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.3432 12H4.65684C3.74179 12 3 12.7418 3 13.6568V18.3432C3 19.2582 3.74179 20 4.65684 20H19.3432C20.2582 20 21 19.2582 21 18.3432V13.6568C21 12.7418 20.2582 12 19.3432 12Z" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 8V8.01" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 16V16.01" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

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