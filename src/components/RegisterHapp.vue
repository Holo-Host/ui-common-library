<template>

  <div v-if="shouldShowRegisterScreen" class="register-screen">
    <img v-if="logoUrl" :src="logoUrl" class="logo" />
    <h1 class="happ-name">{{ happName }}</h1>
    <div class="body">
      Please enter the email you registered with and the registration code you received in your email.
    </div>

    <input type="email" id="register-email"
      v-model="emailInput"
      class="register-input"
      data-testid='register-email-input'
      placeholder="Enter Email">

    <input type="text" id="register-registration-code"
      v-model="registrationCode"
      class="register-input"
      data-testid='registration-code-input'
      placeholder="Enter Registration code">

    <div class="buttons">
      <button v-if="signOut" class="logout-button" @click="handleLogout">Logout</button>
      <Button class='save-button' :color="buttonColor" :disabled="!isValid" :isBusy="isBusy" @click="handleRegister">Submit</Button>
    </div>

    <div class="help-text">
      Don't have a registration code? Please <a href="https://register.holo.host/" target="_blank">register with Holo.</a>
    </div>
  </div>

  <slot v-else />
</template>

<script>
import Button from './Button.vue'
import { getMembraneProof } from '../utils/registration.hs'

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
    logoUrl: {
      type: String,
    },
    happName: {
      type: String,
      required: true,
    },
    signOut: {
      type: Function
    }
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
    },
    buttonColor () {
      return this.isValid ? 'primary-enabled' : 'primary-disabled'
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

        await this.provideMemproofs({
          [this.roleName]: memproof
        })

        this.emailInput = ""
        this.registrationCode = ""
        
      } catch (e) {
        console.error('registration failed with', e)
      } finally {
        this.isBusy = false
      }

    },
    handleLogout () {
      this.emailInput = ""
      this.registrationCode = ""
      this.signOut && this.signOut()
    },
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
.register-screen {
  margin: 72px auto auto auto;
  border-radius: 5px;
  border: 1px solid #C4C4C4;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10);
  padding: 48px 48px 28px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}
.logo {
  max-height: 70px;
  align-self: center;
}
.happ-name {
  color: #606C8B;
  font-family: "Nunito Sans";
  font-size: 28px;
  font-weight: 600;
}
.body {
  color: #313C59;
  text-align: center;
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 38px;
}
.register-input {
  width: 402px;
  height: 34px;
  padding: 2px 16px;
  font-size: 14px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #606C8B;
  background: #FFF;
  margin-bottom: 24px;
}
.buttons {
  margin-top: 24px;
  display: flex;
}
.logout-button {
  color: #313C59;
  text-align: center;
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 700;
  text-decoration-line: underline;
  background: none;
  border: none;
  cursor: pointer;
}
.help-text {
  margin-top: 44px;
  color: #606C8B;
  font-family: "Nunito Sans";
  font-size: 12px;
  font-weight: 400;
}

.help-text a {
  color: #606C8B;
  font-family: "Nunito Sans";
  font-size: 12px;
  font-weight: 700;
  text-decoration-line: underline;
}
</style>
