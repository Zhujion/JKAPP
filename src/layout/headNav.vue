<template>
<header class="head-nav" id="header_container">
  <el-row style="margin: 0 10px">
    <el-col :span="6" class="logo-container">
      <img src="../img/hong.png" class="logo" alt=""/>
      <span class="title">接口平台信息化管理系统</span>
    </el-col>
    <div class="userinfo">
      <img src="../img/head.jpg" class="avatar" alt=""/>
      <div class="welcome">
        <p class="name comename">欢迎</p>
        <p class="name avatarname">{{userinfo.User}}</p>
      </div>
      <span class="username">
        <!--trigger指定事件类型-->
        <el-dropdown trigger="click" @command="setDialogInfo">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">修改信息</el-dropdown-item>
            <el-dropdown-item command="pass">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <i class="fa fa-sign-out logout" @click="logout"></i>
    </div>
    <model v-show="isModelVisible" @close="closeModel"></model>
    <uptpwd v-show="isPwdVisible" @close="closePwd"></uptpwd>
    <userIndex v-show="isuserIndexVisble"  @close="closeUser">></userIndex>
    <!--工作台-->
    <!--<div class="notify-row">-->
      <!--<el-menu-->
        <!--:default-active="activeIndex2"-->
        <!--class="el-menu-demo"-->
        <!--mode="horizontal"-->
        <!--@select="handleSelect"-->
        <!--background-color="#64BEA5"-->
        <!--text-color="#fff"-->
        <!--active-text-color="#ffd04b">-->
        <!--<el-menu-item index="1">处理中心</el-menu-item>-->
        <!--<el-submenu index="2">-->
          <!--<template slot="title">我的工作台</template>-->
          <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
          <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
          <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
          <!--<el-submenu index="2-4">-->
            <!--<template slot="title">选项4</template>-->
            <!--<el-menu-item index="2-4-1">选项1</el-menu-item>-->
            <!--<el-menu-item index="2-4-2">选项2</el-menu-item>-->
            <!--<el-menu-item index="2-4-3">选项3</el-menu-item>-->
          <!--</el-submenu>-->
        <!--</el-submenu>-->
        <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->
        <!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank" style="text-decoration: none">订单管理</a></el-menu-item>-->
      <!--</el-menu>-->
    <!--</div>-->
  </el-row>
</header>
</template>

<script>
import * as mUtils from '@/utils/mUtils'
import model from '../components/Modal.vue'
import uptpwd from '../page/userpage/updatepwd.vue'
import userIndex from '../page/userpage/userIndex.vue'
export default {
  data () {
    return {
      userinfo: {
        User: ''
      },
      isModelVisible: false,
      isPwdVisible: false,
      isUserVisble: false,
      isuserIndexVisble: false
    }
  },
  components: {
    model,
    uptpwd,
    userIndex
  },
  created () {
    this.userinfo = mUtils.getStore('userInfo')
  },
  methods: {
    logout () {
      this.$router.push('/')
    },
    showInfoList () {
      this.$router.push('/userInfo/user_me')
    },
    closeModel: function () {
      this.isModelVisible = false
    },
    closePwd: function () {
      this.isPwdVisible = false
    },
    closeUser: function () {
      this.isuserIndexVisble = false
    },
    /**
     * 弹出框-修改密码或者系统设置
     * @param {string} cmditem 弹框类型
     */
    setDialogInfo (cmditem) {
      if (!cmditem) {
        this.$message({
          type: 'error',
          message: '菜单选项缺少command属性'
        })
      }
      switch (cmditem) {
        case 'info':
          this.isuserIndexVisble = true
          break
        case 'pass':
          this.isPwdVisible = true
          console.log('进来了')
          break
        case 'logont':
          this.logout()
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
  .logo-container {
    line-height: 60px;
    min-width: 400px;
  .logo {
    height: 50px;
    width: 50px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title{
    vertical-align: middle;
    font-size: 22px;
    font-family: cursive;
    letter-spacing: 3px;
  }
  }
  .fa-user {
    position: relative;
    top: -2px;
    margin-right: 4px;
  }
  .head-nav {
    width: 100%;
    height: 60px;
    min-width:600px;
    padding: 5px;
    // background: url('../img/head.jpg');
    background-color: rgb(100,190,165);
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    color: #FFF;
  .logout {
    vertical-align: middle;
    cursor: pointer;
  }
  }
  .userinfo {
    line-height: 60px;
    text-align:right;
    float:right;
  }
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }
  .welcome{
    display: inline-block;
    width:auto;
    vertical-align: middle;
    padding: 0 5px;
  .name{
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .comename{
    font-size: 12px;
  }
  .avatarname{
    color:#a9d86e;
    font-weight:bolder;
  }
  }

  .username {
    cursor: pointer;
    margin-right: 5px;
  .el-dropdown {
    color: #FFF;
  }
  }

  .border{
    border:1px solid;
  }
  .notify-row{
    line-height:60px;
    float: right;
    margin-right: 20px;
    margin-top: 5px;
  }
  ul.top-menu > li {
    float: left;
    margin-right: 20px;
  }
  ul.top-menu > li > a {
    color:#3bc5ff;
    font-size: 16px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    border: 1px solid #f0f0f8 !important;
    padding: 2px 6px 4px 6px;
  }
</style>
