<template>
  <Icon :fill="color" class='icon'>
    <path :fill-opacity="fillOpacity" d="M1.31533 0.939941H17.7538C18.2373 0.939941 18.7207 1.42342 18.7207 1.97598V11.0931C18.7207 11.5766 18.2373 12.0601 17.7538 12.0601H1.31533C0.76278 12.0601 0.279297 11.5766 0.279297 11.0931V1.97598C0.279297 1.42342 0.76278 0.939941 1.31533 0.939941ZM4.14716 10.0571H7.46248V10.5405H4.14716V10.0571ZM2.14416 10.0571H3.66368V10.5405H2.14416V10.0571ZM1.03906 3.28829H17.961V1.97598C17.961 1.83784 17.8919 1.6997 17.7538 1.6997H1.31533C1.17719 1.6997 1.03906 1.83784 1.03906 1.97598V3.28829ZM17.961 5.63664H1.03906V11.0931C1.03906 11.2312 1.17719 11.3003 1.31533 11.3003H17.7538C17.8919 11.3003 17.961 11.2312 17.961 11.0931V5.63664Z" />
  </Icon>
</template>

<script>

import Icon from './Icon.vue'

export default {
  name: 'CreditCardIcon',
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