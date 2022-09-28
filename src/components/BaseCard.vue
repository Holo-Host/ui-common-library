<template>
  <div
    class="card"
    :class="{ 'two-columns': isMultiColumn }"
  >
    <h2
			v-if="title"
			class="title"
		>
      {{ title }}
      <h3
        v-if="subtitle"
        class="subtitle"
      >
        {{ subtitle }}
      </h3>
    </h2>

		<div class="card-content">
			<div
				v-if="isLoading || isError || isDisabled"
				class="card-overlay"
				:class="{ 'is-disabled': isDisabled }"
			>
				<CircleSpinner v-if="isLoading" class="card-spinner" />
				<div
					v-else-if="isError"
					class="error-message"
				>
					<p>Sorry, we couldn’t fetch this data.</p>
					<BaseButton
						:type="EButtonType.gray"
						title="Try again"
						@click="emit('try-again-clicked')"
					/>
				</div>
			</div>

			<div
				v-if="isMultiColumn"
				class="inner-row"
			>
				<div class="inner-column">
					<slot name="left" />
				</div>

				<div class="inner-column">
					<slot name="right" />
				</div>
			</div>

			<div
				v-else
				class="body"
				:class="`body--margin-${margin}`"
			>
				<slot />
			</div>

			<span
				v-if="withMoreButton"
				class="more"
				@click="emit('more-clicked')"
			>
      More <RightArrowIcon class="right-arrow-icon" />
    </span>
		</div>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton'
import CircleSpinner from './CircleSpinner'
import RightArrowIcon from './icons/RightArrowIcon'
import { computed, useSlots } from 'vue'
import { EButtonType } from '../types/ui'

const slots = useSlots()

defineProps({
	isDisabled: {
		type: Boolean,
		default: false
	},

	isLoading: {
		type: Boolean,
		default: false
	},

	isError: {
		type: Boolean,
		default: false
	},

  title: {
    type: String,
		default: ''
  },

  subtitle: {
    type: String,
    default: ''
  },

  withMoreButton: {
    type: Boolean,
    default: false
  },

	margin: {
		type: String,
		default: 'md'
	}
})

const emit = defineEmits(['more-clicked', 'try-again-clicked'])

const isMultiColumn = computed(() => slots.right && slots.left)
</script>

<style>
.card-info-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
}
</style>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  flex-basis: 33%;
  background-color: white;
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 12px;
}

.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.card-content {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
}

.two-columns {
  flex-basis: 69%;
}

.title {
  display: flex;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: var(--primary-light-color);
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  color: black;
  padding: 10px 28px;
  margin: 0;
}

.subtitle {
  margin: 0;
  margin-left: auto;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
}

.body {
  display: flex;
  flex-direction: column;
  flex-basis: 68%;

	&--margin-md {
		margin: 26px 26px 13px 26px;
	}

	&--margin-sm {
		margin: 20px 10px 0 10px;
	}
}

.inner-row {
  display: flex;
  flex-direction: row;
}

.inner-column {
  flex-basis: 50%;
  padding: 26px 30px;
}

.more {
  font-size: 14px;
  line-height: 19px;
  color: var(--primary-color);
  margin: auto 26px 13px auto;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.right-arrow-icon {
	margin-left: 4px;
	color: var(--primary-color);
}

.card-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 12px;
	width: 100%;
	height: 100%;
	background-color: var(--white-color);
	z-index: 10;
}

.card-spinner {
	position: absolute;
}

.error-message {
	padding: 5px 20px;
	text-align: center;
	color: var(--grey-color);
}

@media screen and (max-width: 1050px) {
  .card {
    margin-bottom: 28px;
    margin-right: 0;
  }

  .inner-row {
    flex-direction: column;
  }
}
</style>
