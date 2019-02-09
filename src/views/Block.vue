<template>
  <div class="view-block flex flex-wrap">
    <BlockItem v-for="item in block" :key="item.id" :data="item"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BlockItem from '../components/BlockItem'
export default {
  components:{
    BlockItem
  },
  computed:{
    ...mapState({
      block:state=>state.block
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
