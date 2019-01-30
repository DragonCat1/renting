<template>
  <div class="comp-house-item">
    <div class="flex">
      <img :src="data.userAvatarUrl" v-preview>
      <span>{{data.userNickName}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['data']
}
</script>

<style lang="scss" scoped>
.comp-house-item{
   background: #fff;
   flex:1 0;
   height: 300px;
   overflow: hidden;
   box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.09);
   padding: 8px;
   border-radius: 3px;
   &:not(:last-child),&:not(:nth-child(5n)){
     margin-right: 16px;
   }
}
</style>
