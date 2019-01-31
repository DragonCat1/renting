<template>
  <div class="image-slider">
    <swiper :options="swiperOption">
      <swiperSlide v-for="(image,index) in images" :key="image">
        <div class="image-wrap">
          <img :src="image" v-preview="{images,index}">
        </div>
      </swiperSlide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props:['images'],
  components:{
    swiper,
    swiperSlide
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
    $size: 100px;
    width: $size;
    height: $size;
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
.images {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 2px;
  height:102px;
  // &::-webkit-scrollbar {
  //   height: 2px;
  // }
  // &::-webkit-scrollbar-thumb {
  //   background: $color-light;
  // }
  &--wrap {
    $size: 100px;
    width: $size;
    height: $size;
    background: #000;
    &:not(:last-child) {
      margin-right: 8px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
