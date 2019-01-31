import Store from '../store'
const preview = {
  install(Vue){
    Vue.directive('preview', {
      bind(el,binding){
        const {value={}} = binding
        const {images,index} = value
        let src = el.src
        if(src.match(/wx\.qlogo\.cn/)){
          src = src.replace(/\/\d+$/,'/0')
        }
        el.addEventListener('click',function(e){
          e.stopPropagation()
          Store.commit('m_set_image',{
            show:true,
            imgs:images || [src],
            index:index || 0
          })
        })
        el.style.cursor = 'pointer'
      }
    })
  }
}
export default preview
