import config from '@/config'
export default [{
  path: '/',
  name: '_init',
  meta: {
    title: '初始化重定向默认页',
    desc: '初始化访问重定向页面',
    hideInMenu: 1
  },
  redirect: config.defaultGoPage
}]
