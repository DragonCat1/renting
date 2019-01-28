import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import router from './router'
import store from './store'
import './style/index.scss'

Vue.config.productionTip = false
Vue.use(element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
