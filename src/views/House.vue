<template>
  <div class="view-home">
    <Filters/>
    <Map @location="onLocation" :distance="distance" :points="housesFilted.map(el=>({location:el.location,image:el.userAvatarUrl,id:el.objectId,title:el.title}))"/>
    <div class="houses flex-center">
      <HouseItem v-for="item in housesFilted" :key="item.objectId" :data="item"/>
    </div>
  </div>
</template>

<script>
import Filters from '../components/Filters'
import HouseItem from '../components/HouseItem'
import Map from '../components/Map'
import {mapState,mapMutations} from 'vuex'

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
      distance:state => state.searchForm.queryCond.nearbySelected
    }),
    housesFilted(){
      return this.houses.filter(el=>!this.block.find(item=>item.id===el.objectId) && !this.blacklist.find(item=>item.id===el.avUserId))
    }
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
.houses{
  padding: 8px;
}
</style>
