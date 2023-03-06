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

    <RightChevronIcon
      :class="[isExpanded ? 'up-chevron' : 'down-chevron']"
      color="#00CAD9"
      @click="toggleExpanded"
    />
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

  &--is-expandable {
    &--is-expanded {
      border-bottom: none;
    }

    .up-chevron {
      display: flex;
      position: absolute;
      right: 5px;
      transform: scale(2) rotate(270deg);
      margin: 14px 15px 0 auto;
    }

    .down-chevron {
      display: flex;
      position: absolute;
      right: 5px;
      transform: scale(2) rotate(90deg);
      margin: 20px 15px 0 auto;
    }
  }
}

.up-chevron {
  display: none;
  cursor: pointer;
}

.down-chevron {
  display: none;
  cursor: pointer;
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
  }

  .down-chevron {
    display: flex;
    transform: scale(1.4) rotate(90deg);
    padding: 5px;
    margin: 12px 0 -5px auto;
  }
}
</style>
