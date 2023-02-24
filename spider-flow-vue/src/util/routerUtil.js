// 自定义一个import方法
const _import = (src) => {
  // return () => import('@/' + src)
  return resolve => require(['@/' + src], resolve)
}
/**
 * @description 传入需要加入import的路由数组
 * @param {Array} routes
 */
export const addImport = (routes) => {
  if (routes && routes.length > 0) {
    routes = routes.map(item => {
      if (typeof item.component === 'string') {
        item.component = _import(item.component)
      }
      if (item.children && item.children.length > 0) {
        item.children = addImport(item.children)
      }
      return item
    })
  }
  return routes
}
/**
 * @description 获取首页路由
 * @param {Array} routesConfig 路由配置
 * @param {String} homeRouteName 首页路由名称，默认为home
 */
export const getHomeRoute = (routesConfig, homeRouteName = 'home') => {
  let homeRoute
  for (let i = 0; i < routesConfig.length; i++) {
    let item = routesConfig[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeRouteName)
      if (res.name) return res
    } else if (item.name === homeRouteName) {
      homeRoute = item
    }
  }
  return homeRoute
}
