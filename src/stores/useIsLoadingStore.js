import { defineStore } from 'pinia'

export const getZomePath = ({ zomeName, fnName }) => `${zomeName}.${fnName}`

export const useIsLoadingStore = defineStore('isLoading', {
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
