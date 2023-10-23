<template>
  <BaseCard class="happ-card" margin="sm">
    <div
      v-if="isEmpty"
      class="happ-card__content happ-card__content--empty"
    >
      <span
        v-if="emptyCardLabel"
        class="happ-card__content-empty-label"
      >
        {{ $t(emptyCardLabel) }}
      </span>
      <slot name="empty-content" />
    </div>

    <div
      v-if="!isEmpty"
      class="happ-card__content"
    >
      <slot name="happ-image">
        <HAppImage
          :happ="happ"
          class="happ-card__desktop-image"
        />
      </slot>

      <div class="happ-card__details">
        <div class="happ-card__name">
          {{ happ.name }}

          <slot name="status-chip">
          </slot>

          <slot name="link-icon">
            <ArrowIcon
              class="happ-card__name-arrow-icon"
              :class="[areDetailsAvailable ? 'pointer' : 'disabled']"
              @click="emit('details-link-click')"
            />
          </slot>
        </div>

        <div class="happ-card__earnings disabled">
          {{ $t('$.last_7_days') }}:
          <span class="bold">
            &nbsp;{{ earnings }} HF
          </span>
        </div>

        <HAppCardUsage :happ="happ" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue'
import { formatCurrency } from '../utils/numbers'
import BaseCard from './BaseCard.vue'
import HAppCardUsage from './HAppCardUsage.vue'
import HAppImage from './HAppImage.vue'
import ArrowIcon from './icons/ArrowIcon.vue'

const props = defineProps({
  happ: {
    type: Object,
    default: () => {}
  },

  areDetailsAvailable: {
    type: Boolean,
    default: false
  },

  isEmpty: {
    type: Boolean,
    default: false
  },

  emptyCardLabel: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['details-link-click'])

const earnings = computed(() =>
  props.happ.last7daysEarnings && Number(props.happ.last7daysEarnings)
    ? formatCurrency(Number(props.happ.last7daysEarnings))
    : '--'
)
</script>

<style lang="scss" scoped>
.happ-card {
  &__content {
    display: flex;
    background-color: var(--white-color);
    text-decoration: none;
    padding-left: 10px;
    padding-bottom: 12px;

    &--empty {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
      padding-left: 0;
      font-size: 14px;
      line-height: 19px;
      font-weight: 700;
      color: var(--grey-color);
    }

    &-empty-label {
      display: flex;
      align-items: center;
      min-height: 146px;
    }
  }

  &__details {
    display: flex;
    flex: 1;
    flex-direction: column;
    color: var(--grey-color);
    font-size: 14px;
    line-height: 19px;
    font-weight: 600;
    margin-top: 4px;
  }

  &__mobile-image {
    display: none;
  }

  &__name {
    display: flex;
    align-items: center;
    margin: 1px 0;
    color: var(--grey-dark-color);
    font-size: 22px;
    font-weight: bold;

    &-arrow-icon {
      margin-left: auto;
    }
  }

  &__earnings {
    display: flex;
    align-items: center;
    color: var(--grey-dark-color);
    margin: 60px 0 10px 4px;
  }
}

/* Temporary, remove once we have all live data */
.disabled {
  opacity: 0.2;
}

.pointer {
  cursor: pointer;
}

.bold {
  font-weight: 700;
}

@media screen and (max-width: 1050px) {
  .happ-card {
    max-width: none;

    &__desktop-image {
      display: none;
    }

    &__earnings {
      margin-top: 20px;
    }

    &__content {
      margin-right: 0;
      flex-basis: 0;

      &--empty {
        width: 100%;
      }
    }
  }
}
</style>
