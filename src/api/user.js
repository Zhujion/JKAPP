import { post } from '../axiosconfig/axiosconfig.js'

export default {
  login (params) {
    return post('/main/login', params)
  }
}
