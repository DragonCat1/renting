<template>
  <div id="app">
    <div class="nav">
      <div class="nav-inner">
        <router-link to="/home">首页</router-link>
        <router-link to="/me">我</router-link>
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

export default {
  components:{
    UserStatus,
    ImageViewer
  }
}
</script>

<style lang="scss" scoped>
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
    a {
      &:not(:last-child){
        margin-right: 20px;
      }
      font-size: 20px;
      transition: all 0.3s;
      color:rgb(129, 129, 129);
      &[class$=active]{
        color:#fff;
      }
      &:hover{
        color:darken($color:#fff, $amount: 40%);
      }
    }
  }
}
.main-content{
  padding:10px;
}
</style>
