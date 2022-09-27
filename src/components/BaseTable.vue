<template>
	<BaseCard>
		<table class="base-table">
			<BaseTableHeader
				:headers="headers"
				:sort-by="sortBy"
				@sort-by-changed="onSortByChanged"
			/>

			<slot :items="pagedData" />
		</table>
	</BaseCard>

	<div class="base-table__footer">
		Rows per page:&nbsp;&nbsp;
		<select
			v-model="pageSize"
			class="base-table__dropdown"
		>
			<option
				v-for="option in pageSizeOptions"
				:key="option"
				:value="option"
			>
				{{ option }}
			</option>
		</select>

		<div class="base-table__pagination">
			{{ paginationLegend }}
			<RightChevronIcon
				class="base-table__page-arrow-left"
				:color="hasPrevPage ? '#00CAD9' : '#606C8B'"
				@click="hasPrevPage && goToPrevPage()"
			/>
			<RightChevronIcon
				class="base-table__page-arrow-right"
				:color="hasNextPage ? '#00CAD9' : '#606C8B'"
				@click="hasNextPage && goToNextPage()"
			/>
		</div>
	</div>
</template>

<script setup>
import BaseCard from '@uicommon/components/BaseCard'
import BaseTableHeader from '@uicommon/components/BaseTableHeader'
import RightChevronIcon from 'components/icons/RightChevronIcon.vue'
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['sortByChanged'])

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
	}
})

const pageSizeOptions = ref([5, 10, 20, 30, 50])
const pageSize = ref(10)
const page = ref(0)

const sortBy = ref(props.initialSortBy)
const sortDesc = ref(true)

const paginationLegend = computed(() => {
	const first = page.value * pageSize.value + 1
	const last = first + pagedData.value.length - 1
	return `${first}-${last} of ${itemsCount.value} items`
})

const hasPrevPage = computed(() => page.value > 0)
const hasNextPage = computed(() => (page.value + 1) * pageSize.value <= itemsCount.value)

const pagedData = computed(() => {
	const startIndex = page.value * pageSize.value
	const endIndex = (page.value + 1) * pageSize.value
	return sortedItems.value.slice(startIndex, endIndex)
})

const itemsCount = computed(() => sortedItems.value.length)

watch(pageSize, () => (page.value = 0))

function goToPrevPage() {
	if (hasPrevPage.value) {
		page.value = page.value - 1
	}
}

function goToNextPage() {
	if (hasNextPage.value) {
		page.value = page.value + 1
	}
}

const sortedItems = computed(() => {
	const sortKey = sortBy.value
	const sortDescValue = sortDesc.value

	const itemsCopy = [...props.items]

	return itemsCopy.sort((a, b) => {
		if (a[sortKey] === b[sortKey]) {
			return 0
		}

		if (sortDescValue) {
			return a[sortKey] > b[sortKey] ? -1 : 1
		} else {
			return a[sortKey] < b[sortKey] ? -1 : 1
		}
	})
})

function onSortByChanged({ key, direction }) {
	sortBy.value = key
	sortDesc.value = direction === 'desc'
}
</script>

<style lang="scss" scoped>
.base-table {
	border-collapse: collapse;

	&__dropdown {
		appearance: none;
		border: none;
		background-color: transparent;
		font-size: 12px;
		font-weight: 600;
		color: var(--grey-dark-color);
		padding: 4px 16px 4px 4px;
		background-image: url(/images/chevron.svg);
		background-repeat: no-repeat;
		background-position: right;
	}

	&__footer {
		display: flex;
		width: 100%;
		font-weight: 600;
		font-size: 12px;
		line-height: 16px;
		color: var(--grey-dark-color);
		margin-bottom: 20px;
	}

	&__pagination {
		margin-left: auto;
	}

	&__page-arrow-right {
		margin-left: 40px;
		transform: scale(1.4);
	}

	&__page-arrow-left {
		margin-left: 40px;
		transform: scale(1.4) rotate(180deg);
	}
}
</style>
