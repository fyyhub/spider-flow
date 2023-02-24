import request from '@/util/request.js'

const suffix = 'task/'
// 查询任务日志列表
export const listRequest = (params, succFun, errFun) => {
  request.send(suffix + 'list', params, succFun, errFun)
}
// 删除任务日志
export const removeRequest = (id, succFun, errFun) => {
  request.send(suffix + 'remove', {
    id
  }, succFun, errFun)
}
