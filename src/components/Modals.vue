<template>
  <DraftSavedModal v-if="draftSavedModalVisible" :handleClose="closeDraftSavedModal" />
  <HappPublishedModal v-if="happPublishedModalVisible" :handleClose="closeHappPublishedModal" />
  <ConfirmPauseModal v-if="confirmPauseModalVisible" :handleClose="closeConfirmPauseModal" />
  <HappPausedModal v-if="happPausedModalVisible" :handleClose="closeHappPausedModal" />
  <HappUnpausedModal v-if="happUnpausedModalVisible" :handleClose="closeHappUnpausedModal" />
  <ConfirmStopModal v-if="confirmStopModalVisible" :handleClose="closeConfirmStopModal" />
  <HappStoppedModal v-if="happStoppedModalVisible" :handleClose="closeHappStoppedModal" />
  <PublisherNameModal v-if="publisherNameModalVisible" :handleClose="closePublisherNameModal" />
  <IdentityModal v-if="identityModalVisible" :handleClose="closeIdentityModal" />
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import DraftSavedModal from 'components/DraftSavedModal.vue'
import HappPublishedModal from 'components/HappPublishedModal.vue'
import ConfirmPauseModal from 'components/ConfirmPauseModal.vue'
import HappPausedModal from 'components/HappPausedModal.vue'
import HappUnpausedModal from 'components/HappUnpausedModal.vue'
import ConfirmStopModal from 'components/ConfirmStopModal.vue'
import HappStoppedModal from 'components/HappStoppedModal.vue'
import PublisherNameModal from 'components/PublisherNameModal.vue'
import IdentityModal from "components/IdentityModal.vue"

export default {
  name: 'Modals',
  components: {
    DraftSavedModal,
    HappPublishedModal,
    ConfirmPauseModal,
    HappPausedModal,
    HappUnpausedModal,
    ConfirmStopModal,
    HappStoppedModal,
    PublisherNameModal,
    IdentityModal,
  },
  methods: {
    ...mapActions('ui', ['closeHappPublishedModal', 'closeConfirmPauseModal', 'closeConfirmStopModal']), // These three require additional clean up when closing
    ...mapMutations('ui', ['setDraftSavedModalVisible', 'setHappPausedModalVisible', 'setHappUnpausedModalVisible', 'setHappStoppedModalVisible', 'setPublisherNameModalVisible','setIdentityModalVisible']),
    closeDraftSavedModal () {
      this.setDraftSavedModalVisible(false)
    },
    closeHappPausedModal () {
      this.setHappPausedModalVisible(false)
    },
    closeHappUnpausedModal () {
      this.setHappUnpausedModalVisible(false)
    },
    closeHappStoppedModal () {
      this.setHappStoppedModalVisible(false)
    },
    closePublisherNameModal () {
      this.setPublisherNameModalVisible(false)
    },
    closeIdentityModal () {
      this.setIdentityModalVisible(false)
    }
  },
  computed: {
    ...mapState('ui', [
      'draftSavedModalVisible', 
      'happPublishedModalVisible', 
      'confirmPauseModalVisible', 
      'happPausedModalVisible', 
      'happUnpausedModalVisible',
      'confirmStopModalVisible', 
      'happStoppedModalVisible',
      'publisherNameModalVisible',
      'identityModalVisible'
    ]),
  }
}
</script>

<style scoped>
</style>
