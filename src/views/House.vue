<template>
  <div class="view-home">
    <Filters/>
    <Map @location="onLocation" :distance="distance"/>
    <div class="houses flex-center">
      <HouseItem v-for="item in houses" :key="item.objectId" :data="item"/>
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
      distance:state => state.searchForm.queryCond.nearbySelected
    })
  },
  methods:{
    ...mapMutations({
      setLocation:'m_set_location'
    }),
    onLocation({lat,lng}){
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
