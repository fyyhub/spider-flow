import request from '@/util/request.js'

export const listRequest = (params, succFun, errFun) => {
  request.send('function/list', params, succFun, errFun)
}

export const deleteRequest = (id, succFun, errFun) => {
  request.send('function/remove', {
    id
  }, succFun, errFun)
}

export const detailRequest = (id, succFun, errFun) => {
  request.send('function/get', {
    id
  }, succFun, errFun)
}

export const saveRequest = (params, succFun, errFun) => {
  delete params.createDate
  request.send('function/save', params, succFun, errFun)
}
