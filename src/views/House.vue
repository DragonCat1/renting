<template>
  <div class="view-home">
    <Filters/>
    <Map/>
    <div class="houses flex-center">
      <HouseItem v-for="item in houses" :key="item.objectId" :data="item"/>
    </div>
  </div>
</template>

<script>
import Filters from '../components/Filters'
import HouseItem from '../components/HouseItem'
import Map from '../components/Map'
import {mapState} from 'vuex'

export default {
  components: {
    Filters,
    HouseItem,
    Map
  },
  computed:{
    ...mapState({
      houses: state => state.houses
    })
  }
}
</script>
<style lang="scss" scoped>
.houses{
  padding: 8px;
}
</style>
