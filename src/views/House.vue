<template>
  <div class="view-home" tabindex="0" @keydown.left="pageNumber>0&&pageNumber--" @keydown.right="pageNumber+=1">
    <Filters/>
    <Map @location="onLocation" :distance="distance" :points="housesFilted.map(el=>({location:el.location,image:el.userAvatarUrl,id:el.objectId,title:el.title,price:el.price}))"/>
    <div class="houses flex-center">
      <HouseItem ref="HouseNode" :quickView="800" v-for="item in housesFilted" :key="item.objectId" :data="item"/>
    </div>
  </div>
</template>

<script>
import Filters from '../components/Filters'
import HouseItem from '../components/HouseItem'
import Map from '../components/Map'
import {mapState,mapMutations} from 'vuex'
import {listHouse} from '@/utils/leancloud'


export default {
  components: {
    Filters,
    HouseItem,
    Map
  },
  computed:{
    ...mapState({
      houses: state => state.houses,
      block: state => state.block,
      blacklist: state => state.blacklist,
      distance:state => state.searchForm.queryCond.nearbySelected,
      searchForm:state => state.searchForm,
      filter:state => state.filter,
    }),
    housesFilted(){
      return this.houses.filter(
        el=>
          !this.block.find(item=>item.id===el.objectId) &&
          !this.blacklist.find(item=>item.id===el.avUserId) &&
          (el.gender===this.filter.sex||this.filter.sex==='不限')
        )
    },
    pageNumber:{
      get(){
        return this.searchForm.pageNumber
      },
      set(value){
        this.searchForm.pageNumber = value
        listHouse()
      }
    },
  },
  methods:{
    ...mapMutations({
      setLocation:'m_set_location'
    }),
    onLocation(position){
      let lat,lng
      if(Array.isArray(position)) {
        lng = +position[0]
        lat = +position[1]
      }
      else {
        lng = position.lng
        lat = position.lat
      }
      this.setLocation(`${lng.toFixed(6)},${lat.toFixed(6)}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.houses {
  padding: 8px;
}
</style>
