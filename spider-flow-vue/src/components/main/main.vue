<template>
  <a-layout class="main">
    <a-layout-sider class="side-menu" ref="mainSider" v-model="isCollapsed">
      <side-menu :active-name="$route.name" :is-collapsed="isCollapsed" :menu-list="menuList"></side-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header-con">
        <header-bar :is-collapsed="isCollapsed" @on-collapsed-sider="collapsedSider"></header-bar>
      </a-layout-header>
      <a-layout-content class="main-content">
        <div style="height:100%;">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'

export default {
  components: {
    SideMenu,
    HeaderBar
  },
  data() {
    return {
      // 是否展开侧边栏
      isCollapsed: false
    }
  },
  computed: {
    // 导航菜单列表
    menuList() {
      return this.$store.state.routesConfig
    }
  },
  methods: {
    // 展开侧边栏
    collapsedSider() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style lang="less">
.main {
  height: 100%;

  .side-menu {
    user-select: none;
    overflow: hidden;
    width: 200px;
    background: #fff;
  }

  .header-con {
    background: #fff;
    padding: 0;
  }

  .main-content {
    height: 100%;
    overflow-y: auto;

    & > * {
      height: 100%;
    }
  }
}
</style>
