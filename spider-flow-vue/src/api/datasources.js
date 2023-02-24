import request from '@/util/request.js'

export const listRequest = (params, succFun, errFun) => {
  request.send('datasource/list', params, succFun, errFun)
}

export const deleteRequest = (id, succFun, errFun) => {
  request.send('datasource/delete', {
    id
  }, succFun, errFun)
}

export const detailRequest = (id, succFun, errFun) => {
  request.send('datasource/get', {
    id
  }, succFun, errFun)
}

export const saveRequest = (params, succFun, errFun) => {
  delete params.createDate
  request.send('datasource/save', params, succFun, errFun)
}

export const testRequest = (params, succFun, errFun) => {
  delete params.createDate
  request.send('datasource/test', params, succFun, errFun)
}

export const allRequest = (succFun, errFun) => {
  request.send('datasource/all', null, succFun, errFun)
}
