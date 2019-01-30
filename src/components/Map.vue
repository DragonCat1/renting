<template>
  <div class="map-wrap flex-center2 flex-column">
    <div class="map">
      <div class="map-canvas" ref="map" :style="{height:height+'px'}"/>
      <div class="map-drager" @mousedown.stop="onMousedown"/>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        draging:false,
        startY:0,
        map:null,
        height:400,
        srcHeight:0
      }
    },
    methods:{
      onMousedown(e){
        this.draging = true
        this.startY = e.screenY
        this.srcHeight = this.height
      },
      onMousemove(e){
        if(this.draging){
          this.height = this.srcHeight + e.screenY - this.startY
        }
      },
      onMouseup(){
        this.draging = false
      },
      initMap(){
        const {AMap} = window
        this.map = new AMap.Map(this.$refs.map,{
          mapStyle:'amap://styles/2858b1c25bd2ef905ae7a4aef271292c',
          // pitch:10, // 地图俯仰角度，有效范围 0 度- 83 度
          // viewMode:'3D' // 地图模式
        })
        AMap.plugin([
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.OverView',
          'AMap.MapType',
          'AMap.Geolocation',
        ], () => {
            this.map.addControl(new AMap.ToolBar())
            this.map.addControl(new AMap.Scale())
            this.map.addControl(new AMap.OverView({isOpen:true}))
            this.map.addControl(new AMap.MapType())
            this.map.addControl(new AMap.Geolocation())
        })
      },
      initDrag(reverse){
        const key = reverse ? 'removeEventListener' : 'addEventListener'
        document[key]('mouseup',this.onMouseup)
        document[key]('mousemove',this.onMousemove)
      },
      initLayout(){
        const appEl = document.querySelector("#app")
        if(window.innerHeight > appEl.offsetHeight){
          this.height = this.height + window.innerHeight - appEl.offsetHeight
        }
      }
    },
    mounted(){
      this.initMap()
      this.initDrag()
      this.initLayout()
    },
    destroyed(){
      this.initDrag(true)
      this.map.destroy()
    }
  }
</script>

<style lang="scss" scoped>
.map-wrap{
  background: #2b2b2b;
  overflow: hidden;
}
.map{
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.5);
  width: 1200px;
}
.map-canvas{
  border: 1px solid #fefefe;
}
.map-drager{
  height:5px;
  cursor: n-resize;
  background: #b8f3a5;
  &:hover{
    background:darken($color: #b8f3a5, $amount: 10%);
  }
}
</style>
