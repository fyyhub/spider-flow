import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import router from '@/router'
import routes from '@/router/routes.js'
import {
  addImport
} from '@/util/routerUtil'

Vue.use(Vuex)
// 添加默认路由
let defaultRoutes = addImport(routes)
router.addRoutes(defaultRoutes)

export default new Vuex.Store({
  state: {
    // 路由配置
    routesConfig: defaultRoutes
  },
  mutations: {
    // 修改state变量的值
    setState(state, obj) {
      state[obj.key] = obj.val
    },
    // 动态添加路由
    setRoutesConfig(state, _routes) {
      _routes = addImport(_routes)
      state.routesConfig = state.routesConfig.concat(_routes)
      router.addRoutes(_routes)
    }
  },
  actions: {
    //
  },
  modules: {
    user
  }
})
