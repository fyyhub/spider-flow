<template>
  <div class="custom-bread-crumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-if="homeRoute">
        <router-link :to="{name: homeRoute.name}">
          <i :class="homeRoute.meta.icon"></i>
          <span>{{homeRoute.meta.title}}</span>
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item :key="`bread-crumb-${item.name}`" v-for="item in breadCrumbList">
        <router-link :to="{name: item.name}">
          <i :class="item.meta.icon"></i>
          <span>{{item.meta.title}}</span>
        </router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
import { getHomeRoute } from '@/util/routerUtil.js'

export default {
  name: 'CustomBreadCrumb',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // 面包屑展示的路由列表
    breadCrumbList() {
      return this.list.filter(item => item.meta && item.meta.hideInBread !== 1)
    },
    // 首页路由，默认展示
    homeRoute() {
      return getHomeRoute(
        this.$store.state.routesConfig,
        this.$config.homeRouteName
      )
    }
  }
}
</script>
<style lang="less">
.custom-bread-crumb {
  display: inline-block;
  vertical-align: top;

  span {
    color: #ffffff;
  }
}
</style>
