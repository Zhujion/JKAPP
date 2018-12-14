import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'

// 响应时间
axios.defaults.timeout = 5 * 1000
// 配置Cookie
axios.defaults.withCredentials = false
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
    let token = localStorage.getItem('x-auth-token')
    console.log('token', token)
    if (token) {
      config.headers.token = `${token}`
    } else if (config.method === 'post') {
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
    console.log(res)
    console.log('Reason', res.data.Retcode)
    if (res.data.Retcode === 1) {
      loadingInstance.close()
      return res
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
