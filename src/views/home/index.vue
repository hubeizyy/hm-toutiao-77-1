<template>
  <el-container class="wrapper">
    <!--wrapper容器  要把它变为全屏容器  -->
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <!-- el-menu 导航菜单容器 -->
      <!-- default-active 默认激活的菜单项 值是菜单项的index属性值-->
      <el-menu
        router
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- el-submenu 有下一级菜单的菜单 -->
        <!-- el-menu-item没有子菜单 的菜单项 -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-menu"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggleMenu()" class="el-icon-s-fold"></span>
        <span class="text">江苏传智播客教育有限公司</span>
        <el-dropdown class="my-dropdown" @command="changeMenu">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- slot 属性vue提供的  插槽   elementUI提供的属性 disabled禁用 divided下划线-->
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>-->
            <el-dropdown-item command="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由的出口   视图 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventbus.js'
export default {
  data () {
    return {
      // isCollapse: true  原始为true 是折叠状态
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  // 获取用户信息
  created () {
    // 此处接收个人设置提交修改传过来的数据
    eventBus.$on('updateName', name => {
      this.name = name
    })
    // 更新头像
    eventBus.$on('updatePhoto', photo => {
      this.photo = photo
    })
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    //   切换侧边栏展开与收起。默认展开
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    // setting () {
    //   this.$router.push('/setting')
    // },
    // logout () {
    //   store.clearUser()
    //   this.$router.push({ name: 'login' })
    // },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.clearUser()
      this.$router.push({ name: 'login' })
    },

    changeMenu (menuType) {
      // menuType 是变量  值是setting  logout
      this[menuType]()
    }
  }
}
</script>

<style scoped lang="less" >
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .text {
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: 700;
        img {
          width: 30px;
          height: auto;
          vertical-align: middle;
        }
      }
    }
  }
}
.logo {
  width: 100%;
  height: 60px;
  background: #002244 url(../../assets/images/logo_admin.png) no-repeat
    center/140px auto;
}
// 小图的样式会覆盖大图的样式
.miniLogo {
  background-image: url(../../assets/images/logo_admin_01.png);
  background-size: 32px auto;
}
.el-menu {
  border-right: none;
}
</style>
