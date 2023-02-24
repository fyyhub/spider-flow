import request from '@/util/request.js'

export const listRequest = (params, succFun, errFun) => {
  request.send('variable/list', params, succFun, errFun)
}

export const deleteRequest = (id, succFun, errFun) => {
  request.send('variable/delete', {
    id
  }, succFun, errFun)
}

export const detailRequest = (id, succFun, errFun) => {
  request.send('variable/get', {
    id
  }, succFun, errFun)
}

export const saveRequest = (params, succFun, errFun) => {
  delete params.createDate
  request.send('variable/save', params, succFun, errFun)
}
