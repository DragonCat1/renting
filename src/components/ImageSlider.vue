<template>
  <div class="image-slider">
    <swiper :options="swiperOption">
      <swiperSlide v-for="(image,index) in images" :key="image">
        <div class="image-wrap" :style="{width:size+'px',height:size+'px'}">
          <Img :src="image" :size="size" v-preview="{images,index}"/>
        </div>
      </swiperSlide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Img from '../components/Img'
export default {
  props:{
    images:Array,
    size:{type:Number,default:100}
  },
  components:{
    swiper,
    swiperSlide,
    Img
  },
  data(){
    return {
      swiperOption:{
        spaceBetween:8,
        slidesPerView :'auto',
        mousewheel:true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
      },
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
}
</style>
