import request from '@/util/request.js'

const suffix = 'spider/'
// 查询爬虫列表
export const listRequest = (params, succFun, errFun) => {
  request.send(suffix + 'list', params, succFun, errFun)
}
// 启动/停止定时
export const startStopRequest = (isStart, id, succFun, errFun) => {
  request.send(
    suffix + (isStart ? 'start' : 'stop'),
    {
      id
    },
    succFun,
    errFun
  )
}
// 修改cron表达式
export const cronRequest = (params, succFun, errFun) => {
  request.send(suffix + 'cron', params, succFun, errFun)
}
// 删除爬虫
export const removeRequest = (id, succFun, errFun) => {
  request.send(
    suffix + 'remove',
    {
      id
    },
    succFun,
    errFun
  )
}
// 手动运行爬虫
export const runRequest = (id, succFun, errFun) => {
  request.send(
    suffix + 'run',
    {
      id
    },
    succFun,
    errFun
  )
}
// 下载日志文件
export const logDownloadRequest = (logId, taskId) => {
  window.open(suffix + 'log/download?id=' + logId + '&taskId=' + (taskId || ''))
}
// 查询除id外的其它流程
export const otherRequest = (id, succFun, errFun) => {
  request.send(
    suffix + 'other',
    {
      id
    },
    succFun,
    errFun
  )
}
// 获取流程的xml
export const xmlRequest = (id, succFun, errFun) => {
  request.send(
    suffix + 'xml',
    {
      id
    },
    succFun,
    errFun,
    { responseType: 'text' }
  )
}
// 保存流程内容
export const saveRequest = (params, succFun, errFun) => {
  params.name = params.name || '未定义名称'
  request.send(suffix + 'save', params, succFun, errFun, { responseType: 'text' })
}
// 查询id的历史记录
export const historyRequest = (id, succFun, errFun) => {
  request.send(
    suffix + 'history',
    {
      id
    },
    succFun,
    errFun
  )
}
// 根据id和时间戳来恢复历史记录
export const recoverHistoryRequest = (id, timestamp, succFun, errFun) => {
  request.send(
    suffix + 'history',
    {
      id,
      timestamp
    },
    succFun,
    errFun
  )
}
