import { defineStore } from 'pinia'

const useSignalStore = defineStore('signals', {
  state: () => ({
    callbacks: []
  }),
  actions: {
    addCallback(callback) {
      this.callbacks.push(callback)
    },
    handleSignal(signal) {
      this.callbacks.forEach(callback => callback(signal))
    }
  }
})

export default useSignalStore
