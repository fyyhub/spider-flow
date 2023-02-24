import Qs from 'qs'

/**
 * @description 对发送请求的参数进行格式化
 * @param {*} params 需要转换的参数
 */
export const qsStringify = (params) => {
  // 在请求之前对data传参进行格式转换
  return Qs.stringify(params, {
    // a:[1,2] => a=1&a=2
    arrayFormat: 'repeat',
    // a[b]:1 => a.b=1
    allowDots: true
  })
}
/**
 * @description 是否开发者模式
 */
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development'
}
