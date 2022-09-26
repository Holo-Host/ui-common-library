<template>
  <BaseModal
    :is-visible="isVisible"
    @close="emit('close')"
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
import { EProjectNotification, postNotification } from '../utils/notifications'
import { ref } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },

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

const dontShowGoToHoloFuelModalAgain = ref(
  localStorage.getItem(props.dontShowModalAgainLocalStorageKey)
)

const emit = defineEmits(['close', 'login'])

function handleHolofuelLogin() {
  postNotification(EProjectNotification.hideGoToHolofuelModal)

  if (dontShowGoToHoloFuelModalAgain.value) {
    localStorage.setItem(props.dontShowModalAgainLocalStorageKey, 'true')
  }

  emit('login', dontShowGoToHoloFuelModalAgain.value)
  const tabName = `${props.appName}-hf`
  window.open(props.holoFuelUrl, tabName).focus();
}

function setDontShowGoToHoloFuelModalAgain(value) {
  dontShowGoToHoloFuelModalAgain.value = value
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
