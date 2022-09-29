<template>
	<div>
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

	<div class="base-table-pagination__page">
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
import RightChevronIcon from './icons/RightChevronIcon'
import { computed } from 'vue'

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
})

const emit = defineEmits(['pageChanged', 'pageSizeChanged'])

const kPageSizeOptions = [5, 10, 20, 30, 50]

const paginationLegend = computed(() => {
  const first = props.currentPage * props.pageSize + 1
  let last = first + props.pageSize - 1

  if (last > props.itemsCount) {
    last = props.itemsCount
  }

  return `${first}-${last} of ${props.itemsCount} items`
})

const hasPrevPage = computed(() => props.currentPage > 0)
const hasNextPage = computed(() => (props.currentPage + 1) * props.pageSize <= props.itemsCount)

function onPageSizeChanged({ target: { value }}) {
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
		font-size: 12px;
		font-weight: 600;
		color: var(--grey-dark-color);
		padding: 1px 16px 0 6px;
		background-image: url(../../artifacts/images/chevron.svg);
		background-repeat: no-repeat;
		background-position: right;
		cursor: pointer;
	}

	&__pagination {
		margin-left: auto;
	}

	&__page-arrow-right {
		margin-left: 42px;
		transform: scale(1.4);
		cursor: pointer;
	}

	&__page-arrow-left {
		margin-left: 42px;
		transform: scale(1.4) rotate(180deg);
		cursor: pointer;
	}
}
</style>
