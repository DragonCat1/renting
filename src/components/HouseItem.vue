<template>
  <div class="comp-house-item" @click="itemClick">
    <div class="item-top flex-between">
      <img :src="data.userAvatarUrl" v-preview>
      <div class="flex-grow">
        <p class="flex-between">
          <span><span class="nickname">{{data.userNickName}}</span><span class="emjoy">{{data.gender==='男'?'&#x1F466;&#x1F3FB;':'&#x1F467;&#x1F3FB;'}}</span></span>
          <span class="price">¥{{data.price}}</span>
        </p>
        <p class="flex-between">
          <span>{{data.refreshedAt | fromNow}}更新</span>
          <span>{{data.createdAt | format}}</span>
        </p>
      </div>
    </div>
    <div class="title">
      <span class="type-tag">{{data.houseType | houseType}}</span>
      {{data.title}}
    </div>
    <ImageSlider :images="data.images"/>
    <div class="footer flex-between">
      <span class="location"><i class="iconfont ic-location"/>{{data.location.name}}</span>
      <span class="area">{{data.district}}-{{data.township}}</span>
    </div>
  </div>
</template>

<script>
import ImageSlider from './ImageSlider'
const houseTypeMap = {
  sublet:'转租',
  entire:'整租',
  roomy:'找室友',
  rentEntire:'求整租',
  rentPart:'求合租',
}
export default {
  components:{
    ImageSlider
  },
  props:['data'],
  filters:{
    houseType(value){
      return houseTypeMap[value]
    }
  },
  methods:{
    itemClick(e){
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
$color-light:#89c1c0;
.comp-house-item {
  background: #fff;
  flex: 1 0;
  min-height: 200px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.09);
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover{
    box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.09);
    transform: scale(1.01);
  }
  &:not(:last-child),
  &:not(:nth-child(5n)) {
    margin-right: 16px;
  }
}
.item-top {
  font-size: 12px;
  white-space: nowrap;
  p {
    margin: 0;
    line-height: 20px;
  }
  .nickname{
    text-overflow: ellipsis;
    max-width: 10em;
    display: inline-block;
    overflow: hidden;
    vertical-align: text-bottom;
  }
  img {
    $size: 40px;
    max-width: $size;
    max-height: $size;
    border-radius: $size / 2;
    margin-right: 4px;
  }
  .emjoy {
    font-size: 16px;
    margin-left: 0.5em;
  }

  .price {
    $h: 18px;
    height: $h;
    line-height: $h;
    border-radius: $h / 2;
    padding: 0 8px;
    color: #fb4b52;
    border: 1px solid currentColor;
  }
}
.title {
  margin-top: 12px;
  min-height:55px;
  font-size: 14px;
  line-height: 1.5;
  .type-tag {
    font-size: 12px;
    color: #fff;
    padding: 1px 3px;
    background: $color-light;
    border-radius: 4px;
  }
}

.footer{
  font-size: 12px;
  margin-top: 8px;
  .location{
    color: $color-light;
  }
  .iconfont{
    font-size: 12px;
  }
}
</style>
