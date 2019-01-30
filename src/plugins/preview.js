import Store from '../store'
const preview = {
  install(Vue){
    Vue.directive('preview', {
      bind(el){
        el.addEventListener('click',function(){
          Store.commit('m_set_image',{
            show:true,
            imgs:[this.src]
          })
        })
        el.style.cursor = 'pointer'
      }
    })
  }
}
export default preview
