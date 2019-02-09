import Vue from 'vue'
import Router from 'vue-router'
import House from './views/House'
import Me from './views/Me'
import Like from './views/Like'
import Block from './views/Block'
import BlackList from './views/BlackList'

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
    name: 'like',
    component:Like
  },
  {
    path: '/block',
    name: 'block',
    component: Block,
  },
  {
    path: '/blacklist',
    name: 'blackList',
    component: BlackList,
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
