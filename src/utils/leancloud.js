import Vue from 'vue'
import AV from 'leancloud-storage'
// import { Realtime, TextMessage } from 'leancloud-realtime'
import Store from '../store'
import config from '../config/leancloud'

const {Query,User,Cloud} = AV
const {appId,appKey} = config

const querys = {
  user: new Query('_user')
}
// 初始化
function init(_appId=appId,_appKey=appKey) {
  AV.init({
    appId:_appId,
    appKey:_appKey
  })
}

// init(
//   'FKS5vbp5Xa2SEmhQRnjfjxEI-gzGzoHsz',
//   'gjKcqQRf6ubalUJz8a7n1ovC'
// )

//注册
async function reg({username,password}) {
  let user = new User()
  user.setUsername(username)
  user.setPassword(password)
  const loggedInUser = await user.signUp()
  return loggedInUser
}


//登陆 28i85ifaiayy7jw3apg3m67ex 123456
async function login(username, password) {
  const loggedInUser = await User.logIn(username, password)
  Store.commit('m_set_me',{...loggedInUser.attributes,id:loggedInUser.id})
  Store.commit('m_set_login',true)
  return loggedInUser
}

//注销
function logout() {
  User.logOut()
  if(!User.current()){
    Store.commit('m_set_login',false)
  }
  return !User.current()
}

async function editMe(payload){
    let me = User.current()
    Object.keys(payload).forEach(el=>{
      me.set(el, payload[el])
    })
    try {
      const newMe = await me.save()
      Store.commit('m_set_me',{...newMe.attributes,id:newMe.id})
      return newMe
    }
    catch(e) {
      throw e
    }
}

// 默认
// {
//   "currCity": "杭州市",
//   "currLoc": "",
//   "pageNumber": 1,
//   "queryCond": {},
//   "filterType": "",
//   "keyword": ""
// }
// 找房
// {
// 	"currCity": "杭州市",
// 	"currLoc": "",
// 	"pageNumber": 1,
// 	"queryCond": {
// 		"filterSelected": "default"
// 	},
// 	"filterType": "house",
// 	"keyword": ""
// }
//找人
// {
// 	"currCity": "杭州市",
// 	"currLoc": "",
// 	"pageNumber": 1,
// 	"queryCond": {
// 		"filterSelected": "default"
// 	},
// 	"filterType": "roomy",
// 	"keyword": ""
// }
//附近1千米
// {
// 	"currCity": "杭州市",
// 	"currLoc": "120.20202,30.1889119",
// 	"pageNumber": 1,
// 	"queryCond": {
// 		"filterSelected": "default",
// 		"location": "120.20202,30.1889119",
// 		"districtSelected": "",
// 		"regionSelected": "",
// 		"subwaySelected": "",
// 		"nearbySelected": 1 //千米
// 	},
// 	"filterType": "house",
// 	"keyword": ""
// }
//区域
// {
// 	"currCity": "杭州市",
// 	"currLoc": "120.20202,30.1889119",
// 	"pageNumber": 1,
// 	"queryCond": {
// 		"filterSelected": "default",
// 		"location": "120.20202,30.1889119",
// 		"districtSelected": "滨江区",
// 		"regionSelected": "浦沿街道",
// 		"subwaySelected": "",
// 		"nearbySelected": ""
// 	},
// 	"filterType": "house",
// 	"keyword": ""
// }
//地铁
// {
// 	"currCity": "杭州市",
// 	"currLoc": "120.20202,30.1889119",
// 	"pageNumber": 1,
// 	"queryCond": {
// 		"filterSelected": "default",
// 		"location": "120.20202,30.1889119",
// 		"districtSelected": "",
// 		"regionSelected": "",
// 		"subwaySelected": {
// 			"__type": "GeoPoint",
// 			"latitude": 30.167564,
// 			"longitude": 120.234252
// 		},
// 		"nearbySelected": ""
// 	},
// 	"filterType": "house",
// 	"keyword": ""
// }
//价格
// {
// 	"currCity": "杭州市",
// 	"currLoc": "120.20202,30.1889119",
// 	"pageNumber": 1,
// 	"queryCond": {
// 		"filterSelected": "default",
// 		"location": "120.20202,30.1889119",
// 		"districtSelected": "",
// 		"regionSelected": "",
// 		"subwaySelected": {
// 			"__type": "GeoPoint",
// 			"latitude": 30.167564,
// 			"longitude": 120.234252
// 		},
// 		"nearbySelected": "",
// 		"priceSelected": "gt1000lt2000",
// 		"priceCond": {
// 			"key": "gt1000lt2000",
// 			"name": "1000元-2000元",
// 			"from": 1000,
// 			"to": 2000
// 		}
// 	},
// 	"filterType": "house",
// 	"keyword": ""
// }
//不限男女
// {
// 	"currCity": "杭州市",
// 	"currLoc": "",
// 	"pageNumber": 1,
// 	"queryCond": {
// 		"filterSelected": "default",
// 		"genderSelected": "all"
// 	},
// 	"filterType": "house",
// 	"keyword": ""
// }
//"orderSelected": "cheap"  "orderSelected": "new"  "orderSelected": "near"

async function house(payload){
  return await Cloud.run('listHouse',payload)
}

async function main(){
  init()
  const currentUser = User.current()
  const authenticated =  currentUser && await currentUser.isAuthenticated()
  if(authenticated){
    Store.commit('m_set_login',true)
    Store.commit('m_set_me',{...currentUser.attributes,id:currentUser.id})
  }
  else{
    Store.commit('m_set_login',false)
  }
}
main()

async function test(){
  
  
}
test()

export {
  init,
  reg,
  login,
  logout,
  editMe,
  house
}
