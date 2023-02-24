<template>
  <div class="user-avatar-dropdown">
    <a-dropdown @on-click="handleClick">
      <a-avatar :src="userInfo.headimg" size="large" v-if="userInfo.headimg"></a-avatar>
      <a-avatar size="large" v-else-if="userInfo.nickname">{{userInfo.nickname}}</a-avatar>
      <a-avatar icon="user" size="large" v-else></a-avatar>
      <a-icon :size="18" type="md-arrow-dropdown"></a-icon>
      <a-menu slot="overlay">
        <a-menu-item key="logout">退出登录</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { logout } from '@/api/user.js'
export default {
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    handleClick(name) {
      switch (name) {
        case 'logout':
          this.logout()
          break
      }
    },
    logout() {
      logout(
        data => {
          this.$store.commit('initUserInfo', this)
        },
        data => {
          this.$store.commit('initUserInfo', this)
        }
      )
    }
  }
}
</script>
<style lang="less">
.main {
  .header-bar-right {
    .user {
      &-avatar-dropdown {
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
