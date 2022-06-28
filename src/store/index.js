import { createStore } from 'vuex'
import holo from './holo'
import hha from './hha'
import holofuel from './holofuel'
import ui from './ui'

const store = createStore({
  modules: {
    holo,
    hha,
    holofuel,
    ui,
  }
})

export default store
