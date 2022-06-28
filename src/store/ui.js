export default {
  namespaced: true,
  state: {
    flashMessage: null,
    draftSavedModalVisible: false,
    happPublishedModalVisible: false,
    confirmPauseModalVisible: false,
    happPausedModalVisible: false,
    happUnpausedModalVisible: false,
    confirmStopModalVisible: false,
    happStoppedModalVisible: false,
    publisherNameModalVisible: false,
    identityModalVisible: false,
    lastPublishedHapp: null,
    happToPauseId: null,
    happToStopId: null,
    hcErrorMessage: null
  },
  actions: {
    openHappPublishedModal ({ commit }, happ) {
      commit('setHappPublishedModalVisible', true)
      commit('setLastPublishedHapp', happ)
    },
    closeHappPublishedModal ({ commit }) {
      commit('setHappPublishedModalVisible', false)
      commit('setLastPublishedHapp', null)
    },
    openConfirmPauseModal ({ commit }, happToPauseId) {
      commit('setConfirmPauseModalVisible', true)
      commit('setHappToPauseId', happToPauseId)
    },
    closeConfirmPauseModal ({ commit }) {
      commit('setConfirmPauseModalVisible', false)
      commit('setHappToPauseId', null)
    },
    openConfirmStopModal ({ commit }, happToStopId) {
      commit('setConfirmStopModalVisible', true)
      commit('setHappToStopId', happToStopId)
    },
    closeConfirmStopModal ({ commit }) {
      commit('setConfirmStopModalVisible', false)
      commit('setHappToStopId', null)
    },
    openPublisherNameModal ({ commit }) {
      commit('setPublisherNameModalVisible', true)
    },
    closePublisherNameModal ({ commit }) {
      commit('setPublisherNameModalVisible', false)
    },
    openIdentityModal ({ commit }) {
      commit('setIdentityModalVisible', true)
    },
    closeIdentityModal ({ commit }) {
      commit('setIdentityModalVisible', false)
    }
  },
  mutations: {
    setFlashMessage (state, message) {
      state.flashMessage = message
    },
    setDraftSavedModalVisible (state, isVisible) {
      state.draftSavedModalVisible = isVisible
    },
    setHappPublishedModalVisible (state, isVisible) {
      state.happPublishedModalVisible = isVisible
    },
    setConfirmPauseModalVisible (state, isVisible) {
      state.confirmPauseModalVisible = isVisible
    },
    setHappPausedModalVisible (state, isVisible) {
      state.happPausedModalVisible = isVisible
    },
    setHappUnpausedModalVisible (state, isVisible) {
      state.happUnpausedModalVisible = isVisible
    },
    setConfirmStopModalVisible (state, isVisible) {
      state.confirmStopModalVisible = isVisible
    },
    setHappStoppedModalVisible (state, isVisible) {
      state.happStoppedModalVisible = isVisible
    },
    setLastPublishedHapp (state, happ) {
      state.lastPublishedHapp = happ
    },
    setHappToPauseId (state, id) {
      state.happToPauseId = id
    },
    setHappToStopId (state, id) {
      state.happToStopId = id
    },
    setHcErrorMessage (state, message) {
      state.hcErrorMessage = message
    },
    setPublisherNameModalVisible (state, isVisible) {
      state.publisherNameModalVisible = isVisible
    },
    setIdentityModalVisible (state, isVisible) {
      state.identityModalVisible = isVisible
    }
  }
}
