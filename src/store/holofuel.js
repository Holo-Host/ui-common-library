import Queue from 'src/utils/queue'

const HOLOFUEL_ROLE_ID =  'holofuel';

const mutatingZomeCallQueue = new Queue()

const mutatingZomeCall = (dispatch, args) =>
  mutatingZomeCallQueue.enqueue_and_wait(() => dispatch('holo/zomeCall', args, {
    root: true
  }))


export default {
  namespaced: true,
  state: {
    nickname: null,
  },
  actions: {
    async getUserProfile({ dispatch }) {
      const zomeCallArgs = {
        roleId: HOLOFUEL_ROLE_ID,
        zomeName: 'profile',
        fnName: 'get_my_profile',
        payload: null,
      }

      const result = await dispatch('holo/zomeCall', zomeCallArgs, {
        root: true,
      })

      if (result.type === 'error') {
        throw new Error(result.data)
      }

      const profileData = result.data

      return profileData
    },    
    async loadMyNickname ({ dispatch, commit }) {
      const callZomeArgs = {
        roleId: HOLOFUEL_ROLE_ID,
        zomeName: 'profile',
        fnName: 'get_my_profile',
        payload: null
      }
      const myProfile = await dispatch('holo/zomeCall', callZomeArgs, {
        root: true
      })

      commit('setMyNickname', myProfile.data.nickname)
      return
    },
    async updateMyNickname ({ dispatch, commit }, nickname) {
      // update optimistically
      commit('setMyNickname', nickname)

      const callZomeArgs = {
        roleId: HOLOFUEL_ROLE_ID,
        zomeName: 'profile',
        fnName: 'update_my_profile',
        payload: {
          nickname
        }
      }

      const myProfile = await mutatingZomeCall(dispatch, callZomeArgs)
      // use hc as final source of truth
      commit('setMyNickname', myProfile.data.nickname)
    },
  },
  mutations: {
    setMyNickname (state, nickname) {
      state.nickname = nickname
    },
  },
  getters: {
    getMyProfileIsLoading: (_, __, { holo: { isLoading } }) => isLoading['profile.get_my_profile'],
    dashboardIsLoading: (_, getters) => (
      getters.getActionableTransactionsIsLoading ||
      getters.getCompletedTransactionsIsLoading
    ),
    publisherName: state => state.nickname
  }
}