<template>
  <div
    :class="[kBaseClass, kChipTypeClass[type]]"
    :style="computedCustomStyle"
  >
    {{ label }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { EChipType } from '../types/ui'

const props = defineProps({
  label: {
    type: String,
    required: true
  },

  type: {
    type: Number,
    default: EChipType.info,
    validator(value) {
      return [EChipType.info, EChipType.danger, EChipType.success, EChipType.warning].includes(value)
    }
  },

  customTheme: {
    type: Object,
    default: () => ({})
  }
})

const kBaseClass = 'base-chip'

const kChipTypeClass = {
  [EChipType.info]: `${kBaseClass}__info`,
  [EChipType.danger]: `${kBaseClass}__danger`,
  [EChipType.success]: `${kBaseClass}__success`,
  [EChipType.warning]: `${kBaseClass}__warning`,
  [EChipType.custom]: `${kBaseClass}__custom`
}

const computedCustomStyle = computed(() => {
  if (props.type === EChipType.custom) {
    return {
      color: props.customTheme.fontColor,
      backgroundColor: props.customTheme.backgroundColor
    }
  }

  return {}
})

</script>

<style lang="scss" scoped>
.base-chip {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  border-radius: 9999px;
  padding: 1px 13px;
  margin-left: 10px;
  font-size: 14px;
  font-style: italic;
  font-weight: 600;

  &__info {
    background-color: var(--primary-light-color);
    color: var(--grey-color);
  }

  &__danger {
    background-color: var(--red-light-color);
    color: var(--red-color);
  }

  &__success {
    background-color: var(--green-light-color);
    color: var(--green-color);
  }

  &__warning {
    background-color: var(--yellow-light-color);
    color: var(--yellow-color);
  }
}
</style>
