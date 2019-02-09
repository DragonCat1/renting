import moment from 'moment'
moment.locale('zh-cn')

export default {
  install(Vue){
    Vue.filter('fromNow', function (value) {
      return moment(value).fromNow()
    })
    Vue.filter('format', function (value) {
      return moment(value).format('YYYY/MM/DD hh:mm')
    })
  }
}
