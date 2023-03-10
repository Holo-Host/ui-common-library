<template>
  <tr
    class="base-table-row"
    :class="[
      {'base-table-row--is-expanded': isExpanded },
      {'base-table-row--is-expandable': isExpandable },
      ...classes
    ]"
  >
    <slot />

    <BaseTableRowItem
      v-if="isExpandable"
      is-visible-on-mobile
      is-clickable
      align="center"
      @click="toggleExpanded"
    >
      <div class="base-table-row__expand-arrow">
        <RightChevronIcon
          :class="[isExpanded ? 'base-table-row__expand-arrow-up-chevron' : 'base-table-row__expand-arrow-down-chevron']"
          color="#00CAD9"
        />
      </div>
    </BaseTableRowItem>
  </tr>

  <tr
    v-if="isExpanded"
    class="base-table-row__expanded-content"
    :class="[{'base-table-row__expanded-content--is-expanded': isExpanded }]"
  >
    <slot name="expanded-content" />
  </tr>
</template>

<script setup>
import { ref } from 'vue'
import BaseTableRowItem from './BaseTableRowItem.vue'
import RightChevronIcon from './icons/RightChevronIcon.vue'

defineProps({
  classes: {
    type: Array,
    default: () => []
  },

  isExpandable: {
    type: Boolean,
    default: false
  }
})

const isExpanded = ref(false)

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}
</script>

<style lang="scss" scoped>
.base-table-row {
  border-bottom: 0.5px solid var(--grey-light-color);

  &__expanded-content {
    display: none;

    &--is-expanded {
      display: table-row;
    }
  }

  &__expand-arrow-container {
    cursor: pointer;
  }

  &__expand-arrow {
    display: flex;
    justify-content: center;
    align-content: center;

    &-up-chevron {
      transform: scale(2) rotate(270deg);
      transform-origin: 20% 40%;
    }

    &-down-chevron {
      transform: scale(2) rotate(90deg);
    }
  }
}

.up-chevron {
  display: none;
}

.down-chevron {
  display: none;
}

@media screen and (max-width: 1050px) {
  .base-table-row {
    &--is-expanded {
      border-bottom: none;
    }

    &__expanded-content {
      display: table-row;

      &--is-expanded {
        border-bottom: 0.5px solid var(--grey-light-color);
      }
    }
  }

  .up-chevron {
    display: flex;
    transform: scale(1.4) rotate(270deg);
    padding: 5px;
    margin: 7px 0 0 auto;
    cursor: pointer;
  }

  .down-chevron {
    display: flex;
    transform: scale(1.4) rotate(90deg);
    padding: 5px;
    margin: 12px 0 -5px auto;
    cursor: pointer;
  }
}
</style>
