<template>
  <div class="blacklist-item">
    <a @click="removeBlacklist(data.id)"><i class="iconfont ic-delete"/></a>
    <p>{{data.nickname}}</p>
    <img :src="data.avatar" v-preview/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props:{
    data:{
      type:Object,
      default:()=>({})
    }
  },
  methods:{
    ...mapMutations({
      removeBlacklist:'m_remove_blacklist'
    })
  }
}
</script>

<style lang="scss" scoped>
.blacklist-item {
  position: relative;
  background: #fff;
  border-radius: 3px;
  margin: 8px;
  padding: 8px;
  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 132px;
  }
  a {
    position: absolute;
    top: 5px;
    right:5px;
    cursor: pointer;
    color:#89c1c0;
  }
}
</style>
