<template>
  <div class="happ-card-usage">
    <HAppCardUsageItem
      v-for="item in items"
      :key="item.title"
      :item="item"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { presentMicroSeconds, presentBytes } from '../utils/numbers'
import HAppCardUsageItem from './HAppCardUsageItem.vue'

const { t } = useI18n()

const props = defineProps({
  happ: {
    type: Object,
    required: true
  }
})

const items = computed(() => {
  return [
    {
      value: presentMicroSeconds(props.happ.usage.cpu),
      unit: t('$.cpu'),
      isDisabled: true
    },
    {
      value: presentBytes(props.happ.storage),
      unit: t('$.storage'),
      isDisabled: true
    },
    {
      value: presentBytes(props.happ.usage.bandwidth),
      unit: t('$.bandwidth'),
      isDisabled: false
    }
  ]
})
</script>

<style lang="scss" scoped>
.happ-card-usage {
  display: flex;
  justify-content: space-between;
  color: var(--grey-dark-color);
  font-size: 12px;
  font-weight: 600;
  padding-right: 36px;
}

@media screen and (max-width: 1050px) {
  .happ-card-usage {
    flex-direction: column;
  }
}
</style>
