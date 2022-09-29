<template>
	<tr
		:class="[
			'base-table-row',
			{'base-table-row--is-expanded': isExpanded }
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
		:class="[{'base-table-row__expanded-content--is-expanded': isExpanded }]"
		class="base-table-row__expanded-content"
	>
		<slot name="expanded-content" />
	</tr>
</template>

<script setup>
import { ref } from 'vue'
import RightChevronIcon from 'components/icons/RightChevronIcon';

const isExpanded = ref(false);

function toggleExpanded() {
  isExpanded.value = !isExpanded.value;
}
</script>

<style lang="scss" scoped>
.base-table-row {
	border-bottom: 0.5px solid var(--grey-light-color);

	&__expanded-content {
		display: none;
	}
}

.base-table-row:last-child {
	border: none;
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
	}

	.down-chevron {
		display: flex;
		transform: scale(1.4) rotate(90deg);
		padding: 5px;
		margin: 12px 0 -5px auto;
	}
}
</style>
