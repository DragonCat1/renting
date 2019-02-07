import Store from '../store'
const preview = {
  install(Vue){
    Vue.directive('preview', {
      bind(el,binding){
        const {value={}} = binding
        const {images,index} = value
        el.addEventListener('click',function(e){
          e.stopPropagation()
          let src = e.target.src
          if(src.match(/wx\.qlogo\.cn/)){
            src = src.replace(/\/\d+$/,'/0')
          }
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
