import request from '@/util/request.js'

const suffix = 'flowNotice/'
// 查询通知方式列表
export const getNoticeWayRequest = (succFun, errFun) => {
  request.send(suffix + 'getNoticeWay', null, succFun, errFun)
}
// 查询流程通知详情
export const findRequest = (id, succFun, errFun) => {
  request.send(suffix + 'find', {
    id
  }, succFun, errFun)
}
// 保存流程通知
export const saveRequest = (params, succFun, errFun) => {
  request.send(suffix + 'save', params, succFun, errFun)
}
