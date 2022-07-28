<template>
  <Modal :handleClose="handleClose" modalClass='identity-modal'>
    <div class='modal-content'>
      <p class="modal-title">Your Address & Identity</p>
      <p>
        {{ body }}
      </p>
      <p><b>{{name}}</b></p>
      <div class="identicon">
        <Identicon size="60" :holoHash="agentKey" role='img' aria-label="Agent Identity Icon"/>
      </div>
      <p><b>{{agentId}}</b></p>
      <p><b>TIP:</b> Clicking on an identicon will copy the associated address for easy transacting in HoloFuel. </p>
    </div>
    <div class='footer'>
      <div class='buttons'>      
        <Button class='save-button' :color="'primary-enabled'" @click="onIUnderstandClick">I understand</Button>
      </div>
    </div>
  </Modal>  
</template>

<script>
import Modal from './Modal'
import Button from './Button'
import Identicon from './Identicon2.vue'

export default {
  name: 'IdentityModal',
  components: {
    Modal,
    Button,
    Identicon,
  },
  props: {
    handleClose: {
      type: Function,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    agentId: {
      type: String,
      required: true
    },
    agentKey: {
      type: Uint8Array,
      required: true
    }
  },
  methods: {
    onIUnderstandClick () {
      this.handleClose();
    }
  }
}
</script>

<style>
.identity-modal.modal {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
}
</style>

<style scoped>
.modal-title {
    font-weight: 600;
    font-size: 1.375rem;
    text-align: center;
    line-height: 1.875rem;
}

.modal-input {
    width: 28rem;
    height: 2.3rem;
    border-radius: 5px;
    border: 1px solid #606C8B;
    margin: 30px 0
}

.modal-content {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.1875rem;
    text-align: center;
    color: var(--content-color);
    padding: 0 74px;
    margin-top: 20px;
}


.footer {
    margin-top: 50px;
}
</style>
