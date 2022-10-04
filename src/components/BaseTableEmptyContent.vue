<template>
  <tr class="base-table-empty-content">
    <td colspan="100%">
      <div>
        <div
          v-if="isLoading || isError"
          class="base-table-empty-content__overlay"
        >
          <CircleSpinner
            v-if="isLoading"
            is-delayed
          />
          <div
            v-else-if="isError"
            class="base-table-empty-content__error-message"
          >
            <p>{{ $t('$.errors.generic_header') }}</p>
            <BaseButton
              :type="EButtonType.gray"
              title="Try again"
              @click="emit('try-again-clicked')"
            />
          </div>
        </div>
        <div v-else class="base-table-empty-content__empty-message">
          {{ $t(emptyMessageTranslationKey) }}
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { EButtonType } from '../types/ui'
import CircleSpinner from './CircleSpinner'
import BaseButton from './BaseButton'

const emit = defineEmits(['try-again-clicked'])

const props = defineProps({
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
</script>

<style lang="scss">
.base-table-empty-content {
  height: 435px;
  width: 100%;
  vertical-align: baseline;
  font-size: 14px;
  font-weight: 700;
  color: var(--grey-color);

  &__overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 375px;
  }

  &__error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__empty-message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 140px;
  }
}
</style>
