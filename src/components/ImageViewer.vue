<template>
  <!-- <transition name="el-zoom-in-top"> -->
  <div class="comp-image-viewer" v-if="image.show" @keydown.esc="handleKey" tabindex="0" ref="container">
    <swiper
      ref="swiper1"
      class="swiper1"
      :options="swiperOption1"
      @slideChangeTransitionStart="slideChangeTransitionStart(0)"
    >
      <swiperSlide v-for="(item,index) in image.imgs" :key="index">
        <img :src="item" @dblclick="onDblclick" @click="onClick">
      </swiperSlide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
    <swiper
      ref="swiper2"
      class="swiper2"
      :options="swiperOption2"
      @slideChangeTransitionStart="slideChangeTransitionStart(1)"
    >
      <swiperSlide v-for="(item,index) in image.imgs" :key="index">
        <Img :size="100" :src="item"/>
      </swiperSlide>
    </swiper>
  </div>
  <!-- </transition> -->
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapState} from 'vuex'
import mixImageViewer from '../mixins/imageViewer'
import Img from '../components/Img'

export default {
  mixins:[mixImageViewer],
  components:{
    swiper,
    swiperSlide,
    Img
  },
  data(){
    return {
      closeTimer:null
    }
  },
  computed:{
    ...mapState({
      image:state => state.image
    }),
    swiperOption1(){
      return {
        initialSlide:this.image.index,
        keyboard: {
          enabled: true,
        },
        scrollbar: {
          el: '.swiper-scrollbar'
        },
      }
    },
    swiperOption2(){
      return {
        initialSlide:this.image.index,
        mousewheel:true,
        spaceBetween:8,
        slidesPerView :'auto',
        centeredSlides:true,
        slideToClickedSlide:true,
      }
    }
  },
  watch:{
    'image.show'(newVal){
      if(newVal){
        document.documentElement.style.overflow="hidden"
        this.$nextTick(()=>{
          this.$refs.container.focus()
        })
      }
      else{
        document.documentElement.style.overflow=""
      }
    }
  },
  methods:{
    handleKey(e){
      e.stopPropagation()
      this.closeImage()
    },
    onDblclick(e){
      if(this.closeTimer){
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
      e.target.parentElement.classList.toggle('image-scale')
      e.target.classList.toggle('original-size')
    },
    slideChangeTransitionStart(index){
      const {swiper1,swiper2} = this.$refs
      if(index === 1){
        swiper1.swiper.slideTo(swiper2.swiper.activeIndex)
      }
      else{
        swiper2.swiper.slideTo(swiper1.swiper.activeIndex)
      }
    },
    onClick(){
      if(this.closeTimer){
        return
      }
      this.closeTimer = setTimeout(() => {
        this.closeImage()
        this.closeTimer = null
      }, 250)
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-image-viewer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  outline: none;
  z-index: 20000;
  .swiper-container {
    overflow: visible;
  }
  .swiper-slide {
    width: initial;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items:center;
    cursor: grab;
    overflow: auto;
    &.image-scale{
      align-items:flex-start;
    }
    &:active {
      cursor: grabbing;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    img {
      max-width: 100%;
      max-height: 100%;
      &.original-size {
        max-width: initial;
        max-height: initial;
      }
    }
  }
  .swiper-pagination {
    bottom: -100px;
  }
  .swiper2 {
    .swiper-slide {
      opacity: 0.5;
      height: 100px;
      img {
        width: 100px;
        height: 100px;
      }
      &-active {
        opacity: 1;
      }
    }
  }
}
</style>
