<template>
  <Icon :fill="color" class='icon'>
    <path :fill-opacity="fillOpacity" d="M9.5 0C4.2617 0 0 4.2617 0 9.5C0 14.7383 4.2617 19 9.5 19C14.7383 19 19 14.7383 19 9.5C19 4.2617 14.7383 0 9.5 0ZM9.5 16.3611C8.62684 16.3611 7.91667 15.6509 7.91667 14.7778C7.91667 13.9046 8.62684 13.1944 9.5 13.1944C10.3732 13.1944 11.0833 13.9046 11.0833 14.7778C11.0833 15.6509 10.3732 16.3611 9.5 16.3611ZM12.1389 5.43358C12.1389 5.74222 12.0855 6.04559 11.9799 6.33544L9.99611 11.7914C9.92011 12.0002 9.72188 12.1389 9.5 12.1389C9.27812 12.1389 9.07989 12.0002 9.00389 11.7914L7.01987 6.33544C6.91452 6.0458 6.86111 5.74222 6.86111 5.43379V5.27778C6.86111 3.82259 8.04481 2.63889 9.5 2.63889C10.9552 2.63889 12.1389 3.82259 12.1389 5.27778V5.43358Z" />
  </Icon>
</template>
  
<script>

import Icon from './Icon.vue'

export default {
  name: 'BangIcon',
  components: {
    Icon
  },
  props: {
    disabled: {type: Boolean, default: false },
    color: {
      type: String,
      default: "#313C59"
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