<template>
	<td
		:class="[
      { 'table-row-item__mobile-header': isVisibleOnMobile },
      { 'table-row-item--bold': isBold },
    ]"
		class="table-row-item"
	>
		<div
			class="table-row-item__content"
			:class="`table-row-item__content--align-${align}`"
		>
			{{ value }}
			<slot />
		</div>
	</td>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true
  },

	isVisibleOnMobile: {
		type: Boolean,
		default: false
	},

	isBold: {
		type: Boolean,
		default: false
	},

	align: {
		type: String,
		default: 'start',
		validator(value) {
			return ['start', 'end', 'center'].includes(value)
		}
	}
})
</script>

<style lang="scss" scoped>
.table-row-item {
	font-size: 14px;
	line-height: 19px;
	color: var(--grey-color);
	font-weight: 600;
	padding: 10px 0 10px 20px;

	&__content {
		display: flex;
		align-items: center;

		&--align-start {
			justify-content: flex-start;
		}

		&--align-end {
			justify-content: flex-end;
		}

		&--align-center {
			justify-content: center;
		}
	}

	&--bold {
		font-weight: bold;
	}
}

@media screen and (max-width: 1050px) {
	.table-row-item {
		display: none;

		&__mobile-header {
			display: table-cell;
		}
	}
}
</style>
