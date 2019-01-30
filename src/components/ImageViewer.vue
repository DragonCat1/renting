<template>
  <transition name="el-zoom-in-top">
    <div class="comp-image-viewer" v-if="image.show">
      <swiper :options="swiperOption1">
        <swiperSlide v-for="(item,index) in image.imgs" :key="index">
          <img :src="item">
        </swiperSlide>
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
    </div>
  </transition>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapState} from 'vuex'
import mixImageViewer from '../mixins/imageViewer'

export default {
  mixins:[mixImageViewer],
  components:{
    swiper,
    swiperSlide
  },
  data(){
    return {
      swiperOption1:{
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
        scrollbar: {
          el: '.swiper-scrollbar'
        },
      },
      swiperOption2:{
      }
    }
  },
  computed:{
    ...mapState({
      image:state => state.image
    })
  },
  methods:{
    handleKey(e){
      e.key==='Escape' && this.closeImage()
    }
  },
  mounted(){
    window.addEventListener('keyup',this.handleKey)
  },
  beforeDestroy(){
    window.removeEventListener('keyup',this.handleKey)
  }
}
</script>

<style lang="scss" scoped>
.comp-image-viewer{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top:0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .swiper-container{
    overflow:visible;
  }
  .swiper-slide{
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    &:hover{
      background: rgba(0, 0, 0, 0.1);
    }
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .swiper-pagination{
    bottom:-100px;
  }
}
</style>
