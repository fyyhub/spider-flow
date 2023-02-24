const defaultUserInfo = {
  'id': '',
  'status': 'using',
  'createDate': null,
  'updateDate': null,
  'note': null,
  'nickname': '未登录',
  'headimg': null,
  'signature': null,
  'info': null,
  'sex': null,
  'birthday': null,
  'job': null,
  'addr': null
}
const sessionUserInfoKey = 'sessionUserInfo'
let sessionUserInfo = null
try {
  sessionUserInfo = JSON.parse(sessionStorage.getItem(sessionUserInfoKey))
} catch (error) {
  console.error('从sessionUserInfo获取用户失败')
  console.error(error)
}
export default {
  state: {
    /**
     * @description 用户信息
     */
    userInfo: sessionUserInfo || defaultUserInfo
  },
  getters: {
    /**
     * @description 是否登录用户
     */
    isLoginUser: state => !!state.userInfo.id
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      sessionStorage.setItem(sessionUserInfoKey, JSON.stringify(userInfo))
    },
    initUserInfo(state, vue) {
      state.userInfo = defaultUserInfo
      sessionStorage.removeItem(sessionUserInfoKey)
      vue.$router.push({
        name: vue.$config.loginRouteName
      })
    },
    isLogin(state) {
      return state => !!state.userInfo.id
    }
  }
}
