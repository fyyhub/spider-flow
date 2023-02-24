<template>
  <a-layout class="side-menu-wrapper">
    <a-layout-header class="header">
      <h1>{{appName}}</h1>
    </a-layout-header>
    <a-layout-content class="content">
      <!-- 组装菜单 -->
      <side-menu-item :isCollapsed="isCollapsed" :menu-list="menuList"></side-menu-item>
    </a-layout-content>
  </a-layout>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'

export default {
  name: 'SideMenu',
  components: {
    SideMenuItem
  },
  props: {
    // 需要展示的菜单
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否展开
    isCollapsed: Boolean
  },
  computed: {
    appName() {
      return this.$config.appName
    },
    activeName() {
      return this.$route.name
    },
    openNames() {
      let openNames = []
      for (let i = 0; i < this.$route.matched.length; i++) {
        openNames.push(this.$route.matched[i].name)
      }
      return openNames
    }
  }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>
