import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Me from './views/Me.vue'

Vue.use(Router)
export const routes =  [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
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
