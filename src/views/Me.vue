<template>
  <div class="view-me">
    <div v-if="isLogin" style="width:500px;margin:auto;">
      <el-form :model="form">
        <el-form-item v-for="(value,key,index) in form" :key="index" :label="key">
          <el-input v-model="form[key]" v-if="typeof value === 'string'"/>
          {{value}}{{typeof value}}{{Array.isArray(value)}}
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      未登录
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

export default {
  data(){
    return {
      form:{}
    }
  },
  watch:{
    me:{
      handler(newVal){
        this.$set(this,'form',cloneDeep(newVal))
      },
      immediate:true,
      deep:true
    }
  },
  computed:{
    ...mapState({
      isLogin:state=>state.isLogin,
      me:state=>state.me,
    })
  },
}
</script>

<style lang="scss" scoped>

</style>
