import {mapMutations} from 'vuex'

export default {
  methods:{
    ...mapMutations({
      setImage:'m_set_image'
    }),
    closeImage(){
      this.setImage({
        show:false
      })
    },
    showImage(imgs){
      this.setImage({
        show:true,
        imgs
      })
    }
  }
}
