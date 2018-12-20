import { post } from '../axiosconfig/axiosconfig.js'

export default {
  // 医疗机构的添加
  Addhospital (params) {
    return post('/main/addhospital', params)
  },
  // 查询分页
  MedicalPage (params) {
    return post('/main/searchhospital', params)
  },
  // 删除
  delMedical (params) {
    return post('/main/searchuser', params)
  },
  // 修改
  updateMedical (params) {
    return post('/main/updatehospital', params)
  },
  // 查询医师
  MedicalDoctor (params) {
    return post('/main/searchdoctinfo', params)
  },
  // 查询护士
  MedicalNurse (params) {
    return post('/main/searchnuresinfo', params)
  },
  // 操作日志
  MedicalLog (params) {
    return post('/main/searchoperatelog', params)
  }
}
