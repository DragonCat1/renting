<template>
  <div class="nav">
    <div class="nav-inner">
      <i class="iconfont ic-house" style="margin-right:35px;color:#fff;font-size:30px;"/>
      <router-link v-for="el in routes" :key="el.path" v-if="el.name" :to="el.path">{{el.name}}</router-link>
      <UserStatus/>
    </div>
  </div>
</template>

<script>
import UserStatus from './UserStatus'
import {routes} from '../router'

export default {
  components:{
    UserStatus,
  },
  data(){
    return{
      routes
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  height: 50px;
  background: #2b2b2b;
  &-inner {
    position: relative;
    width: 1000px;
    align-items: center;
    display: flex;
    margin: auto;
    height: 100%;
    text-transform: uppercase;
    a {
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
        color:#3cc269;
      }
    }
  }
}
</style>
