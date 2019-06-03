<template>
  <div class="comp-house-item">
    <div class="house-item-box" @click="itemClick">
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
        <span class="type-tag">{{data.houseType | houseTypeMap}}</span>
        {{data.title}}
      </div>
      <ImageSlider :quickView="quickView" :images="data.images" :size="100" />
      <div class="footer flex-between">
        <span class="location"><i class="iconfont ic-location"/>{{data.location.name}}</span>
        <span class="area">{{data.district}}-{{data.township}}</span>
      </div>
    </div>
    <el-dialog
      :visible.sync="detialShow"
      width="600px">
      <HouseDetial :oid="data.objectId"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detialShow = false">关闭</el-button>
      </span>
      <div slot="title">
        <span class="house-opt">
          <a :class="{active:block.find(el=>el.id===data.objectId)}" @click="addBlock({id:data.objectId,title:data.title,images:data.images})"><i class="iconfont ic-block"/></a>
          <a :class="{active:blacklist.find(el=>el.id===data.avUserId)}" @click="addBlackList({id:data.avUserId,avatar:data.userAvatarUrl,nickname:data.userNickName})"><i class="iconfont ic-black"/></a>
        </span>
        <span class="type-tag">{{data.houseType | houseTypeMap}}</span>{{data.title}}</div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import ImageSlider from './ImageSlider'
import HouseDetial from './HouseDetial'


export default {
  data(){
    return {
      detialShow:false
    }
  },
  components:{
    ImageSlider,
    HouseDetial
  },
  props:['data','quickView'],
  computed:{
    ...mapState({
      block:state=>state.block,
      blacklist:state=>state.blacklist,
    })
  },
  methods:{
    ...mapMutations({
      addBlock:'m_add_block',
      addBlackList:'m_add_blacklist'
    }),
    itemClick(){
      this.detialShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
$color-light:#89c1c0;

.comp-house-item {
  flex: 1 0;
  overflow: hidden;
  &:not(:last-child) {
    margin-right: 16px;
  }
}

.house-item-box {
  background: #fff;
  padding: 8px;
  border-radius: 3px;
  min-height: 200px;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.09);
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
}
.type-tag {
  font-size: 12px;
  color: #fff;
  padding: 1px 3px;
  background: $color-light;
  border-radius: 4px;
}
.el-dialog__header {
  .type-tag {
    font-size: 16px;
    margin-right: 8px;
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
.house-opt{
  a {
    margin-right: 8px;
    color:#666;
    cursor: pointer;
    &:hover{
      color:#89c1c0;
    }
    &.active{
      color:#fb4b52;
    }
  }
}
</style>
