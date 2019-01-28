import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Me from './views/Me.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
  ],
  mode:'history'
})
