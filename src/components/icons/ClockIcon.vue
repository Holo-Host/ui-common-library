<template>
    <Icon
      stroke="#313C59"
      fill="transparent"
      class="icon"
    >
      <path
        d="M10 17.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><path
        d="M10 5.8V10l2.5 2.5"
        stroke="#313C59"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  </template>
  
  <style scoped>
  .icon {
    width: 20px;
    height: 20px;
  }
  </style>
    
<script>

import Icon from './Icon.vue'

export default {
name: 'ClockIcon',
components: {
    Icon
},
props: {
    disabled: {type: Boolean, default: false },
    color: {
    type: String,
    default: "#606C8B"
    }
},
computed: {
    fillOpacity () {
    return this.disabled ? '0.18' : '1'
    }
} 
}
</script>


