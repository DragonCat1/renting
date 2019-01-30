<template>
  <div id="app">
    <div class="nav">
      <div class="nav-inner">
        <i class="iconfont ic-house" style="margin-right:35px;color:#fff;font-size:35px;"/>
        <router-link v-for="el in routes" :key="el.path" v-if="el.name" :to="el.path">{{el.name}}</router-link>
        <UserStatus/>
      </div>
    </div>
    <div class="main-content">
      <router-view/>
    </div>
    <ImageViewer/>
  </div>
</template>

<script>
import UserStatus from './components/UserStatus'
import ImageViewer from './components/ImageViewer'
import {routes} from './router.js'

export default {
  components:{
    UserStatus,
    ImageViewer
  },
  data(){
    return {
      routes:routes
    }
  }
}
</script>

<style lang="scss">
.nav {
  height: 80px;
  background: #2b2b2b;
  &-inner {
    position: relative;
    width: 1000px;
    align-items: center;
    display: flex;
    margin: auto;
    height: 100%;
    text-transform: uppercase;
    a,.el-button--text {
      &:not(:last-child){
        margin-right: 35px;
      }
      font-size: 20px;
      transition: all 0.3s;
      color:rgb(129, 129, 129);
      &[class$=active]{
        color:#fff;
      }
      &:hover{
        color:rgb(60, 194, 105);
      }
    }
  }
}
.main-content{
  padding:10px;
}
</style>
