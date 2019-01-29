<template>
  <div class="view-me">
    <div v-if="isLogin" style="width:500px;margin:auto;">
      <el-form :model="form">
        <el-form-item v-for="(value,key,index) in form" :key="index" :label="key">
          <el-input v-model="form[key]" v-if="typeof value === 'string'"/>
          <div v-if="typeof value === 'boolean'">
            <el-radio :name="key">是</el-radio>
            <el-radio :name="key">否</el-radio>
          </div>
          {{value}}{{typeof value}}
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="flex-center2 flex-column no-login text-light">
      <Icon name='empty' size="128px"/>
      /* 未登录 */
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
.no-login{
  height: 350px;
}
</style>
