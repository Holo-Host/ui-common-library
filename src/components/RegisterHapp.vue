<template>

  <div v-if="shouldShowRegisterScreen">
    <input type="text" id="register-email"
      v-model="emailInput"
      class="modal-input"
      data-testid='register-email-input'
      placeholder="Email" >

    <input type="text" id="register-registration-code"
      v-model="registrationCode"
      class="modal-input"
      data-testid='registration-code-input'
      placeholder="Registration code..." >
    
    <Button class='save-button' color="primary" :disabled="!isValid" :isBusy="isBusy" @click="handleRegister">Register</Button>
  </div>

  <slot v-else />
</template>

<script>
import Button from './Button.vue'
import { getMembraneProof } from '../utils/registration.ts'

export default {
  name: 'RegisterHapp',
  components: {
    Button
  },
  props: {
    roleName: {
      type: String,
      required: true,      
    },
    email: {
      type: String,
    },
    hasMemproofs: {
      type: Boolean,      
      required: true
    },
    isAnonymous: {
      type: Boolean,
      required: true
    },
    agentId: {
      type: String,
      required: true,
    },
    provideMemproofs: {
      type: Function,
      required: true
    },
    membraneProofServerUrl: {
      type: String,
    },
    membraneProofServerPayload: {
      type: String,
    },
  },
  data () {
    return {
      registrationCode: '',
      emailInput: '',
      isBusy: false
    }
  },
  computed: {
    isValid () {
      // Simple, permissive email validation
      const emailIsValid = this.email?.length > 5 && this.email?.includes('@')
      return  emailIsValid && this.registrationCode?.length > 0
    },
    shouldShowRegisterScreen () {
      return !this.isAnonymous && !this.hasMemproofs
    }
  },
  methods: {
    async handleRegister () {
      this.isBusy = true

      try {
        let memproof = await getMembraneProof({
          registration_code: this.registrationCode,
          email: this.email,
          membrane_proof_server_url: this.membraneProofServerUrl,
          membrane_proof_server_payload: this.membraneProofServerPayload,
          agent_id: this.agentId,
        })

        const response = await this.provideMemproofs({
          [this.roleName]: memproof
        })

      } catch (e) {
        console.error('registration failed with', e)
      } finally {
        this.isBusy = false
      }

    }
  },
  watch: {
    email (newEmail) {
      // copy the prop to the model value. this.email should change at most once in the lifecycle of the app, and never while we're on this page
      this.emailInput = newEmail
    }
  }
}
</script>

<style>
html {
  overflow-y: scroll;
}
body, html {
  height: 100%;
}
#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafcfe;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
