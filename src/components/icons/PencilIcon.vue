
<template>
  <Icon class='icon' :style="style" viewBox="3.3 1.7 13.37 16.64">
    <path d="M15.834 16.667H4.167a.833.833 0 100 1.666h11.666a.833.833 0 000-1.666zM4.167 15h.075l3.475-.317c.38-.038.737-.205 1.008-.475l7.5-7.5a1.6 1.6 0 00-.058-2.258l-2.283-2.283a1.667 1.667 0 00-2.217-.059l-7.5 7.5c-.27.272-.437.628-.475 1.009l-.358 3.475a.833.833 0 00.833.908zm8.558-11.667L15 5.608l-1.666 1.625L11.1 5l1.625-1.667zM5.31 10.758L10 6.1l2.25 2.25-4.666 4.667-2.5.233.225-2.492z" :fill="color" />
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'PencilIcon',
  components: {
    Icon
  },
  props: {
    size: {
      default: '10',
    },
    color: {
      default: '#606C8B'
    }
  },
  computed: {
    style () {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      }
    }
  }
}
</script>

<style scoped>
</style>
