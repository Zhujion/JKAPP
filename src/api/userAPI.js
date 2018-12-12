import { post } from '../axiosconfig/axiosconfig.js'

export default {
  // 用户登录
  login (params) {
    return post('/main/login', params)
  },
  // 动态菜单
  menudata (params) {
    return post('/main/getmainmenue', params)
  },
  // 用户分页
  UserPage (params) {
    return post('/main/searchuser', params)
  }
}
