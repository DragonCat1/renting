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
    filter:{
      sex:'不限'
    },
    image:{
      show:false,
      imgs:[]
    },
    houses:[],
    loading:false,
    block:[],
    blacklist:[]
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
      state.loading=false
    },
    'm_set_loading'(state,payload){
      state.loading=payload
    },
    'm_append_houses'(state,payload){
      state.houses.push(...payload)
    },
    'm_set_location'(state,payload){
      state.searchForm.currLoc = payload
      state.searchForm.queryCond.location = payload
    },
    'm_add_block'(state,payload){
      if(!state.block.find(el=>el.id===payload.id)){
        state.block.push(payload)
      }
    },
    'm_add_blacklist'(state,payload){
      if(!state.blacklist.find(el=>el.id===payload.id)){
        state.blacklist.push(payload)
      }
    },
    'm_remove_block'(state,payload){
      state.block = state.block.filter(el=>el.id!==payload)
    },
    'm_remove_blacklist'(state,payload){
      state.blacklist = state.blacklist.filter(el=>el.id!==payload)
    },
  },
  actions: {

  },
  plugins: [createPersistedState({
    key:'store'
  })]
})
