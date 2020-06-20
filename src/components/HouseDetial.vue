<template>
  <div class="comp-house-detail">
    <section class="time flex-between">
      <span>{{data.refreshedAt | fromNow}}更新</span>
      <span>{{data.createdAt | format}}</span>
    </section>
    <section class="item-top flex-between">
      <img :src="data.userAvatarUrl" v-preview>
      <div class="flex-grow">
        <p class="flex-between">
          <span class="flex"><span class="nickname">{{data.userNickName}}</span><span class="emjoy">{{data.gender==='男'?'&#x1F466;&#x1F3FB;':'&#x1F467;&#x1F3FB;'}}</span></span>
          <span class="age">{{data.gender}}·{{data.age}}</span>
        </p>
        <p class="flex-between">
          <span>{{data.job}}</span>
          <span>{{data.star}}</span>
        </p>
      </div>
    </section>
    <section>
      <p class="flex-between">
        <span>电话:{{contact.phone}}</span>
        <span>微信:{{contact.wechat}}</span>
      </p>
      <p class="flex-between">
        <span>{{data.city}}·{{data.district}}·{{data.township}}</span>
        <span>{{data.genderLimit | genderMap}}</span>
      </p>
      <p class="flex-between">
        <span>{{data.addrName}}</span>
        <span>{{data.location.address}}</span>
      </p>
      <p class="flex-between">
        <span class="price">{{data.price}}元/月</span>
      </p>
    </section>
    <section>
      <p class="house-desc">{{data.houseDesc}}</p>
    </section>
    <section class="flex flex-wrap">
      <div class="image" v-for="(img,index) in data.images" :key="img">
        <Img :size="173" :src="img" v-preview="{images:data.images,index}"/>
      </div>
      <div class="image">
        <img :src="data.qrImgUrl" v-preview>
      </div>
    </section>
    <section>
      <h2>留言({{comments.length}})</h2>
      <div>
        <div class="comment flex" v-for="item in comments" :key="item.objectId">
          <img class="head" :src="item.userAvatarUrl" v-preview/>
          <div class="flex-column flex-grow">
            <div class="flex-between">
              <span>{{item.userNickName}} {{item.userGender==='男'?'&#x1F466;&#x1F3FB;':'&#x1F467;&#x1F3FB;'}}</span>
              <span>{{item.createdAt | format}}</span>
            </div>
            <div class="comment-content">
              {{item.content}}
            </div>
            <span class="flex_c_b">
              <span>
                <el-button type="text" @click="handleRemove(item)" style="padding: 0;">删除</el-button>
                <el-button v-if="item.avUserId!==state.me.id" type="text" @click="reply(item)" style="padding: 0;">回复</el-button>
              </span>
              <span v-if="item.quoteUserName">回复·{{item.quoteUserName}}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
    <section class="reply-area">
      <el-form size="small">
        <el-form-item>
          <span v-if="replyUser">回复：{{replyUser.quoteUserName}}
            <el-button type="text" @click="replyUser = null"> <i class="el-icon-close"/></el-button>
          </span>
          <el-input type="textarea" :placeholder="replyUser?'回复':'留言'" v-model="form.content"/>
        </el-form-item>
        <el-form-item label="私密">
          <el-checkbox v-model="form.hidden"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { queryHouseById, listCommentByHouse,contactUser,addComment,removeComment,getUser } from '../utils/leancloud'
import Img from './Img'

const genderMap = {
  all:'男女不限',
  boy:'限男生',
  girl:'限女生'
}


export default {
  props:['oid'],
  components:{
    Img
  },
  data(){
    return {
      data:{location:{}},
      comments:[],
      contact:{
        phone:'',
        wechat:''
      },
      form:{
        content:'',
        hidden:false
      },
      replyUser:null
    }
  },
  filters:{
    genderMap(value){
      return genderMap[value]
    }
  },
  watch:{
    oid:{
      handler(newVal){
        if(newVal){
          this.fetch(newVal)
        }
      },
      immediate:true
    }
  },
  methods:{
    fetch(){
      queryHouseById(this.oid).then(result=>{
        this.data = result
        const {avUserId,city,objectId} = result
        // contactUser(avUserId,city,objectId).then(result=>{
        //   this.contact = result
        // })
        getUser(avUserId).then(user=>{
          this.contact.phone = user.attributes.mobilePhoneNumber
        })
      })
      this.loadComments()
    },
    loadComments(){
      listCommentByHouse(this.oid).then(result=>{
        this.comments = result
      })
    },
    // 添加评论
    async handleSubmit(){
      if(
        await addComment({
          content:this.form.content,
          isPrivate:this.form.hidden,
          houseId:this.oid,
          houseUserId:this.data.avUserId,
          ...this.replyUser||{}
        })
      ){
        this.form.content = ''
        this.replyUser = null
        this.loadComments()
      }
    },
    // 删除评论
    async handleRemove(item){
      if(
        await removeComment({
          commentId:item.objectId,
          houseUserId:item.houseUserId,
          avUserId:item.avUserId
        })
      ){
        this.loadComments()
      }
    },
    reply(item){
      this.replyUser = {
        quoteUser:item.avUserId,
        quoteUserName:item.userNickName,
        quoteContent:item.content,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$color-light: #89c1c0;
.comp-house-detail {
  section {
    margin: 8px 0;
  }
  .title {
    font-size: 16px;
    line-height: 1.5;
  }
  .price {
    font-size: 20px;
    color: #fb4b52;
  }
  .image {
    width: 173px;
    height: 173px;
    margin-bottom: 20px;
    &:not(:nth-child(3n)) {
      margin-right: 20px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .house-desc {
    line-height: 1.5;
  }
  .item-top {
    font-size: 16px;
    white-space: nowrap;
    p {
      margin: 0;
      line-height: 36px;
    }
    .nickname {
      text-overflow: ellipsis;
      max-width: 10em;
      display: inline-block;
      overflow: hidden;
      vertical-align: text-bottom;
    }
    img {
      $size: 80px;
      max-width: $size;
      max-height: $size;
      border-radius: $size / 2;
      margin-right: 12px;
    }
    .emjoy {
      font-size: 16px;
      margin-left: 0.5em;
    }
  }
  .comment {
    margin: 8px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    &:last-child {
      border: none;
    }
    .head {
      $size: 66px;
      margin-right: 12px;
      width: $size;
      height: $size;
      border-radius: $size / 2;
    }
    &-content {
      height: 26px;
      margin: 4px 0;
    }
  }
}
</style>
