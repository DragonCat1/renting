<template>
  <div class="image-slider">
    <swiper :options="swiperOption">
      <swiperSlide v-for="(image,index) in images" :key="image">
        <div class="image-wrap" :style="{width:size+'px',height:size+'px'}">
          <Img :src="image" :size="size" v-preview="{images,index}" @mouseenter.native="showQuickView(image)" @mouseleave.native="closeQuickView"/>
        </div>
      </swiperSlide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
    <div class="quick-view-image" v-if="quickView&&quickViewSrc">
       <Img :size="quickView" :src="quickViewSrc"/>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Img from '../components/Img'

export default {
  props:{
    images:Array,
    size:{type:Number,default:100},
    quickView:Number
  },
  components:{
    swiper,
    swiperSlide,
    Img
  },
  data(){
    return {
      quickViewSrc:'',
      swiperOption:{
        spaceBetween:8,
        slidesPerView :'auto',
        mousewheel:true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
      },
    }
  },
  methods:{
    showQuickView(image){
      if(this.closeTimer){
        clearTimeout(this.closeTimer)
      }
      this.quickViewSrc=''
      this.quickViewSrc=image
    },
    closeQuickView(){
      if(this.closeTimer){
        clearTimeout(this.closeTimer)
      }
      this.closeTimer = setTimeout(()=>{
        this.quickViewSrc=''
      },250)
    }
  }
}
</script>

<style lang="scss" scoped>
$color-light:#89c1c0;

.image-slider{
  height: 103px;
  .swiper-container{
    padding-bottom: 3px;
    .swiper-slide{
      width: initial;
      height:calc(100% - 2px);
    }
    .swiper-scrollbar{
      bottom:0;
      height:2px;
      /deep/ .swiper-scrollbar-drag{
        background: $color-light;
      }
    }
  }

  .image-wrap{
    background: #000;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      cursor:grab;
      &:active{
        cursor:grabbing;
      }
    }
  }
  .quick-view-image {
    position: fixed;
    top:0;
    left: 0;
    right:0;
    height: calc(100vh - 280px);
    z-index: 10000;
    background: #000;
    text-align: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
