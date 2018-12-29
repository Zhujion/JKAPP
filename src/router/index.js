import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/login'
// import login from '../layout/home'

Vue.use(Router)
// 路由配置
const routes = [
  {
    path: '/',
    name: '登录',
    component: login,
    // 这种写法相当于 import xx from 模块
    hidden: true
  }
]

export default new Router({
  // mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
