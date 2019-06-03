<template>
  <img :src="`${src}?imageView/1/w/${Size}/h/${Size}/q/100/format/jpg`" :srcset="`${src}?imageView/1/w/${Size}/h/${Size}/q/100/format/jpg,${src}?imageView/1/w/${Size}/h/${Size}/q/100/format/jpg 2x`">
</template>

<script>
  export default {
    props:{
      size:{
        type:Number,
        default:100
      },
      src:{
        type:String,
        default:''
      }
    },
    computed:{
      Size(){
        return window.devicePixelRatio * this.size
      }
    }
  }
</script>
