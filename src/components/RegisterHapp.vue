<template>
  <slot v-if="hasMemproofs" />
  <div v-else>
    <input type="text" id="register-email"
      v-model="email"
      class="modal-input"
      data-testid='register-email-input'
      placeholder="Email" >

    <input type="text" id="register-registration-code"
      v-model="registrationCode"
      class="modal-input"
      data-testid='registration-code-input'
      placeholder="Registration code..." >
    
    <Button class='save-button' :color="confirmButtonColor" :disabled="!isValid" :isBusy="isBusy" @click="handleRegister">Register</Button>
  </div>
</template>

<script>
import Button from './Button.vue'
import { getMembraneProof } from '../utils/registration.js'

export default {
  name: 'RegisterHapp',
  components: {
    Modal,
    Button
  },
  props: {
    roleName: {
      type: String,
      required: true,      
    },
    hasMemproofs: {
      type: Boolean,      
      required: true
    },
    agentKey: {
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
      email: '',
      isBusy: false
    }
  },  
  computed: {
    isValid () {
      // TODO this should check email
      return this.email && this.registrationCode
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
          agent_id: this.agentKey,
        })

        console.log('^&* memproof', memproof)
        
        const response = await provideMemproofs({
          [this.roleName]: memproof
        })

        console.log('^&* response', response)
      } catch (e) {
        console.error('registration failed with', e)
      } finally {
        this.isBusy = false
      }

    }
  },
  watch: {
    hasMemproofs(hasMemproofs, old) {
      console.log(`^&* WATCH hasMemproofs triggered`, hasMemproofs, '. old:', old)
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
