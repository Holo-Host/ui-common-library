<template>
  <router-link
    :to="to"
    class="base-link-button"
    :class="[{ 'disabled': isDisabled, 'with-arrow': withArrow }]"
    :style="{ backgroundColor: color }"
  >
    <component
      v-if="icon"
      :is="icon"
      class="base-link-button__icon"
    />

    {{ label }}

    <slot />

    <RightChevronIcon
      v-if="withArrow"
      class="base-link-button__right-chevron-icon"
      color="#606C8B"
    />
  </router-link>
</template>

<script setup>
import RightChevronIcon from './icons/RightChevronIcon.vue'

defineProps({
  to: {
    type: String,
    required: true
  },

  isDisabled: {
    type: Boolean,
    default: false
  },

  icon: {
    type: Object,
    default: () => {}
  },

  label: {
    type: String,
    required: true
  },

  color: {
    type: String,
    default: 'rgba(176, 236, 240, 0.72)'
  },

  withArrow: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.base-link-button {
  height: 52px;
  padding: 0 14px 0 40px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: var(--grey-dark-color);
  display: flex;
  align-items: center;
  text-decoration: none;

  &.with-arrow {
    padding-left: 50px;
  }

  &.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &__icon {
    margin-right: 14px;
  }

  &__right-chevron-icon {
    margin-left: auto;
    transform: scale(1.8);
  }
}

</style>
