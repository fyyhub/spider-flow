import {
  qsStringify
} from '@/util/util.js'

export default {
  /**
   * @description 系统名称
   */
  appName: 'spider-flow',
  /**
   * @description 默认跳转页面，name跳转
   */
  defaultGoPage: 'home',
  /**
   * @description 首页配置的名称
   */
  homeRouteName: 'home',
  /**
   * @description 用户登录配置的名称
   */
  loginRouteName: 'user_login',
  /**
   * @description 网络请求配置
   */
  requestConfig: {
    // 请求后缀，例如:https://127.0.0.1/test.do
    suffix: '',
    // 成功匹配表达式
    successConditions: {
      field: '',
      value: 10000
    },
    // 信息提示字段
    msgTipField: 'message',
    // 连接超时提示信息
    timeoutMsg: '网络连接超时',
    // 网络错误提示信息
    networkErrorMsg: '网络连接失败，请检查网络连接或者服务器已经挂掉了',
    // 默认网络配置
    defaultConfig: {
      // 请求路径，dev:开发环境
      baseURL: '',
      devBaseURL: '',
      // 默认请求方法
      method: 'post',
      // 请求超时时间（毫秒）
      timeout: 0,
      // 是否携带cookie信息
      withCredentials: true,
      // 响应格式,可选项 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType: 'json',
      // 自定义添加头部
      headers: {
        // ;charset=UTF-8
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // `transformRequest` 允许在向服务器发送前，修改请求数据
      // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
      transformRequest: [function (data) {
        return qsStringify(data)
      }],
      paramsSerializer(params) {
        return qsStringify(params)
      }
    }
  },
  // 需要加载的路由，src目录下
  loadRoutes: [
    'router/routes-default.js'
  ],
  /**
   * @description 开发模式配置，只会在开发模式去加载
   */
  development: {
    // 需要加载的路由，src目录下
    loadRoutes: [
      'router/routes-billdowney.js'
    ]
  }
}
