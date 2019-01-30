import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    me:{},
    searchForm:{
      currCity:'杭州市',
      currLoc:'', //当前位置
      pageNumber:1,
      filterType:'', //找房：house 找人：roomy
      keyword:'',
      queryCond:{
        filterSelected:'default',
        location:'',  //当前位置
        nearbySelected:1, //附近距离
        genderSelected:'all',
        orderSelected:''
      }
    },
    image:{
      show:false,
      imgs:[]
    },
    houses:[]
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
    },
    'm_set_houses'(state,payload){
      state.houses=payload
    },
    'm_append_houses'(state,payload){
      state.houses.push(...payload)
    }
  },
  actions: {

  },
  plugins: [createPersistedState({
    key:'store'
  })]
})
