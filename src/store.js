import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    me:{},
    image:{
      show:false,
      imgs:[]
    },
  },
  mutations: {
    'm_set_me'(state,payload) {
      Vue.set(state,'me',{...state.me,...payload})
    },
    'm_set_login'(state,payload){
      state.isLogin = payload
    },
    'm_set_image'(state,payload){
      state.image = {...state.image,...payload}
    }
  },
  actions: {

  },
  plugins: [createPersistedState({
    key:'store'
  })]
})
