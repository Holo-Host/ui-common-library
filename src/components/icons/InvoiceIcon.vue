<template>
  <Icon class='icon'>
    <rect x="0.5" y="0.5" width="14" height="18" rx="1.5" fill="rgba(199, 211, 255, 1)" stroke="black" />
    <line x1="2.5" y1="3.5" x2="10.5" y2="3.5" stroke="black" stroke-linecap="round"/>
    <line x1="2.5" y1="6.5" x2="9.5" y2="6.5" stroke="black" stroke-linecap="round"/>
    <line x1="2.5" y1="15.5" x2="9.5" y2="15.5" stroke="black" stroke-linecap="round"/>
    <line x1="2.5" y1="9.5" x2="10.5" y2="9.5" stroke="black" stroke-linecap="round"/>
    <line x1="2.5" y1="12.5" x2="5.5" y2="12.5" stroke="black" stroke-linecap="round"/>

  </Icon>
</template>
  
  
<script>

import Icon from './Icon.vue'

export default {
  name: 'InvoiceIcon',
  components: {
    Icon
  },
  props: {
    color: {
      type: String,
      default: "#313C59"
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