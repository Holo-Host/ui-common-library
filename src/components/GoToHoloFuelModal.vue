<template>
	<BaseModal
		:is-visible="isVisible"
		@close="hideGoToHolofuelModal"
	>
		<div class="go-to-holofuel-modal">
			<img
				src="../../artifacts/images/holofuel-logo.svg"
				class="holofuel-logo"
				alt="holofuel-logo"
			/>

			<p class="go-to-holofuel-modal__description">
				{{ $t('holofuel_modal.description', { appName }) }}
			</p>
		</div>

		<template #buttons>
			<div class="go-to-holofuel-modal__buttons">
				<BaseButton
					:type="EButtonType.custom"
					:custom-theme="{
            fontColor: 'white',
            backgroundColor: '#21BE98',
            spinnerColor: 'white'
          }"
					class="go-to-holofuel-modal__button"
					@click="handleHolofuelLogin"
				>
					{{ $t('$.go_to_holofuel') }}
				</BaseButton>

				<BaseCheckbox
					id="go-to-holofuel-modal-checkbox"
					:checked="false"
					:label="$t('$.dont_show_this_message_again')"
					label-size="small"
					custom-color="#21BE98"
					class="go-to-holofuel-modal__checkbox"
					@update:checked="setDontShowGoToHoloFuelModalAgain"
				/>
			</div>
		</template>
	</BaseModal>
</template>

<script setup>
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import BaseCheckbox from './BaseCheckbox.vue'
import { EButtonType } from '../types/ui'
import { addObserver, EProjectNotification, removeObserver } from '../utils/notifications'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
	appName: {
		type: String,
		required: true
	},

	dontShowModalAgainLocalStorageKey: {
		type: String,
		required: true
	},

	holoFuelUrl: {
		type: String,
		required: true
	}
})

const isVisible = ref(false)

const dontShowGoToHoloFuelModalAgain = ref(
	localStorage.getItem(props.dontShowModalAgainLocalStorageKey)
)

onMounted(async () => {
	addObserver(EProjectNotification.showGoToHolofuelModal, showGoToHolofuelModal)
	addObserver(EProjectNotification.hideGoToHolofuelModal, hideGoToHolofuelModal)
})

onUnmounted(() => {
	removeObserver(EProjectNotification.showGoToHolofuelModal, showGoToHolofuelModal)
	removeObserver(EProjectNotification.hideGoToHolofuelModal, hideGoToHolofuelModal)
})

function showGoToHolofuelModal() {
	isVisible.value = true
}

function hideGoToHolofuelModal() {
	isVisible.value = false
}

function setDontShowGoToHoloFuelModalAgain(value) {
	dontShowGoToHoloFuelModalAgain.value = value
}

function handleHolofuelLogin() {
	hideGoToHolofuelModal()

	if (dontShowGoToHoloFuelModalAgain.value) {
		localStorage.setItem(props.dontShowModalAgainLocalStorageKey, 'true')
	}

	const tabName = `${props.appName}-hf`
	window.open(props.holoFuelUrl, tabName).focus();
}
</script>

<style scoped lang="scss">
.go-to-holofuel-modal {
	&__description {
		margin-top: 24px;
		padding: 0 46px;
	}

	&__buttons {
		display: flex;
		flex-direction: column;
	}

	&__button {
		margin-top: 18px;
	}

	&__checkbox {
		margin-top: 32px;
	}
}
</style>
