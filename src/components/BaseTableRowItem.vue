<template>
  <td
    :class="[
      { 'table-row-item__mobile-header': isVisibleOnMobile },
      { 'table-row-item--bold': isBold },
      { 'table-row-item--clickable': isClickable },
      ...classes,
    ]"
    class="table-row-item"
    @click="onClick"
  >
    <div
      class="table-row-item__content"
      :class="`table-row-item__content--align-${align} table-row-item__content--wrap-${wrap}`"
    >
      {{ value }}
      <slot />
    </div>
  </td>
  <slot name="bottom" />
</template>

<script setup>
const props = defineProps({
  classes: {
    type: Array,
    default: () => []
  },

  value: {
    type: String,
    default: ''
  },

  isVisibleOnMobile: {
    type: Boolean,
    default: false
  },

  isBold: {
    type: Boolean,
    default: false
  },

  isClickable: {
    type: Boolean,
    default: false
  },

  wrap: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['normal', 'anywhere', 'break-word'].includes(value)
    }
  },

  align: {
    type: String,
    default: 'start',
    validator(value) {
      return ['start', 'end', 'center'].includes(value)
    }
  }
})

const emit = defineEmits(['click'])

function onClick() {
  if (props.isClickable) {
    emit('click')
  }
}
</script>

<style lang="scss" scoped>
.table-row-item {
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
  font-weight: 600;
  padding: 8px 0 8px 26px;

  &__content {
    display: flex;
    align-items: center;

    &--align-start {
      justify-content: flex-start;
    }

    &--align-end {
      justify-content: flex-end;
    }

    &--align-center {
      justify-content: center;
    }

    &--wrap-break-word {
      overflow-wrap: break-word;
    }

    &--wrap-anywhere {
      overflow-wrap: anywhere;
    }

    &--wrap-normal {
      overflow-wrap: normal;
    }
  }

  &--bold {
    font-weight: bold;
  }

  &--clickable {
    cursor: pointer;
  }
}

@media screen and (max-width: 1050px) {
  .table-row-item {
    display: none;

    &__mobile-header {
      display: table-cell;
    }
  }
}
</style>
