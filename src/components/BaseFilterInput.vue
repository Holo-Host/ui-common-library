<template>
  <div class="base-filter">
    <div
      class="base-filter__label"
      :class="{ 'base-filter--disabled': isDisabled }"
    >
      {{ $t('$.filter_by') }}:&nbsp;
    </div>
    <div
      class="base-filter__filter"
      :class="{ 'base-filter--disabled': isDisabled }"
    >
      <input
        :value="value"
        class="base-filter__filter-input"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: String,
    required: true
  },

  isDisabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['on-change'])

const onInput = (e) => {
  emit('on-change', e.target.value)
}
</script>

<style lang="scss" scoped>
.base-filter {
  position: relative;
  display: flex;
  align-items: center;

  &__label {
    color: var(--grey-color);
    font-size: 12px;
    margin-left: 30px;
    margin-right: 2px;
  }

  &__filter {
    display: flex;
    position: relative;
    font-size: 12px;
  }

  &__filter-input {
    border: 1px solid var(--grey-light-color);
    border-radius: 5px;
    padding: 3px 5px;

    &:focus {
      outline-color: var(--primary-color);
    }

    &::placeholder {
      color: var(--grey-light-color);
    }
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
