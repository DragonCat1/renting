<template>
<div>
  <div class="block-item" @click="itemClick">
    <a @click="removeBlock(data.id)"><i class="iconfont ic-delete"/></a>
    <p>{{data.title}}</p>
    <ImageSlider :images="data.images" :size="100" />
  </div>
  <el-dialog
    :visible.sync="detialShow"
    width="600px">
    <HouseDetial :oid="data.id"/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="detialShow = false">关闭</el-button>
    </span>
    <div slot="title">{{data.title}}</div>
  </el-dialog>
</div>
</template>

<script>
import ImageSlider from './ImageSlider'
import HouseDetial from './HouseDetial'
import { mapMutations } from 'vuex'


export default {
  components:{
    ImageSlider,
    HouseDetial
  },
  props:{
    data:{
      type:Object,
      default:()=>({})
    }
  },
  data(){
    return {
      detialShow:false
    }
  },
  methods:{
    ...mapMutations({
      removeBlock:'m_remove_block'
    }),
    itemClick(){
      this.detialShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.block-item {
  position: relative;
  background: #fff;
  border-radius: 3px;
  width: 200px;
  margin: 8px;
  padding: 8px;
  cursor: pointer;
  a {
    position: absolute;
    top: 5px;
    right:5px;
    cursor: pointer;
    color:#89c1c0;
  }
}
</style>
