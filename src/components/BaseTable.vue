<template>
  <div>
    <BaseCard  margin="sm" :classes="classes" :isEmpty="isEmpty">
      <table class="base-table">
        <BaseTableHeader
          :header-styles="headerStyles"
          :headers="headers"
          :sort-by="sortBy"
          @sort-by-changed="onSortByChanged"
        />

        <slot
          v-if="!isEmpty"
          :items="pagedData"
        />
      </table>

      <BaseTableEmptyContent
        v-if="isEmpty"
        :is-loading="isLoading"
        :is-error="isError"
        :empty-message-translation-key="emptyMessageTranslationKey"
        class="base-table__empty-content"
        @try-again-clicked="emit('try-again-clicked')"
      />
    </BaseCard>

    <div class="base-table__footer">
      <BaseTablePagination
        :page-size="pageSize"
        :current-page="currentPage"
        :items-count="itemsCount"
        :is-disabled="isLoading || isError || !items.length"
        @page-size-changed="onPageSizeChanged"
        @page-changed="onPageChanged"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { ESortDirections } from '../types/ui'
import BaseCard from './BaseCard.vue'
import BaseTableEmptyContent from './BaseTableEmptyContent.vue'
import BaseTableHeader from './BaseTableHeader.vue'
import BaseTablePagination from './BaseTablePagination.vue'

const kDefaultPageSize = 10

const emit = defineEmits([
  'try-again-clicked',
  'page-number-changed',
  'page-size-changed',
  'sort-by-changed'
])

const props = defineProps({
  headers: {
    type: Object,
    required: true
  },

  headerStyles: {
    type: Object,
    default: () => {}
  },

  classes: {
    type: Array,
    default: () => []
  },

  initialSortBy: {
    type: String,
    default: ''
  },

  items: {
    type: Array,
    required: true
  },

  isLoading: {
    type: Boolean,
    default: false
  },

  isError: {
    type: Boolean,
    default: false
  },

  emptyMessageTranslationKey: {
    type: String,
    default: '$.errors.no_data'
  }
})

const pageSize = ref(kDefaultPageSize)
const currentPage = ref(0)

const sortBy = ref(props.initialSortBy)
const sortDirection = ref(ESortDirections.desc)

const isEmpty = computed(() => props.isLoading || !props.items.length || props.isError)

const sortedItems = computed(() => {
  const sortKey = sortBy.value

  const itemsCopy = [...props.items]

  return itemsCopy.sort((a, b) => {
    if (a[sortKey] === b[sortKey]) {
      return 0
    }

    if (sortDirection.value === ESortDirections.desc) {
      return a[sortKey] > b[sortKey] ? -1 : 1
    } else {
      return a[sortKey] < b[sortKey] ? -1 : 1
    }
  })
})

const pagedData = computed(() => {
  const startIndex = currentPage.value * pageSize.value
  const endIndex = (currentPage.value + 1) * pageSize.value
  return sortedItems.value.slice(startIndex, endIndex)
})

const itemsCount = computed(() => sortedItems.value.length)

watch(pageSize, () => (currentPage.value = 0))

// Set first page each time the items change
// this prevents us staying on non-existing page when
// new data is presented
watch(itemsCount, () => (currentPage.value = 0))

function onSortByChanged({ key, direction }) {
  sortBy.value = key
  sortDirection.value = direction
  emit('sort-by-changed', { key, direction })
}

function onPageChanged(page) {
  currentPage.value = page
  emit('page-number-changed', { current: Number(page), total: Number(itemsCount) })
}

function onPageSizeChanged(size) {
  pageSize.value = size
  emit('page-size-changed', Number(size))
}
</script>

<style lang="scss" scoped>
.base-table {
  border-collapse: collapse;

  &__empty-content {
    height: 435px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: var(--grey-dark-color);
    margin-top: 17px;
    margin-bottom: 20px;
  }
}
</style>
