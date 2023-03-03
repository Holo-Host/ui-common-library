<template>
  <div :class="{ 'base-table-pagination--disabled': isDisabled  }">
    {{ $t('$.rows_per_page') }}:&nbsp;&nbsp;
    <select
      :value="pageSize"
      class="base-table-pagination__dropdown"
      @change="onPageSizeChanged"
    >
      <option
        v-for="option in kPageSizeOptions"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>

  <div
    class="base-table-pagination__page"
    :class="{ 'base-table-pagination--disabled': isDisabled  }"
  >
    {{ paginationLegend }}
    <RightChevronIcon
      class="base-table-pagination__page-arrow-left"
      :color="hasPrevPage ? '#00CAD9' : '#606C8B'"
      @click="hasPrevPage && goToPrevPage()"
    />
    <RightChevronIcon
      class="base-table-pagination__page-arrow-right"
      :color="hasNextPage ? '#00CAD9' : '#606C8B'"
      @click="hasNextPage && goToNextPage()"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RightChevronIcon from './icons/RightChevronIcon.vue'

const props = defineProps({
  pageSize: {
    type: Number,
    default: 10
  },

  itemsCount: {
    type: Number,
    default: 0
  },

  currentPage: {
    type: Number,
    default: 0
  },

  isDisabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['pageChanged', 'pageSizeChanged'])

// eslint-disable-next-line no-magic-numbers
const kPageSizeOptions = [5, 10, 20, 30, 50]

const paginationLegend = computed(() => {
  const firstOnPage = props.currentPage * props.pageSize + 1
  let lastOnPage = firstOnPage + props.pageSize - 1

  if (lastOnPage > props.itemsCount) {
    lastOnPage = props.itemsCount
  }

  // When no items on the list
  if (lastOnPage === 0) {
    return `${props.itemsCount} items`
  }

  // If only one page is available
  if (lastOnPage === 1) {
    return `${lastOnPage} of ${props.itemsCount} item`
  }

  return `${firstOnPage}-${lastOnPage} of ${props.itemsCount} items`
})

const hasPrevPage = computed(() => props.currentPage > 0)
const hasNextPage = computed(() => (props.currentPage + 1) * props.pageSize <= props.itemsCount)

function onPageSizeChanged({ target: { value } }) {
  emit('pageSizeChanged', Number(value))
}

function goToPrevPage() {
  if (hasPrevPage.value) {
    emit('pageChanged', props.currentPage - 1)
  }
}

function goToNextPage() {
  if (hasNextPage.value) {
    emit('pageChanged', props.currentPage + 1)
  }
}
</script>

<style lang="scss" scoped>
.base-table-pagination {
  &__dropdown {
    appearance: none;
    border: none;
    background-color: transparent;
    font-size: 14px;
    font-weight: 600;
    color: var(--grey-dark-color);
    padding: 1px 24px 0 6px;
    background-image: url("../../artifacts/images/chevron.svg");
    background-repeat: no-repeat;
    background-position: right;
    cursor: pointer;
  }

  &__pagination {
    margin-left: auto;
  }

  &__page {
    display: flex;
  }

  &__page-arrow-right {
    margin-left: 20px;
    transform: scale(1.8);
    cursor: pointer;
  }

  &__page-arrow-left {
    margin-left: 10px;
    transform: scale(1.8) rotate(180deg);
    cursor: pointer;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
