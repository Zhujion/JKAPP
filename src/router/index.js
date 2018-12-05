import Vue from 'vue'
import Router from 'vue-router'

import login from '../views/login'
import Home from '../views/home/home'

Vue.use(Router)
// 路由配置
const routes = [
  {
    path: '/',
    name: '登陆',
    component: login,
    hidden: true
  },
  {
    path: '/Home',
    name: '主页',
    component: Home,
    hidden: true
  }
]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
