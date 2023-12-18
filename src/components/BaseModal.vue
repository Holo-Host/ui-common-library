<template>
  <Transition>
    <div
      v-if="isVisible"
      class="base-modal__overlay"
      @click="isDismissible && isClickableOutside ? emit('close') : () => {}"
    >
      <div class="base-modal" @click.stop>
        <button
          v-if="isDismissible && hasCloseButton"
          class="base-modal__close-button"
          @click="emit('close')"
        >
          <ExIcon class="ex-icon" :size="16" />
        </button>

        <div
          class="base-modal__content"
          :class="{
            'base-modal__content--small-padding': contentPadding === 'sm',
          }"
        >
          <span v-if="title" class="base-modal__title">
            {{ title }}
          </span>

          <h4 v-if="subTitle" class="base-modal__sub-title">
            {{ subTitle }}
          </h4>

          <div class="base-modal__message-content">
            <slot></slot>
          </div>
        </div>

        <div class="base-modal__buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import ExIcon from './icons/ExIcon.vue'

defineProps({
  hasCloseButton: {
    type: Boolean,
    default: true
  },

  isClickableOutside: {
    type: Boolean,
    default: true
  },

  isDismissible: {
    type: Boolean,
    default: true
  },

  isVisible: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    default: ''
  },

  subTitle: {
    type: String,
    default: ''
  },

  contentPadding: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md'].includes(value)
    }
  }
})

const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.base-modal {
  position: relative;
  margin: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgb(32 39 57 / 50%);
  z-index: 20;
  padding: 26px;
  opacity: 1;
  max-width: 640px;

  &__overlay {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 200;
    background-color: rgb(49 60 89 / 67%);
    width: 100vw;
    height: 100vh;
  }

  &__content {
    display: flex;
    align-items: center;
    padding: 26px 65px;
    flex-direction: column;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: #313c59;

    &--small-padding {
      padding: 26px 12px;
    }
  }

  &__title {
    font-size: 22px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 0 0 12px;
  }

  &__sub-title {
    font-size: 14px;
    line-height: 19px;
    margin: 0 0 65px;
  }

  &__message-content {
    margin-top: 8px;
    font-weight: 400;
  }

  &__buttons {
    display: flex;
    justify-content: center;
    padding-bottom: 26px;
  }

  &__close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
  }
}

@media screen and (max-width: 1050px) {
  .base-modal {
    pointer-events: all;
    flex-basis: 100%;
    height: fit-content;

    &__content {
      padding: 26px 0 28px;
      margin: 0 -6px;
    }

    &__title {
      margin-bottom: 6px;
    }

    &__sub-title {
      margin-bottom: 26px;
    }

    &__buttons {
      margin-top: 32px;
    }
  }
}

@media screen and (max-width: 568px) {
  .base-modal {
    margin: 10px;

    &__content {
      padding: 0;
      margin: 0 -6px;
    }

    &__message-content {
      width: 100%;
    }

    &__buttons {
      padding-bottom: 10px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
