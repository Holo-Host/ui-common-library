<template>
    <BaseModal :is-visible="true" @close="closeModal">
        <div class="go-to-springboard-modal">
            <img src="/images/holo-logo-2.png" class="go-to-springboard-modal__springboard-logo" alt="springboard-logo" />

            <p class="go-to-springboard-modal__title">
                Holo Springboard
            </p>

            <p class="go-to-springboard-modal__description">
                You’re leaving Cloud Console to go to Holo Springboard, where you can upgrade your verification. 
            </p>
        </div>
  
        <template #buttons>
            <div class="go-to-springboard-modal__buttons">
                <BaseButton
                :type="EButtonType.custom"
                :custom-theme="{
                    fontColor: 'white',
                    backgroundColor: '#5C4DA6',
                    spinnerColor: 'white'
                }"
                class="go-to-springboard-modal__button"
                @click="handleSpringboardLogin"
                >
                Go to Holo Springboard
                </BaseButton>
            </div>
        </template>
    </BaseModal>
</template>

<script setup>
import { EButtonType } from '../types/ui'
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import { SPRINGBOARD_URL } from '../utils/springboardConfiguration'

const props = defineProps({
  appName: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['login'])

function handleSpringboardLogin() {
  emit('login')
  const tabName = `${props.appName}-springboard`
  window.open(`${SPRINGBOARD_URL}/home?kyc=true`, tabName).focus()
}

function closeModal() {
  emit('login')
}

</script>

<style scoped lang="scss">
.go-to-springboard-modal {
  &__springboard-logo {
    height: 50px;
    margin: 0 auto;
  }

  &__title {
    margin-top: 6px;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
  }

  &__description {
    margin-top: 40px;
    padding: 0 46px;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
  }

  &__button {
    margin-top: 8px;
    margin-bottom: 12px;
  }
}
</style>