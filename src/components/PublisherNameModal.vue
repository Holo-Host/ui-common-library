<template>
  <Modal :handleClose="handleClose" :shouldCloseOnAwayClick="false" :showEx="false" modalClass='publisher-name-modal'>
    <div class='modal-content'>
      <p class="modal-title">
        Welcome to Publisher Portal
      </p>
      <p>
        Publisher Portal comes coupled with an associated HoloFuel account. Give these associated accounts an Account Display Name. 
        This will show up on invoices and transactions between you and other HoloFuel users. You will NOT be able to change the name once saved. 
      </p>
      <input type="text" id="publisher-name" v-model="publisherName" class="modal-input" placeholder="Enter Account Display Name " >
    </div>
    <div class='footer'>
      <div class='buttons'>      
        <Button class='save-button' :color="confirmButtonColor" :disabled="confirmDisabled" :isBusy="isBusy" @click="onSavePublisherName">Save</Button>
      </div>
    </div>  
  </Modal>  
</template>

<script>
import { mapActions } from 'vuex'
import Modal from 'components/Modal'
import Button from 'components/Button'

export default {
  name: 'PublisherNameModal',
  components: {
    Modal,
    Button,
  },
  props: {
    handleClose: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      publisherName: '',
      isBusy: false
    }
  },
  computed: {
    confirmDisabled () {
        return this.publisherName.trim().length === 0
    },    
    confirmButtonColor () {
      return this.confirmDisabled ? 'primary-disabled' : 'primary-enabled'
    }
  },
  methods: {
    ...mapActions('ui', ['openIdentityModal'],),
    ...mapActions('holofuel', ['updateMyNickname'],),
    async onSavePublisherName () {
        this.isBusy = true;

        await this.updateMyNickname(this.publisherName.trim());
        this.handleClose();
        this.openIdentityModal();
    }
  }
}
</script>

<style>
.publisher-name-modal.modal {
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