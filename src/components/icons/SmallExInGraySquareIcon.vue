
<template>
  <Icon class='icon' viewBox="0 0 16 16">
    <g clip-path="url(#a)">
    <path fill="#F2F2F2" d="M0 0h16v16H0z"/>
    <path fill="#606C8B" d="m8 7.06 3.3-3.3.94.94L8.94 8l3.3 3.3-.94.94L8 8.94l-3.3 3.3-.94-.94L7.06 8l-3.3-3.3.94-.94L8 7.06Z"/></g>
    <defs>
        <clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath>
    </defs>
  </Icon>
</template>

<script>

import Icon from './Icon.vue'

export default {
  name: 'SmallQuestionIconIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 14px;
  height: 14px;
}
</style>
