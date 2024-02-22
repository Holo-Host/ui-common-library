export default class Queue {
    constructor() {
      this.waker = null
      this.kill = false
      this.items = []
      this.killed = this.attend()
    }
  
    async enqueue_and_wait(async_fn) {
      const promise = new Promise((resolve, reject) => this.items.push(async () => {
        try {
          resolve(await async_fn())
        } catch (e) {
          reject(e)
        }
      }))
  
      if (this.waker) {
        this.waker()
      }
  
      return await promise
    }
  
    async sleep() {
      await new Promise(resolve => this.waker = resolve)
      this.waker = null
    }
  
    async attend() {
      while (!this.kill) {
        if (this.items.length > 0) {
          await this.items.shift()()
        } else {
          await this.sleep()
        }
      }
    }

    // pushes a delay of `delay` ms to the end of the queue
    wait (delay) {
      return this.enqueue_and_wait(() => new Promise((resolve => setTimeout(resolve, delay))))
    }
  
    async close() {
      // This code path is not currently used. If it doesn't work as expected, don't be too surprised
      this.kill = true
      if (this.waker) {
        this.waker()
      }
      await this.killed
    }
  }
  