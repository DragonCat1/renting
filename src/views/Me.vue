<template>
  <div class="view-me">
    {{me}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'me',
  computed:{
    ...mapState({
      me:state=>state.me
    })
  }
}
</script>

<style scoped>

</style>
