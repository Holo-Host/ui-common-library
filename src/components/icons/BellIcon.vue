
<template>
  <Icon class='icon' viewBox="0 0 40 40">
    <rect v-if="shouldShowHalo" width="32" height="32" :fill="haloColor" rx="16"/>
    <path :stroke="bellColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.67" fill="none" d="M17.44 23.5a1.67 1.67 0 0 1-2.88 0M21 12.67a5 5 0 0 0-10 0c0 5.83-2.5 7.5-2.5 7.5h15S21 18.5 21 12.67Z"/>
    <circle v-if="shouldShowDot" cx="23" cy="12" r="5" fill="#B42318" stroke="#FBFCFE"/>
  </Icon>
</template>

<script>

import Icon from './Icon.vue'

export default {
  name: 'SmallQuestionIconIcon',
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      default: 'plain',
      validator(value) {
        return ['plain', 'unread', 'halo', 'halo-overdue'].includes(value)
      }
    },
  },
  computed: {
    bellColor () {
      return this.type === 'halo-overdue' 
        ? '#D92D20'
        : this.type === 'plain'
          ? '#667085'
          : '#735CFE'
    },
    haloColor () {
      return this.type === 'halo-overdue' 
        ? '#FEE4E2'
        : '#F7F5FF' // in practice this is only visible if type === 'halo'
    },
    shouldShowDot () {
      return this.type === 'unread'
    },
    shouldShowHalo () {
      return this.type.includes('halo')
    },    
  }
}
</script>

<style scoped>
.icon {
  width: 40px;
  height: 40px;
}
</style>
