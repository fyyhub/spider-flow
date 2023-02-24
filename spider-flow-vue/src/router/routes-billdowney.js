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
export default [
  {
    path: '/_home',
    name: '_home',
    component: () => import('@/components/main'),
    meta: {
      title: '_首页',
      icon: 'home',
      hideInBread: 1,
      hideInMenu: 1
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
          title: '首页',
          icon: 'home',
          hideInBread: 1,
          login: 1
        }
      }
    ]
  },
  {
    path: '/user_login',
    name: 'user_login',
    component: () => import('@/views/user/user-login.vue'),
    meta: {
      title: '用户登录',
      hideInBread: 1,
      hideInMenu: 1
    }
  },
  {
    path: '/_spider_list',
    name: '_spider_list',
    component: () => import('@/components/main'),
    meta: {
      title: '_爬虫列表',
      icon: 'container',
      hideInBread: 1
    },
    children: [
      {
        path: '/spider_list',
        name: 'spider_list',
        component: () => import('@/views/spider/list.vue'),
        meta: {
          title: '爬虫列表',
          icon: 'container',
          login: 1
        }
      },
      {
        path: '/spider_detail/:flowId',
        name: 'spider_detail',
        component: () => import('@/views/spider/detail.vue'),
        meta: {
          title: '爬虫详情-编辑',
          icon: 'container',
          login: 1,
          hideInMenu: 1
        }
      },
      {
        path: '/spider_detail',
        name: 'spider_detail_add',
        component: () => import('@/views/spider/detail.vue'),
        meta: {
          title: '爬虫详情-新增',
          icon: 'container',
          login: 1,
          hideInMenu: 1
        }
      },
      {
        path: '/task_list/:flowId',
        name: 'task_list',
        component: () => import('@/views/spider/taskList.vue'),
        meta: {
          title: '任务详情',
          icon: 'container',
          login: 1,
          hideInMenu: 1
        }
      }
    ]
  },
  {
    path: '/_variables_list',
    name: '_variables_list',
    component: () => import('@/components/main'),
    meta: {
      title: '_全局变量',
      icon: 'tablet',
      hideInBread: 1
    },
    children: [
      {
        path: '/variables_list',
        name: 'variables_list',
        component: () => import('@/views/variables/list.vue'),
        meta: {
          title: '全局变量',
          icon: 'tablet',
          login: 1
        }
      }
    ]
  },
  {
    path: '/_functions_list',
    name: '_functions_list',
    component: () => import('@/components/main'),
    meta: {
      title: '_自定义函数',
      icon: 'play-square',
      hideInBread: 1
    },
    children: [
      {
        path: '/functions_list',
        name: 'functions_list',
        component: () => import('@/views/functions/list.vue'),
        meta: {
          title: '自定义函数',
          icon: 'play-square',
          login: 1
        }
      },
      {
        path: '/functions_detail/:id',
        name: 'functions_detail',
        component: () => import('@/views/functions/detail.vue'),
        meta: {
          title: '自定义函数详情页',
          login: 1,
          icon: 'database',
          hideInMenu: 1
        }
      }
    ]
  },
  {
    path: '/_datasources_list',
    name: '_datasources_list',
    component: () => import('@/components/main'),
    meta: {
      title: '_数据源管理',
      icon: 'database',
      hideInBread: 1
    },
    children: [
      {
        path: '/datasources_list',
        name: 'datasources_list',
        component: () => import('@/views/datasources/list.vue'),
        meta: {
          title: '数据源管理',
          icon: 'database',
          login: 1
        }
      }
    ]
  },
  {
    path: '/_scripts',
    name: '_scripts',
    component: () => import('@/components/main'),
    meta: {
      title: '_脚本管理',
      icon: 'laptop',
      hideInBread: 1
    },
    children: [
      {
        path: '/scripts',
        name: 'scripts',
        component: () => import('@/views/scripts/index.vue'),
        meta: {
          title: '脚本管理',
          icon: 'laptop',
          login: 1
        }
      }
    ]
  }
]
