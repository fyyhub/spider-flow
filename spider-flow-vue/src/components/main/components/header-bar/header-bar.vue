<template>
  <div class="header-bar">
    <div class="header-bar-left">
      <a-icon
        :style="{margin: '0 20px'}"
        :type="rotateIcon"
        @click.native="collapsedSider"
        size="24"
      ></a-icon>
    </div>
    <div class="header-bar-left">
      <custom-bread-crumb :list="$route.matched"></custom-bread-crumb>
    </div>
    <div class="header-bar-right">
      <user></user>
    </div>
  </div>
</template>
<script>
import CustomBreadCrumb from './custom-bread-crumb.vue'
import User from './user.vue'
export default {
  components: {
    CustomBreadCrumb,
    User
  },
  props: {
    // 是否展开
    isCollapsed: Boolean
  },
  computed: {
    rotateIcon() {
      return this.isCollapsed ? 'menu-unfold' : 'menu-fold'
    }
  },
  methods: {
    collapsedSider() {
      this.$emit('on-collapsed-sider')
    }
  }
}
</script>
<style lang="less">
.main {
  .header-bar {
    width: 100%;
    height: 100%;
    position: relative;
    padding-right: 10px;
    background-color: #1890ff;
    color: #ffffff;
  }
  .header-bar-left {
    display: inline-flex;
  }
  .header-bar-right {
    float: right;
    height: auto;
    & > * {
      float: right;
    }
  }
}
</style>
