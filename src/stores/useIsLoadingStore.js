import { defineStore } from 'pinia'

export const getZomePath = ({ zome_name, fn_name }) => `${zome_name}.${fn_name}`

const useIsLoadingStore = defineStore('isLoading', {
  state: () => ({
    currentlyLoadingCalls: {}
  }),
  actions: {
    callIsLoading(callSpec) {
      this.currentlyLoadingCalls[getZomePath(callSpec)] = true
    },
    callIsNotLoading(callSpec) {
      this.currentlyLoadingCalls[getZomePath(callSpec)] = false
    },
    isLoading(callSpec) {
      return this.currentlyLoadingCalls[getZomePath(callSpec)]
    }
  }
})

export default useIsLoadingStore
