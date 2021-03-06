import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message, Loading, MessageBox } from 'element-ui'
// import * as mUtils from '@/utils/mUtils'

// 响应时间
axios.defaults.timeout = 5 * 1000
// 配置Cookie
axios.defaults.withCredentials = true

axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 静态资源
Vue.prototype.$static = ''
// 配置接口地址
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://192.168.5.112:9090'
} else if (process.env.NODE_ENV === 'debug') {
  // 开发环境
  axios.defaults.baseURL = 'http://192.168.5.112:9090'
} else if (process.env.NODE_ENV === 'production') {
  // 生成环境
  axios.defaults.baseURL = 'http://192.168.5.112:9090'
}
// axios.defaults.baseURL = 'http://192.168.5.112:9090'

var loadingInstance
// post传参序列化（添加请求拦截器）
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: true,
      text: '数据加载中，请稍后处理....',
      spinner: 'el-icon-loading',
      background: 'rgba(0,0,0,0.7)'
    })
    // let token = localStorage.getItem('x-auth-token')
    // config.headers.token = 'wS0hZPebMoEDGM0eVFWkzMJnTfQH8we2'
    // token = '我是请求头'
    // console.log(`${token}`)
    // console.log('99999999999999我是请求头t', mUtils.getCookie('csrftoken'))
    // if (token) {
    //   config.headers.token = `${token}`
    // }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    loadingInstance.close()
    Message.error('请求错误')
    return Promise.reject(err)
  }
)
// 返回状态判断（添加响应拦截器）
axios.interceptors.response.use(
  res => {
    // 根据后台定义的返回主体。1是成功 其他都是失败
    if (res.data.Retcode === 1) {
      console.log(res)
      // mUtils.setStore('x-auth-token', res.data.token) // 储存服务器返回的token信息
      // console.log('响应拦截器获取的token', res.data.token)
      loadingInstance.close()
      return res
    } else if (res.data.Retcode === 3) {
      // 用户未登录 错误3
      MessageBox.alert('登录信息超时，请重新登录！', '登录超时', {
        confirmButtonText: '跳转登录页面',
        callback: action => {
          window.location.href = '/'
        }
      })
    } else {
      loadingInstance.close()
      // 弹出失败原因
      Message.error(res.data.Reason)
    }
  },
  err => {
    loadingInstance.close()
    Message.error('请求失败，请稍后在试')
    return Promise.reject(err)
  }
)

// 发送请求post
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err.data)
        }
      )
      .catch(err => {
        reject(err.data)
      })
  })
}
// 发送请求 get
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
