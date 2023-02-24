import axios from 'axios'
import config from '@/config'
import {
  message
} from 'ant-design-vue'
import {
  isDevelopment
} from '@/util/util'

// 获取初始化axios配置
let requestConfig = config.requestConfig
requestConfig.defaultConfig.baseURL = isDevelopment() ? requestConfig.defaultConfig.devBaseURL : requestConfig.defaultConfig.baseURL

/**
 * @description 自定义一个网络请求类，并封装了axios
 */
class HttpRequest {
  // 初始化加载的axios配置
  _requestConfig = {}
  // 初始化过后的axios对象
  _axios = null
  // 请求后缀，例如:https://127.0.0.1/test.do
  _suffix = ''
  constructor(__requestConfig) {
    this._requestConfig = __requestConfig
    this._axios = axios.create(__requestConfig.defaultConfig)
    this._suffix = __requestConfig.suffix || ''
    this.addInterceptors()
  }

  // 添加拦截器
  addInterceptors() {
    // http request 拦截器
    this._axios.interceptors.request.use(
      config => {
        // LoadingBar.start()
        return config
      },
      error => {
        // LoadingBar.error()
        console.error(error)
        return error
      })

    // http response 拦截器
    this._axios.interceptors.response.use(
      response => {
        // LoadingBar.finish()
        return response
      },
      error => {
        // LoadingBar.error()
        if (error.message === 'Network Error') {
          message.error(this._requestConfig.networkErrorMsg)
        } else if (error.message.indexOf('timeout of') !== -1) {
          message.error(this._requestConfig.timeoutMsg)
        }
        throw error // 返回接口返回的错误信息
      })
  }

  // 返回初始化过后的axios
  getAxios() {
    return this._axios
  }

  // 成功回调处理
  _successCallbackFun(response, successCallback, errorCallback) {
    if (typeof successCallback === 'function') {
      if (!this._requestConfig.successConditions.field) {
        successCallback(response.data, response)
      } else {
        if (response.data[this._requestConfig.successConditions.field] === this._requestConfig.successConditions.value) {
          successCallback(response.data, response)
        } else if (typeof errorCallback === 'function') {
          errorCallback(response.data, response)
        } else if (this._requestConfig.msgTipField && response.data[this._requestConfig.msgTipField]) {
          message.error(response.data[this._requestConfig.msgTipField])
        }
      }
    }
  }

  // 错误回调处理
  _errorCallbackFun(error, errorCallback) {
    console.error(error)
    if (typeof errorCallback === 'function') {
      if (this._requestConfig.msgTipField && error.response.data[this._requestConfig.msgTipField]) {
        message.error(error.response.data[this._requestConfig.msgTipField])
      } else {
        message.error(error.message)
      }
      errorCallback(error.response.data, error.response, error)
    }
  }

  // 使用系统默认配置的mothod发送请求
  send(url, params, successCallback, errorCallback, config) {
    config = config || {}
    config.url = url + this._suffix
    if (this._requestConfig.defaultConfig.method === 'post') {
      config.data = params
    } else {
      config.params = params
    }
    this._axios.request(config).then((response) => {
      this._successCallbackFun(response, successCallback, errorCallback)
    }).catch((error) => {
      this._errorCallbackFun(error, errorCallback)
    })
  }

  // 发送post请求
  post(url, params, successCallback, errorCallback) {
    this._axios.post(url + this._suffix, params).then((response) => {
      this._successCallbackFun(response, successCallback, errorCallback)
    }).catch((error) => {
      this._errorCallbackFun(error, errorCallback)
    })
  }

  // 发送get请求
  get(url, params, successCallback, errorCallback) {
    this._axios.get(url + this._suffix, {
      params: params
    }).then((response) => {
      this._successCallbackFun(response, successCallback, errorCallback)
    }).catch((error) => {
      this._errorCallbackFun(error, errorCallback)
    })
  }
}

export default new HttpRequest(requestConfig)
