<template>
  <a-menu
    :inline-collapsed="isCollapsed"
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    class="side-menu-item"
    mode="inline"
  >
    <template v-for="item in filterMenuList">
      <!-- 子菜单大于1 -->
      <a-sub-menu
        :key="itemKeyName+item.name"
        :name="item.name"
        @titleClick="handleTitleClick"
        v-if="item.children && item.children.length > 1"
      >
        <template slot="title">
          <router-link :to="{name: item.name}">
            <a-icon :type="item.meta.icon"></a-icon>
            <span class="item-title">{{item.meta.title}}</span>
          </router-link>
        </template>
        <template v-for="item1 in item.children">
          <a-menu-item :key="itemKeyName+item1.name" :name="item1.name" :to="{name:item1.name}">
            <router-link :to="{name: item1.name}">
              <a-icon :type="item1.meta.icon"></a-icon>
              <span class="item-title">{{item1.meta.title}}</span>
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>
      <!-- 子菜单等于1 -->
      <a-menu-item
        :key="itemKeyName+item.children[0].name"
        :name="item.children[0].name"
        :to="{name:item.children[0].name}"
        v-else-if="item.children && item.children.length === 1"
      >
        <router-link :to="{name: item.children[0].name}">
          <a-icon :type="item.children[0].meta.icon"></a-icon>
          <span class="item-title">{{item.children[0].meta.title}}</span>
        </router-link>
      </a-menu-item>
      <!-- 不存在子菜单 -->
      <a-menu-item :key="itemKeyName+item.name" :name="item.name" :to="{name:item.name}" v-else>
        <router-link :to="{name: item.name}">
          <a-icon :type="item.meta.icon"></a-icon>
          <span class="item-title">{{item.meta.title}}</span>
        </router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script>
export default {
  name: 'SideMenuItem',
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    filterMenuList() {
      function filterFun(list) {
        list.forEach(item => {
          if (item.children && item.children.length > 0) {
            item.children = filterFun(item.children)
          }
        })
        return list.filter(item => item.meta.hideInMenu !== 1)
      }
      return filterFun(this.menuList)
    }
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
      itemKeyName: 'a-menu-'
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.selectedKeys = []
        if (val.meta.hideInMenu !== 1) {
          this.selectedKeys.push(this.itemKeyName + val.name)
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    addOpenKeys() {
      this.openKeys = []
      this.selectedKeys.forEach(item => {
        this.openKeys = this.searchChildKey(
          this.menuList,
          item.replace(this.itemKeyName, '')
        )
      })
    },
    searchChildKey(list, name) {
      let keys = []
      list.forEach(item => {
        if (item.children && item.children.length > 1) {
          keys = this.searchChildKey(item.children, name)
          if (keys.length > 0) {
            keys.push(this.itemKeyName + item.name)
          }
        } else if (item.name === name) {
          keys.push(this.itemKeyName + item.name)
        }
      })
      return keys
    },
    handleTitleClick(item, key, keyPath) {
      if (this.openKeys.indexOf(item.key) === -1) {
        this.openKeys.push(item.key)
      } else {
        this.openKeys = this.openKeys.filter(item1 => item.key !== item1)
      }
    }
  },
  mounted() {
    this.selectedKeys.push(this.itemKeyName + this.$route.name)
    this.addOpenKeys()
  }
}
</script>
<style lang="less">
.side-menu-wrapper {
  .side-menu-item {
    .ivu-menu-submenu-title {
      i {
        margin-right: 6px;
      }
    }
    .item-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
