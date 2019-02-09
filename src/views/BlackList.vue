<template>
  <div class="view-block flex flex-wrap">
    <BlacklistItem v-for="item in blacklist" :key="item.id" :data="item"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BlacklistItem from '../components/BlacklistItem'
export default {
  components:{
    BlacklistItem
  },
  computed:{
    ...mapState({
      blacklist:state=>state.blacklist
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
