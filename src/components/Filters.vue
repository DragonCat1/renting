<template>
  <div class="comp-filters">
    <el-form inline size="mini" :model="searchForm" label-width="5em" v-loading="loading" :disabled="!isLogin">
      <form-item
        v-for="item in option"
        :key="item.key"
        :item="item"
        :onChange="onChange"
        :model="searchForm"
      />
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'
import {listHouse} from '@/utils/leancloud'


Vue.component('form-item', {
  render (createElement) {
    const {item,onChange,model} = this
    const inputItemMap = {
      string:'el-input',
      number:'el-input-number',
      select:'el-select',
    }
    let optionEles = []
    if(item.type==='select'){
      optionEles = item.options.map(el => createElement('el-option',{
        props:{
          label:el.label,
          value:el.value
        }
      }))
    }
    const childEle = createElement(
      inputItemMap[item.type],
      {
        props:{
          value:eval(`model.${item.key}`),
          clearable:true
        },
        on: {
          change: onChange,
          input: e => {eval(`model.${item.key}=e`)}
        }
      },
      [...optionEles]
    )
    return createElement('el-form-item',{
      props:{
        label:item.label
      },
    },[childEle])
  },
  props: ['item','onChange','model']
})


export default {
  data(){
    return{
      loading:false,
      option:[
        {
          label:'关键字',
          type:'string',
          key:'keyword'
        },
        {
          label:'城市',
          type:'string',
          key:'currCity'
        },
        {
          label:'目的',
          type:'select',
          key:'filterType',
          options:[
            {label:'找房',value:'house'},
            {label:'找人',value:'roomy'},
          ]
        },
        {
          label:'性别',
          type:'select',
          key:'queryCond.genderSelected',
          options:[
            {label:'限男生',value:'boy'},
            {label:'限女生',value:'girl'},
            {label:'男女不限',value:'all'},
          ]
        },
        {
          label:'类型',
          type:'select',
          key:'queryCond.filterSelected',
          options:[
            {label:'默认',value:'default'},
            {label:'转租',value:'sublet'},
            {label:'整租',value:'entire'},
            {label:'找室友',value:'roomy'},
            {label:'求整租',value:'rentEntire'},
            {label:'求合租',value:'rentPart'},
          ]
        },
        {
          label:'排序',
          type:'select',
          key:'queryCond.orderSelected',
          options:[
            {label:'价格',value:'cheap'},
            {label:'时间',value:'new'},
            {label:'距离',value:'near'}
          ]
        },
        {
          label:'坐标',
          type:'string',
          key:'currLoc'
        },
        {
          label:'半径(km)',
          type:'number',
          key:'queryCond.nearbySelected'
        },
        {
          label:'页数',
          type:'number',
          key:'pageNumber',
        }
      ]
    }
  },
  computed:{
    ...mapState({
      searchForm: state => state.searchForm,
      isLogin:state=>state.isLogin,
    })
  },
  watch:{
    'searchForm.currLoc'(){
      this.onChange()
    }
  },
  methods:{
    async onChange(){
      this.loading = true
      await listHouse()
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form{
  padding-top:18px;
}
</style>
