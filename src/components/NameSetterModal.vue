<template>
  <Modal :handleClose="handleClose" :shouldCloseOnAwayClick="false" :showEx="false" modalClass='set-name-modal'>
    <div class='modal-content'>
      <p class="modal-title">
        {{ title }}
      </p>
      <p>
        {{ body }}
      </p>
      <input type="text" id="publisher-name" v-model="name" class="modal-input" placeholder="Enter Account Display Name " >
    </div>
    <div class='footer'>
      <div class='buttons'>      
        <Button class='save-button' :color="confirmButtonColor" :disabled="confirmDisabled" :isBusy="isBusy" @click="onSaveName">Save</Button>
      </div>
    </div>  
  </Modal>  
</template>

<script>
import Modal from './Modal'
import Button from './Button'

export default {
  name: 'NameSetterModal',
  components: {
    Modal,
    Button,
  },
  props: {
    handleClose: {
      type: Function,
      required: true
    },
    updateMyName: {
      type: Function,
      required: true
    },
    openIdentityModal: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      name: '',
      isBusy: false
    }
  },
  computed: {
    confirmDisabled () {
        return this.name.trim().length === 0
    },    
    confirmButtonColor () {
      return this.confirmDisabled ? 'primary-disabled' : 'primary-enabled'
    }
  },
  methods: {
    async onSaveName () {
        this.isBusy = true

        await this.updateMyName(this.name.trim())
        this.handleClose()

        this.openIdentityModal()
        this.isBusy = false
    }
  }
}
</script>

<style>
.set-name-modal.modal {
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