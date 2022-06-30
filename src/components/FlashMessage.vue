<template>
  <div v-if="flashMessage" class='flash-message'>
    <span>{{ flashMessage }}</span>
    <ExIcon @click="clearMessage" size="14" class='ex-icon'/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ExIcon from './icons/ExIcon'

export default {
  name: 'FlashMessage',
  components: {
    ExIcon
  },
  computed: {
    ...mapState('ui', ['flashMessage']),
  },
  methods: {
    ...mapMutations('ui', ['setFlashMessage']),
    clearMessage () {
      this.setFlashMessage(null)
    }
  }
}
</script>

<style scoped>
.flash-message {
  display: flex;
  align-items: center;
  background-color: pink;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}
.flash-message > span {
  flex-basis: 95%;
}
.ex-icon {
  margin-left: auto;
  cursor: pointer;
}
</style>
