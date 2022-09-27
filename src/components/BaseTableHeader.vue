<template>
  <tr class="header-row">
    <BaseTableHeaderItem
      v-for="header in headers"
      :key="header.key"
      :header="header"
      :is-selected="sortBy === header.key"
      :sort-direction="sortDirection"
      @click="onHeaderClicked(header.key)"
    />
	</tr>
</template>

<script setup>
import { ESortDirections } from '../types/ui'
import { ref } from 'vue'
import BaseTableHeaderItem from './BaseTableHeaderItem.vue'

const props = defineProps({
  headers: {
    type: Object,
    required: true
  },

  sortBy: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['sortByChanged'])

const sortDirection = ref(ESortDirections.desc)

function onHeaderClicked(key) {
  const { asc, desc } = ESortDirections

  if (key === props.sortBy) {
    sortDirection.value = sortDirection.value === asc ? desc : asc
  } else {
    sortDirection.value = asc
  }

  emit('sortByChanged', { key, direction: sortDirection.value })
}
</script>

<style lang="scss" scoped>
.header-row {
  position: relative;
  font-size: 16px;
  line-height: 22px;
  color: var(--grey-dark-color);
  border-bottom: 0.5px solid var(--grey-light-color);
}
</style>
