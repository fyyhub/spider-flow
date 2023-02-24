import request from '@/util/request.js'

const suffix = 'script/'
// 脚本列表
export const listRequest = (succFun, errFun) => {
  request.send(suffix + 'list', null, succFun, errFun)
}
// 脚本内文件列表
export const filesRequest = (script, succFun, errFun) => {
  request.send(suffix + 'files', {
    script
  }, succFun, errFun)
}
// 删除文件或文件夹
export const removeFileRequest = (params, succFun, errFun) => {
  request.send(suffix + 'remove/file', params, succFun, errFun)
}
// 创建脚本
export const createRequest = (scriptName, succFun, errFun) => {
  request.send(suffix + 'create', {
    scriptName
  }, succFun, errFun)
}
// 重命名文件或文件夹
export const renameFileRequest = (params, succFun, errFun) => {
  request.send(suffix + 'rename/file', params, succFun, errFun)
}
// 创建文件或文件夹
export const createFileRequest = (params, succFun, errFun) => {
  request.send(suffix + 'create/file', params, succFun, errFun)
}
// 获取文件内容
export const readRequest = (params, succFun, errFun) => {
  request.send(suffix + 'read', params, succFun, errFun)
}
// 保存文件内容
export const saveRequest = (params, succFun, errFun) => {
  request.send(suffix + 'save', params, succFun, errFun)
}
// 测试脚本
export const testRequest = (params, succFun, errFun) => {
  request.send(suffix + 'test', params, succFun, errFun)
}
