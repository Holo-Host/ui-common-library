const HHA_ROLE_ID =  'core-app';

export default {
  namespaced: true,
  state: {
    happs: [],
  },
  actions: {
    async loadHapps({ dispatch, commit }) {
      const zomeCallArgs = {
        roleId: HHA_ROLE_ID,
        zomeName: 'hha',
        fnName: 'get_my_happs',
        payload: null,
      }

      const result = await dispatch('holo/zomeCall', zomeCallArgs, {
        root: true,
      })

      if (result.type === 'error') {
        throw new Error(result.data)
      }

      commit('setHapps', result.data)

      return
    },
    async createDraft({ state, dispatch, commit }, payload) {
      const zomeCallArgs = {
        roleId: HHA_ROLE_ID,
        zomeName: 'hha',
        fnName: 'create_draft',
        payload,
      }

      const result = await dispatch('holo/zomeCall', zomeCallArgs, {
        root: true,
      })

      if (result.type === 'error') {
        throw new Error(result.data)
      }

      commit('setHapps', state.happs.concat(result.data))

      return result.data
    },
    async updateDraft({ state, dispatch, commit }, payload) {
      const zomeCallArgs = {
        roleId: HHA_ROLE_ID,
        zomeName: 'hha',
        fnName: 'update_draft',
        payload,
      }

      const result = await dispatch('holo/zomeCall', zomeCallArgs, {
        root: true,
      })

      if (result.type === 'error') {
        throw new Error(result.data)
      }

      const updatedDraft = result.data

      commit(
        'setHapps',
        state.happs.map((happ) =>
          happ.id === payload.id ? updatedDraft : happ
        )
      )

      return updatedDraft
    },
    async publishHapp({ state, dispatch, commit }, draftId) {
      console.log('Publish payload: ', draftId)
      const zomeCallArgs = {
        roleId: HHA_ROLE_ID,
        zomeName: 'hha',
        fnName: 'publish_happ',
        payload: draftId,
      }

      const result = await dispatch('holo/zomeCall', zomeCallArgs, {
        root: true,
      })

      if (result.type === 'error') {
        throw new Error(result.data)
      }

      const publishedHapp = result.data

      commit(
        'setHapps',
        state.happs.map((happ) => (happ.id === draftId ? publishedHapp : happ))
      )

      return publishedHapp
    },
    async createAndPublishDraft({ dispatch }, payload) {
      const draft = await dispatch('createDraft', payload)
      return dispatch('publishHapp', draft.id)
    },
    async updateHapp({ state, dispatch, commit }, payload) {
      const zomeCallArgs = {
        roleId: HHA_ROLE_ID,
        zomeName: 'hha',
        fnName: 'update_happ',
        payload,
      }

      const result = await dispatch('holo/zomeCall', zomeCallArgs, {
        root: true,
      })

      if (result.type === 'error') {
        throw new Error(result.data)
      }

      const updatedHapp = result.data

      commit(
        'setHapps',
        state.happs.map((happ) => (happ.id === payload.id ? updatedHapp : happ))
      )

      return updatedHapp
    },
    async pauseHapp({ state, dispatch, commit }, happId) {
      const zomeCallArgs = {
        roleId: HHA_ROLE_ID,
        zomeName: 'hha',
        fnName: 'publisher_pause_happ',
        payload: happId
      }

      const result = await dispatch('holo/zomeCall', zomeCallArgs, {
        root: true
      })

      if (result.type === 'error') {
        throw new Error(result.data)
      }

      commit(
        'setHapps',
        state.happs.map((happ) => (happ.id === happId ? {...happ, is_paused: true } : happ))
      )      
    },
    async unpauseHapp({ state, dispatch, commit }, happId) {
      const zomeCallArgs = {
        roleId: HHA_ROLE_ID,
        zomeName: 'hha',
        fnName: 'publisher_unpause_happ',
        payload: happId
      }

      const result = await dispatch('holo/zomeCall', zomeCallArgs, {
        root: true
      })

      if (result.type === 'error') {
        throw new Error(result.data)
      }

      commit(
        'setHapps',
        state.happs.map((happ) => (happ.id === happId ? {...happ, is_paused: false } : happ))
      )      
    },
    async removeHapp({ state, dispatch, commit }, happId) {
      const zomeCallArgs = {
        roleId: HHA_ROLE_ID,
        zomeName: 'hha',
        fnName: 'publisher_remove_happ',
        payload: happId
      }

      const result = await dispatch('holo/zomeCall', zomeCallArgs, {
        root: true
      })

      if (result.type === 'error') {
        throw new Error(result.data)
      }

      commit(
        'setHapps',
        state.happs.filter(happ => happ.id !== happId)
      )      
    },
  },
  mutations: {
    setHapps(state, happs) {
      state.happs = happs
    },
  },
  getters: {
    getMyHappsIsLoading: (_, __, { holo: { isLoading } }) =>
      isLoading['hha.get_my_happs'],
    pauseIsLoading: (_, __, { holo: { isLoading } }) =>
      isLoading['hha.publisher_pause_happ'],
    unpauseIsLoading: (_, __, { holo: { isLoading } }) =>
      isLoading['hha.publisher_unpause_happ'],
    happ: (state) => (id) => state.happs.find((happ) => happ.id === id),
  },
}
