const houseTypeMap = {
  sublet:'转租',
  entire:'整租',
  roomy:'找室友',
  rentEntire:'求整租',
  rentPart:'求合租',
  directRent:'房东直租'
}

export default {
  install(Vue){
    Vue.filter('houseTypeMap', function (value) {
      return houseTypeMap[value]
    })
  }
}
