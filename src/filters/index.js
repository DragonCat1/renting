import momentFilters from './moment'
import houseTypeFilters from './houseType'

export default {
  install(Vue){
    Vue.use(momentFilters)
    Vue.use(houseTypeFilters)
  }
}
