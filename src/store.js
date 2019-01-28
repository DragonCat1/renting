import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me:{}
  },
  mutations: {
    'm_set_me'(state,payload) {
      Vue.set(state,'me',{...state.me,...payload})
    }
  },
  actions: {

  },
  plugins: [createPersistedState({
    key:'store'
  })]
})
