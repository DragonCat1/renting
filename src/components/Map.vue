<template>
  <div class="map-wrap flex-center2 flex-column">
    <div class="map">
      <div class="map-canvas" ref="map" :style="{height:height+'px'}"/>
      <div class="map-drager" @mousedown.stop="onMousedown"/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'


const {AMap} = window

export default {
  props:{
    distance:Number,
    points:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return {
      draging:false,
      startY:0,
      map:null,
      height:350,
      srcHeight:0,
      curPoint:null,
      circle:null,
      pointMarks:[],
      contextMenuPositon:null
    }
  },
  computed:{
    ...mapState({
      currLoc:state=>state.searchForm.currLoc
    })
  },
  watch:{
    distance(){
      if(this.curPoint){
        this.drawCircle(true)
      }
    },
    curPoint(newVal){
      if(newVal){
        this.drawCircle(true)
      }
    },
    points(){
      this.drawPoints()
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
      this.map = new AMap.Map(this.$refs.map,{
        mapStyle:'amap://styles/2858b1c25bd2ef905ae7a4aef271292c',
        keyboardEnable:false
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
      if(this.currLoc){
        this.contextMenuPositon = this.currLoc.split(',')
        this.markPoint()
      }
      this.drawPoints()
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
      if(this.curPoint){
        this.curPoint.setMap(null)
        this.curPoint = null
      }
      this.curPoint = new AMap.Marker({
        bubble:true,
        draggable:true,
        map: this.map,
        zIndex:200,
        position:this.contextMenuPositon, //基点位置
      })
      this.curPoint.on('dragging',()=>{
        this.drawCircle()
      })
      this.curPoint.on('dragend',()=>{
        this.$emit('location',this.curPoint.getPosition())
      })
      this.$emit('location',this.curPoint.getPosition())
    },
    initDrag(reverse){
      const key = reverse ? 'removeEventListener' : 'addEventListener'
      document[key]('mouseup',this.onMouseup)
      document[key]('mousemove',this.onMousemove)
    },
    initLayout(){
      const appEl = document.querySelector("#app")
      this.height = this.height + window.innerHeight - appEl.offsetHeight
    },
    drawCircle(fit){
      if(this.circle){
        this.circle.setMap(null)
        this.circle = null
      }
      const {lng,lat} = this.curPoint.getPosition()
      this.circle = new AMap.Circle({
        bubble:true,
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
      fit && this.map.setFitView([ this.circle ])
    },
    drawPoints(){
      this.pointMarks.forEach(el=>{
        el.setMap(null)
        el = null
      })
      this.pointMarks = []
      this.points.forEach((el,index)=>{
        const {latitude,longitude} = el.location
        const point = new AMap.Marker({
          bubble:true,
          // content:'<img width="19px" height="33px" src="//webapi.amap.com/theme/v1.3/markers/b/mark_rs.png">',
          content:`<img style="width:36px;height:36px;border-radius:50%;" src="${el.image}"/>`,
          map: this.map,
          position:[longitude,latitude],
          label:{content:el.price,offset:new AMap.Pixel(0,38)},
          title:el.title
        })
        point.on('click',()=>{
          const vnode = this.$parent.$refs.HouseNode.find(node => node.data.objectId === el.id)
          vnode.itemClick()
        })
        this.pointMarks.push(point)
      })
    }
  },
  mounted(){
    this.initMap()
    this.initDrag()
    this.initLayout()
  },
  created(){
    this.$store.subscribe(async(mutation)=>{
      if(mutation.type==='m_set_houses'){
        await this.$nextTick()
        this.initLayout()
      }
    })
  },
  destroyed(){
    this.initDrag(true)
    this.map.destroy()
  }
}
</script>

<style lang="scss" scoped>
.map-wrap {
  background: #2b2b2b;
  overflow: hidden;
  padding: 8px;
}
.map {
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.5);
  width: 100%;
}
.map-canvas {
  border: 1px solid #fefefe;
  /deep/ .context-menu {
    white-space: nowrap;
    background: #fff;
    a {
      display: block;
      padding: 5px;
      cursor: pointer;
      &:hover {
        background: darken($color: #fff, $amount: 10%);
      }
    }
  }
}
.map-drager {
  height: 5px;
  cursor: ns-resize;
  background: #b8f3a5;
  &:hover {
    background: darken($color: #b8f3a5, $amount: 10%);
  }
}
</style>
