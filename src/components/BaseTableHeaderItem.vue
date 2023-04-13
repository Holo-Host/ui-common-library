<template>
  <th
    :key="header.key"
    :class="[
      { 'header-row-item--is-selected': isSelected },
      { 'header-row-item--is-sortable': header.isSortable },
      { 'header-row-item--with-description': header.description },
      { 'header-row-item__mobile-header': header.isVisibleOnMobile },
      (header.align ? `header-row-item__content--align-${header.align}` : 'start')
    ]"
    :title="header.label"
    class="header-row-item"
  >
    <div
      class="header-row-item__content"
      :class="[header.align ? `header-row-item__content--align-${header.align}` : '']"
    >
      {{ header.label }}
      <ShortUpArrowIcon
        :color="isSelected ? '#000' : '#FFF'"
        :class="{ 'header-row-item__arrow--rotate-180': sortDirection === ESortDirections.desc }"
        class="header-row-item__arrow"
      />
    </div>

    <div
      v-if="header.description"
      class="header-row-item__content header-row-item__content--subheader"
      :class="[header.align ? `header-row-item__content--align-${header.align}` : '']"
    >
      {{ header.description }}
    </div>
  </th>
</template>

<script setup>
import { ESortDirections } from '../types/ui'
import ShortUpArrowIcon from './icons/ShortUpArrowIcon.vue'

defineProps({
  header: {
    type: Object,
    required: true
  },

  isSelected: {
    type: Boolean,
    default: false
  },

  sortDirection: {
    type: String,
    required: true,
    validator(value) {
      return [ESortDirections.asc, ESortDirections.desc].includes(value)
    }
  }
})
</script>

<style lang="scss" scoped>
.header-row-item {
  padding: 0 0 28px 26px;
  font-weight: 600;
  user-select: none;

  &--with-description {
    padding-bottom: 12px;
  }

  &--is-sortable {
    cursor: pointer;
  }

  &--is-selected {
    font-weight: 700;
  }

  /* this rule prevents the layout from jumping when the font-weight changes */
  &::after {
    display: block;
    content: attr(title);
    font-weight: 700;
    height: 1px;
    color: transparent;
    overflow: hidden;
    visibility: hidden;
  }

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

    &--subheader {
      font-size: 12px;
      line-height: 16px;
      color: var(--grey-color);
    }
  }

  &__arrow {
    top: 4px;
    margin-left: 3px;

    &--rotate-180 {
      transform: rotate(180deg);
    }
  }
}

@media screen and (max-width: 1050px) {
  .header-row-item {
    display: none;

    &__mobile-header {
      display: table-cell;
    }
  }
}
</style>
