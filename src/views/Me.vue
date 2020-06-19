<template>
  <div class="view-me">
    <div v-if="isLogin" style="width:500px;margin:auto;">
      <el-form :model="form">
        <el-form-item v-for="(value,key,index) in form" :key="index" :label="key">
          <el-input placeholder="输入文本项" v-model="form[key]" v-if="typeof value === 'string'"/>
          <div v-if="typeof value === 'boolean'">
            <el-radio v-model="form[key]" :label="true">是</el-radio>
            <el-radio v-model="form[key]" :label="false">否</el-radio>
          </div>
          <div v-if="Array.isArray(value)">
            <el-tag
              v-for="(item,index) in value"
              :key="index"
              closable
              @close="form[key]=form[key].filter(el=>el!==item)"
              >
              {{item}}
            </el-tag>
            <input type="text" placeholder="添加数组项" class="el-input__inner" @keypress.enter="e=>{form[key].push(e.target.value);e.target.value=''}">
          </div>
          <el-input-number v-if="typeof value === 'number'" v-model="form[key]"/>
          <el-button v-if="!isEqual(form[key],me[key])" type="primary" @click="save({[key]:form[key]})" :loading="saveing">保存</el-button>
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
import {editMe} from '../utils/leancloud'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

export default {
  data(){
    return {
      saveing:false,
      form:{},
      isEqual
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
  methods:{
    async save(payload){
      this.saveing = true
      await editMe(payload)
      this.saveing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.no-login {
  height: 350px;
}
</style>
