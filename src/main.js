// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router'
import ElementUI from 'element-ui' // 自己加的
import '../node_modules/element-ui/lib/theme-chalk/index.css' // 自己加的
import api from './api/api'// 接口
import * as mUtils from 'utils/mUtils'

Vue.prototype.$api = api

Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'mini'})

const menData = JSON.parse(localStorage.getItem('menuData'))
console.log('路由信息', localStorage.getItem('menuData'))
if (menData) {
  console.log('进入配置')
  store.commit('ADD_MENU', menData)
  const routes = mUtils.generateRoutesFromMenu(menData)
  const asyncRouterMap = [
    {
      path: '/index',
      name: '',
      hidden: true,
      component: require('layout/home.vue'),
      redirect: '/index',
      children: routes
    }
  ]
  router.addRoutes(asyncRouterMap)
}
router.beforeEach((route, redirect, next) => {
  console.log('进入配1置')
  // 定位到首页时 清空缓存数据
  if (route.path === '/') {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('menData')
    store.commit('ADD_MENU', [])
  }
  // 判断是否有用登陆记录
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (!userInfo && route.path !== '/') {
    console.log('没有用户信息，route.path不是定位到登录页面的,直接跳登录页面')
    // 没有用户信息，route.path不是定位到登录页面的,直接跳登录页面
    next({path: '/'})
  } else {
    console.log('222222=', route)
    if (route.name) {
      console.log('有用户信息和路由名称的，直接跳转路由的页面', route.name)
      // 有用户信息和路由名称的，直接跳转路由的页面
      next()
    } else {
      // 有用户信息，没有路由名称的，直接跳404页面。
      next({path: '/404'})
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
