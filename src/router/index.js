import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login'

Vue.use(Router)
// 路由配置
const routes = [
  {
    path: '/',
    name: '登陆',
    component: login,
    // component: require('./404')
    // 这种写法相当于 import xx from 模块
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
