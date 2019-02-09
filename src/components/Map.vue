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
    props:['distance','points'],
    data(){
      return {
        draging:false,
        startY:0,
        map:null,
        height:350,
        srcHeight:0,
        curPoint:null,
        circle:null,
        pointMarks:[]
      }
    },
    watch:{
      distance(){
        if(this.curPoint){
          this.drawCircle()
        }
      },
      curPoint(newVal){
        if(newVal){
          this.drawCircle()
        }
      },
      points(newVal){
        this.pointMarks.forEach(el=>{
          el.setMap(null)
          el = null
        })
        this.pointMarks = []
        newVal.forEach((el,index)=>{
          const {latitude,longitude} = el.location
          const point = new window.AMap.Marker({
            content:'<img width="19px" height="33px" src="//webapi.amap.com/theme/v1.3/markers/b/mark_rs.png">',
            map: this.map,
            position:[longitude,latitude],
            label:{content:index+1,offset:new window.AMap.Pixel(2,38)},
            title:el.title
          })
          this.pointMarks.push(point)
        })
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
            this.geolocation = new AMap.Geolocation({
              timeout: 10000,
            })
            this.map.addControl(this.geolocation)
            AMap.event.addListener(this.geolocation, 'complete', this.onLocationComplete)
            AMap.event.addListener(this.geolocation, 'error', this.onLocationError)
        })
        const contextMenu = new AMap.ContextMenu()
        contextMenu.addItem("设定位置", () => {
          this.markPoint()
        }, 0)
        this.map.on('rightclick', (e) => {
            contextMenu.open(this.map, e.lnglat)
            this.contextMenuPositon = e.lnglat
        })
      },
      onLocationComplete(data){
        this.contextMenuPositon = data.position
        this.markPoint()
        const {lat,lng} = data.position
        this.$emit('location',{lat,lng})
      },
      onLocationError(e){
        throw e
      },
      markPoint(){
        const {AMap} = window
        if(this.curPoint){
          this.curPoint.setMap(null)
          this.curPoint = null
        }
        this.curPoint = new AMap.Marker({
          map: this.map,
          position:this.contextMenuPositon, //基点位置
        })
        this.$emit('location',this.contextMenuPositon)
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
      },
      drawCircle(){
        if(this.circle){
          this.circle.setMap(null)
          this.circle = null
        }
        const {lng,lat} = this.curPoint.getPosition()
        this.circle = new window.AMap.Circle({
          center: [lng, lat],
          radius: this.distance * 1000,
          borderWeight: 1,
          strokeColor: "#1791fc", 
          strokeOpacity: 1,
          strokeWeight: 1,
          fillOpacity: 0.4,
          strokeStyle: 'solid',
          strokeDasharray: [10, 10], 
          fillColor: '#1791fc',
        })
        this.circle.setMap(this.map)
        // 缩放地图到合适的视野级别
        this.map.setFitView([ this.circle ])
      },
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
  padding:8px 0;
}
.map{
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.5);
  width: 1200px;
}
.map-canvas{
  border: 1px solid #fefefe;
  /deep/ .context-menu{
    white-space: nowrap;
    background: #fff;
    a{
      display: block;
      padding:5px;
      cursor: pointer;
      &:hover{
        background:darken($color: #fff, $amount: 10%);
      }
    }
  }
}
.map-drager{
  height:5px;
  cursor: ns-resize;
  background: #b8f3a5;
  &:hover{
    background:darken($color: #b8f3a5, $amount: 10%);
  }
}
</style>
