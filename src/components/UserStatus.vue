<template>
  <div class="comp-user-status">
    <div v-if="isLogin">
      <img :src="me.wechatAvatarUrl" @click="showImage([me.wechatAvatarUrl])">
      <span>{{me.wechatNickName}}</span>
      <el-button type="text" @click="logout">注销</el-button>
    </div>
    <div v-else>
      <el-button type="text" @click="loginVisible = true">登陆</el-button>
    </div>
    <el-dialog
      title="登陆"
      :visible.sync="loginVisible"
      width="400px">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import mixImageViewer from '../mixins/imageViewer'
import 'swiper/dist/css/swiper.min.css'
import {login,logout} from '../utils/leancloud'
  
export default {
  mixins:[mixImageViewer],
  data(){
    return {
      loginVisible:false,
      form:{}
    }
  },
  computed:{
    ...mapState({
      isLogin:state => state.isLogin,
      me:state => state.me
    })
  },
  methods:{
    async login(){
      const{username,password} = this.form
      if(await login(username,password)){
        this.loginVisible = false
      }
    },
    logout(){
      if(logout()){
        console.warn('退出登陆')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-user-status{
  position: absolute;
  right: 0;
  &>div{
    color:#fff;
    display: flex;
    align-items: center;
    & > *:not(:last-child){
      margin-right:16px;
    }
    img{
      width: 60px;
      height: 60px;
      border-radius: 60px;
      cursor: pointer;
    }
  }
}
</style>
