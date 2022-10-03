<template>
	<BaseCard margin="sm">
		<table class="base-table">
			<BaseTableHeader
				:headers="headers"
				:sort-by="sortBy"
				@sort-by-changed="onSortByChanged"
			/>

			<slot
				v-if="!isEmpty"
				:items="pagedData"
			/>

			<BaseTableEmptyContent
				v-else
				:is-loading="isLoading"
				:is-error="isError"
				:empty-message-translation-key="emptyMessageTranslationKey"
				class="base-table__empty-content"
				@try-again-clicked="emit('try-again-clicked')"
			/>
		</table>
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
</template>

<script setup>
import BaseCard from './BaseCard'
import BaseTableHeader from './BaseTableHeader'
import BaseTablePagination from './BaseTablePagination'
import { computed, ref, watch } from 'vue'
import { ESortDirections } from '../types/ui'
import BaseTableEmptyContent from './BaseTableEmptyContent'

const emit = defineEmits(['try-again-clicked'])

const props = defineProps({
  headers: {
    type: Object,
    required: true
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

const pageSize = ref(10)
const currentPage = ref(0)

const sortBy = ref(props.initialSortBy)
const sortDirection = ref(ESortDirections.desc)

const isEmpty = computed(() => props.isLoading || !props.items.length || props.isError)

const pagedData = computed(() => {
  const startIndex = currentPage.value * pageSize.value
  const endIndex = (currentPage.value + 1) * pageSize.value
  return sortedItems.value.slice(startIndex, endIndex)
})

const itemsCount = computed(() => sortedItems.value.length)

watch(pageSize, () => (currentPage.value = 0))

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

function onSortByChanged({ key, direction }) {
  sortBy.value = key
  sortDirection.value = direction
}

function onPageChanged(page) {
  currentPage.value = page
}

function onPageSizeChanged(size) {
  pageSize.value = size
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