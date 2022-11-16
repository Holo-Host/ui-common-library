<template>
  <Transition>
    <div
      v-if="isVisible"
      class="notification-banner"
      :class="[type]"
      @click.stop
    >
      <button
        v-if="hasCloseButton"
        class="notification-banner__close-button"
        @click="hideBanner"
      >
        <ExIcon
          :color="type === EBannerType.warning ? '#313c59' : 'white'"
          :size="16"
        />
      </button>

      <div class="notification-banner__content">
        <span>{{ message }}</span>

        <div class="notification-banner__slot-content">
          <component :is="contentComponent" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useBanner, EBannerType } from '../composables/useBanner'
import ExIcon from './icons/ExIcon.vue'

const {
  isVisible,
  message,
  type,
  hasCloseButton,
  contentComponent,
  hideBanner
} = useBanner()
</script>

<style lang="scss" scoped>
.notification-banner {
  position: fixed;
  top: 0;
  width: 100%;
  opacity: 0.9;
  margin: 0 -78px;
  text-align: center;
  align-self: center;
  z-index: 30;
  color: white;

  &.error {
    background-color: var(--red-color);
  }

  &.warning {
    background-color: var(--yellow-light-color);
    color: var(--grey-dark-color);
  }

  &.success {
    background-color: var(--green-color);
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
