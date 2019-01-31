import Vue from 'vue'
import Router from 'vue-router'
import House from './views/House.vue'
import Me from './views/Me.vue'

Vue.use(Router)
export const routes =  [
  {
    path: '/',
    redirect:'/house'
  },
  {
    path: '/house',
    name: 'house',
    component: House,
  },
  {
    path: '/like',
    name: 'like'
  },
  {
    path: '/block',
    name: 'block'
  },
  {
    path: '/black list',
    name: 'blackList'
  },
  {
    path: '/me',
    name: 'me',
    component: Me
  }
]

export default new Router({
  routes,
  mode:'history'
})
