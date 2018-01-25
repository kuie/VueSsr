import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    counter: 0,
    stars: 10
  },
  mutations: {
    increment(state) {
      state.counter++
    }
  }
})

export default store
