/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  icon: (null) 该页面在左侧菜单、面包屑和标签导航处显示的图标
 *  desc: (null) 当前页面的描述
 *  hideInBread: (0) 设为1后此级路由将不会出现在面包屑中
 *  hideInMenu: (0) 设为1后在左侧菜单不会显示该页面选项
 *  notCache: (0) 设为1后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  login: (0) 设为1后该页面需要登录才能访问
 * }
 */
export default [{
  path: '*',
  name: '_default',
  meta: {
    title: '缺省页面',
    desc: '当匹配的路由找不到路径的时候默认跳转的页面',
    hideInMenu: 1
  },
  redirect: '/404'
}, {
  path: '/404',
  name: '404',
  meta: {
    title: '404',
    icon: 'ivu-icon ivu-icon-md-bug',
    desc: '404错误页面',
    hideInMenu: 1
  },
  component: () => import('@/views/error/404.vue')
}]
