import Store from '../store'
const preview = {
  install(Vue){
    Vue.directive('preview', {
      bind(el){
        let src = el.src
        if(src.match(/wx\.qlogo\.cn/)){
          src = src.replace(/\/\d+$/,'/0')
        }
        el.addEventListener('click',function(){
          Store.commit('m_set_image',{
            show:true,
            imgs:[src]
          })
        })
        el.style.cursor = 'pointer'
      }
    })
  }
}
export default preview
