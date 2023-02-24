import Vue from 'vue'
import Router from 'vue-router'
import Antd from 'ant-design-vue'
import {
  isDevelopment
} from '@/util/util.js'

Vue.use(Router)
const router = new Router({
  base: process.env.BASE_URL,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  // Antd.LoadingBar.start()
  if (isDevelopment() || to.meta.login !== 1) {
    next()
  } else if (router.app.$options.store.state.user.userInfo.id) {
    next()
  } else {
    // Antd.LoadingBar.finish()
    Antd.Message.warning('用户没有登录！')
    if (router.app.$config.loginRouteName) {
      router.push({
        name: router.app.$config.loginRouteName
      })
    } else {
      router.push({
        name: from.name
      })
    }
  }
})

router.afterEach((to, from) => {
  // ViewUI.LoadingBar.finish()
  // 设置浏览器title
  window.document.title = router.app.$config.appName + (!to.meta.title ? '' : '-' + to.meta.title)
  // window.scrollTo(0, 0)
})

export default router
