<template>
  <tr class="header-row">
    <BaseTableHeaderItem
      v-for="header in headers"
      :key="header.key"
      :header="header"
      :is-selected="sortBy === header.key"
      :sort-direction="sortDirection"
      @click="onHeaderClicked(header)"
    />
  </tr>
</template>

<script setup>
import { ref } from 'vue'
import { ESortDirections } from '../types/ui'
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

function onHeaderClicked(header) {
  if (header.isSortable) {
    const { asc, desc } = ESortDirections

    if (header.key === props.sortBy) {
      sortDirection.value = sortDirection.value === asc ? desc : asc
    } else {
      sortDirection.value = asc
    }

    emit('sortByChanged', {
      key: header.key,
      direction: sortDirection.value
    })
  }
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
