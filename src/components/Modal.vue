<template>
  <div class='overlay' @click="handleOverlayClick">
    <div :class="['modal', modalClass]">
      <button @click="handleClose" class="close-button"><ExIcon v-if="showEx" class="ex-icon" :size="16" data-testid='close-modal-button'/></button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ExIcon from './icons/ExIcon.vue'

export default {
  name: 'Modal',
  components: {
    ExIcon
  },
  props: {
    handleClose: {
      type: Function,
      required: true
    },
    showEx: {
      type: Boolean,
      default: true
    },
    shouldCloseOnAwayClick: {
      type: Boolean,
      default: true
    },
    modalClass: String
  },
  methods: {
    handleOverlayClick(e) {
      if (this.shouldCloseOnAwayClick && e.target.classList.contains('overlay')) {
        this.handleClose()
      }
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: rgb(49 60 89 / 67%);
  width: 100vw;
  height: 100vh;
}

.modal {
  position: relative;
  margin: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgb(32 39 57 / 50%);
  z-index: 20;
  padding: 26px;
  opacity: 1;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
}

@media screen and (max-width: 1050px) {
  .modal {
    pointer-events: all;
    margin: 210px 10px;
    flex-basis: 100%;
    height: fit-content;
  }
}
</style>
