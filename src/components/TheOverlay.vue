<template>
  <teleport to="body">
    <div
      v-if="isVisible"
      class="overlay-wrapper"
      :class="[
        { 'light-theme': theme === EOverlayTheme.light },
        { 'dark-theme': theme === EOverlayTheme.dark }
      ]"
      aria-hidden="true"
      data-test-overlay-wrapper
    >
      <div
        class="overlay-content"
      >
        <CircleSpinner
          v-if="type === EOverlayType.loading"
          :theme="theme"
          :scale="ESpinnerSize.medium"
        />
        <img
          v-if="type !== EOverlayType.loading && icon"
          :src="icon"
          alt="busy-overlay-icon"
          class="busy-overlay-icon"
        />
        <p class="busy-overlay-message">
          {{ message }}
        </p>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useOverlay, EOverlayTheme, EOverlayType } from '../composables/useOverlay'
import { ESpinnerSize } from '../types/ui'
import CircleSpinner from './CircleSpinner.vue'

const { isVisible, type, theme, message, icon } = useOverlay()
</script>

<style scoped>
.overlay-wrapper {
  height: 100vh;
  width: calc(100% - 270px);
  display: flex;
  justify-content: center;
  user-select: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  transition: opacity;
}

@media screen and (max-width: 1050px) {
  .overlay-wrapper {
    width: 100%;
    left: 0;
  }
}

.light-theme {
  background-color: rgb(255 255 255 / 95%);
}

.dark-theme {
  background-color: rgb(15 23 42 / 30%);
}

.overlay-content {
  position: absolute;
  top: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.busy-overlay-icon {
  height: 64px;
  width: 64px;
}

.busy-overlay-message {
  margin-top: 20px;
  color: #9ca3af;
  font-weight: 600;
  font-size: 1.5rem; /* 24px */
  line-height: 2rem; /* 32px */
  text-align: center;
}
</style>
