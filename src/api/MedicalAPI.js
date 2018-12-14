import { post } from '../axiosconfig/axiosconfig.js'

export default {
  // 医疗机构的添加
  Addhospital (params) {
    return post('/main/addhospital', params)
  },
  // 查询分页
  MedicalPage (params) {
    return post('/main/searchuser', params)
  },
  // 删除
  delMedical (params) {
    return post('/main/searchuser', params)
  },
  // 修改
  updateMedical (params) {
    return post('/main/searchuser', params)
  }
}
