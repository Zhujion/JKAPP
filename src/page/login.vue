<template>
  <el-form label-position="left" :rules="rul" :model="userForm" ref="userForm" label-width="0px"  class=" login-container demo-ruleForm">
    <h3 class="title">接口平台</h3>
    <el-form-item prop="User">
      <el-input type="text" v-model="userForm.User" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="Password">
      <el-input type="password" v-model="userForm.Password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox checked  v-model="checked" class="el-checkbox remember">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%"  @click.native.prevent="submitLogin('userForm')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as mUtils from '../utils/mUtils'
import {mapActions, mapGetters} from 'vuex' // vuex 的 state 与 vue 的data  进行交互
export default {
  name: 'login',
  data () {
    return {
      // 验证方式
      rul: {
        User: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        Password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      userForm: {// 定义用户字段
        User: 'admin',
        Password: '123456'
      },
      checked: true
    }
  },
  methods: {
    ...mapActions(['addMenu', 'loadRoutes']),
    // 登录操作
    submitLogin (userForm) {
      this.saveUserInfo() // 存入缓存 ,用户展示用户名
      console.log('保存用户通过')
      this.generateMenuPushIndex() // 模拟动态生成菜单并定位到index
      console.log('动态生成通过')
      this.$store.dispatch('initLeftMenu') // 设置菜单始终为展开状态
      console.log('菜单展开动态')
      // this.$refs[userForm].validate((valid) => {
      //   // this.$router.push({path: '/Home'})
      //   if (valid) {
      //     // 定义要传输的josn字段
      //     let loginParams = { User: this.userForm.User, Password: this.userForm.Password }
      //     // 接口调用
      //     this.$api.userAPI.login(loginParams).then(res => {
      //       let {Retcode, Reason} = res
      //       if (Retcode !== 1) {
      //         this.$message({
      //           type: 'error',
      //           message: Reason
      //         })
      //       } else {
      //         // 登录成功
      //         this.saveUserInfo() // 存入缓存 ,用户展示用户名
      //         this.generateMenuPushIndex() // 模拟动态生成菜单并定位到index
      //         this.$store.dispatch('initLeftMenu') // 设置菜单始终为展开状态
      //       }
      //     })
      //   }
      // })
    },
    // 动态生成菜单
    generateMenuPushIndex () {
      const menData = [
        {
          path: '/index',
          name: '首页',
          component: 'index',
          icon: 'icon-home',
          noDropdown: false,
          children: [
            {
              path: '/index',
              name: '首页',
              component: 'index'
            }
          ]
        },
        {
          path: '/userpage/userme',
          name: '用户列表',
          component: 'userpage/userme',
          icon: 'icon-users',
          noDropdown: false,
          children: [
            {
              path: '/404',
              name: '404',
              component: '404'
            },
            {
              path: '/userpage/userme',
              name: '用户列表',
              component: 'userpage/userme'
            },
            {
              path: '/userme',
              name: '用户列表',
              component: 'userme'
            }
          ]
        }
      ]
      mUtils.setStore('menuData', menData) // 将菜单放入缓存
      console.log('menuData缓存的菜单信息', JSON.parse(localStorage.getItem('menuData')))
      this.addMenu(menData) // 生成菜单,将菜单放入store
      console.log('isLoadRoutes', !this.isLoadRoutes)
      if (!this.isLoadRoutes) { // 首次进来为false,改变其状态为true
        const routes = mUtils.generateRoutesFromMenu(menData) // 根据菜单生成路由信息，需要将数据库返回对象的 Key值小写
        console.log('嵌套路由======', JSON.stringify(routes))
        const asyncRouterMap = [
          {
            path: '/404',
            name: '404',
            hidden: true,
            component: (resolve) => require(['page/404.vue'], resolve)
          },
          { // require.ensure([], (require) => {resolve(require('@/page/home.vue'))}
            path: '/index',
            name: '',
            hidden: true,
            component: (resolve) => require(['layout/home.vue'], resolve),
            redirect: '/index', // 重定向
            children: routes // 嵌套路由
          }
        ]
        console.log('打印路由', JSON.stringify(asyncRouterMap))
        this.$router.addRoutes(asyncRouterMap) // 添加路由
        this.loadRoutes() // true 第二次就不用路由了
      }
      this.$router.push('/index') // 加载模块
      this.$message({
        type: 'success',
        message: '登陆成功！'
      })
    },
    // 保存用户信息
    saveUserInfo () {
      const userinfo = {
        User: this.userForm.User
      }
      mUtils.setStore('userInfo', userinfo) // 将用户信息放入缓存
    }
  },
  watch: {
    adminfo: function (newvalue) {
      if (newvalue.id) {
        this.$message({
          type: 'success',
          messge: '检测您之前登陆过，将自动登陆'
        })
        this.$router.push('index')
      }
    }
  },
  mounted () {
    // 初始化
  },
  // 计算属性
  computed: {
    // 这里的...是对象扩展符
    ...mapGetters(['menuitems', 'isLoadRoutes'])
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
    float: left;
    height: 50%;
  }
</style>
