import request from '../request'

// 执行汇报

// 医生获取执行汇报【是获取最新的一次执行汇报】（可搜索）
export function getAllHuibaoForAdm(params) {
  return request({
    url: '/report/manage/allForAdmin',
    method: 'get',
    params
  })
}

// 管理员获取执行汇报【是获取最新的一次执行汇报】（可搜索）
export function getAllHuibaoForDoc(params) {
  return request({
    url: '/report/manage/allForDoctor',
    method: 'get',
    params
  })
}

// 根据汇报的id返回具体的信息
export function getHuibaoById(params) {
  return request({
    url: '/report/manage/getById',
    method: 'get',
    params
  })
}

// 删除执行汇报
export function deleteHuibao(params) {
  return request({
    url: '/report/manage/delete',
    method: 'get',
    params
  })
}
