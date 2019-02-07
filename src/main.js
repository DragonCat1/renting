import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import router from './router'
import store from './store'
import Icon from './components/Icon.vue'
import preview from './plugins/preview'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.min.css'
import './style/index.scss'


Vue.config.productionTip = false
moment.locale('zh-cn')
Vue.use(element)
Vue.use(preview)
Vue.component('Icon',Icon)
Vue.filter('fromNow', function (value) {
  return moment(value).fromNow()
})
Vue.filter('format', function (value) {
  return moment(value).format('YYYY/MM/DD hh:mm')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// navigator.geolocation.getCurrentPosition(e => {
//   const {coords:{longitude,latitude}} = e
//   store.commit('m_set_location',`${longitude.toFixed(6)},${latitude.toFixed(6)}`)
// })
