import request from '../request'

// 药物管理

// 医生获取对应的药物指导（可搜索）
export function getDrugListForDoc(params) {
  return request({
    url: '/drug/manage/allForDoctor',
    method: 'get',
    params
  })
}

// // 管理员获取所有的药物指导（可搜索）
export function getDrugListForAdm(params) {
  return request({
    url: '/drug/manage/allForAdmin',
    method: 'get',
    params
  })
}

// 根据id获取药物指导
export function getDrugGuideById(params) {
  return request({
    url: '/drug/manage/getById',
    method: 'get',
    params
  })
}
