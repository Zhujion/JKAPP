<template>
  <div class="login_page">
    <el-form label-position="left" :rules="rul" :model="userForm" ref="userForm"
             label-width="0px"  class=" login-container demo-ruleForm">
      <h3 class="title">接口平台后台管理系统</h3>
      <el-form-item prop="User">
        <el-input type="text" v-model="userForm.User"   auto-complete="off" prefix-icon="icon-user" class="input_color" placeholder="用户名" ></el-input>
      </el-form-item>
      <el-form-item prop="Password">
        <el-input type="password" v-model="userForm.Password"  auto-complete="off" prefix-icon="icon-key" input_color="input_color" placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <el-form-item>
        <!--验证码-->
      </el-form-item>
      <el-form-item>
        <el-checkbox    v-model="checked" class="">记住密码</el-checkbox >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" class="inputhigh"  @click.native.prevent="submitLogin('userForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as mUtils from '../utils/mUtils'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      // 验证码
      identifyCodes: '1234567890',
      identifyCode: '',
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
        User: '',
        Password: ''
      },
      checked: false,
      datamiao: 6, // 确认登录的秒
      t: '' // 控制自动关闭
    }
  },
  methods: {
    ...mapActions(['addMenu', 'loadRoutes']),
    // 登录操作
    submitLogin (userForm) {
      this.$refs[userForm].validate((valid) => {
        if (valid) {
          this.loginGo() // 登录方法
        }
      })
    },
    // 登录的方法
    loginGo () {
      // 定义要传输的josn字段
      let loginParams = { User: this.userForm.User, Password: this.userForm.Password }
      // 接口调用
      console.log('登录信息-------', loginParams)
      this.$api.userAPI.login(loginParams).then(res => {
        let {Retcode, Reason, Usertype, Time, UserIp} = res
        console.log('返回信息===', res)
        if (Retcode !== 1) {
          this.$message({
            type: 'error',
            message: Reason
          })
        } else {
          // 登录成功
          let menutype = {Usertype: Usertype}
          console.log('登录成功，用户类型', Usertype)
          this.$api.userAPI.menudata(menutype).then(res => {
            let {Retcode, Reason, Menues} = res
            console.log('获取菜单信息', Retcode)
            if (Retcode === 1) {
              mUtils.setCoockie(this.userForm.User, this.userForm.Password, 7) // 保存用户信息
              this.saveUserInfo(Usertype, Time, UserIp) // 存入缓存 ,用户展示用户名
              this.generateMenuPushIndex(Menues, Usertype, Time, UserIp) // 模拟动态生成菜单并定位到index
              this.$store.dispatch('initLeftMenu') // 设置菜单始终为展开状态
            } else { // 菜单错误
              this.$message.error(Reason)
            }
          })
        }
      })
    },
    // 动态生成菜单
    generateMenuPushIndex (menData, Usertype, Time, UserIp) {
      // const menData = [
      //   {
      //     path: '/index',
      //     name: '首页',
      //     component: 'index',
      //     icon: 'icon-home',
      //     noDropdown: true,
      //     children: [
      //       {
      //         path: '/index',
      //         name: '首页',
      //         component: 'index'
      //       }
      //     ]
      //   },
      //   {
      //     path: '/userpage/userme',
      //     name: '用户管理',
      //     component: 'content',
      //     icon: 'icon-users',
      //     noDropdown: false,
      //     children: [
      //       {
      //         path: '/userpage/userme',
      //         name: '用户信息',
      //         component: 'userpage/userme'
      //       },
      //       {
      //         path: '/userpage/userLog',
      //         name: '用户日志',
      //         component: 'userpage/userLog'
      //       }
      //     ]
      //   },
      //   {
      //     path: '/medica/medicaIndex',
      //     name: '信息管理',
      //     component: 'content',
      //     icon: 'icon-shield',
      //     noDropdown: false,
      //     children: [
      //       {
      //         path: '/medica/medicaIndex',
      //         name: '医疗机构',
      //         component: 'medica/medicaIndex'
      //       },
      //       {
      //         path: '/medica/queryDn',
      //         name: '信息搜索',
      //         component: 'medica/queryDn'
      //       },
      //       {
      //         path: '/medica/medicaLog',
      //         name: '操作日志',
      //         component: 'medica/medicaLog'
      //       }
      //     ]
      //   }
      // ]
      // const menData = menDataa
      // console.log('获取的菜单==', JSON.stringify(menData))
      mUtils.setStore('menuData', menData) // 将菜单放入缓存
      // console.log('menuData缓存的菜单信息', JSON.parse(localStorage.getItem('menuData')))
      this.addMenu(menData) // 生成菜单,将菜单放入store
      console.log('isLoadRoutes', !this.isLoadRoutes)
      if (!this.isLoadRoutes) { // 首次进来为false,改变其状态为true
        const routes = mUtils.generateRoutesFromMenu(menData) // 根据菜单生成路由信息，需要将数据库返回对象的 Key值小写
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
            // component: (resolve) => require(['page/medica/queryDn.vue'], resolve),
            redirect: '/index', // 重定向
            children: routes // 嵌套路由
          }
        ]
        this.$router.addRoutes(asyncRouterMap) // 添加路由
        this.loadRoutes() // true 第二次就不用路由了
      }
      console.log('用户类型===========', Usertype)
      if (Usertype === 1) {
        this.$router.push('/index') // 加载模块
      } else {
        this.$router.push('/medica/queryDn') // 加载模块
      }
      console.log('加载模块')
      this.$message({
        type: 'success',
        message: '登陆成功！上次登录时间： ' + Time + ' / IP：' + UserIp,
        duration: 5000
      })
    },
    // 保存用户信息
    saveUserInfo (UserType, Time, UserIp) {
      const userinfo = {
        User: this.userForm.User,
        Userpwd: this.userForm.Password,
        UserType: UserType,
        loginIP: UserIp,
        loginDate: Time,
        isSave: this.checked
      }
      console.log('用户要保存的信息=====', userinfo)
      mUtils.setStore('userInfo', userinfo) // 将用户信息放入缓存
    },
    // cookie 倒计时
    getmiao: function () {
      this.datamiao = this.datamiao - 1
      this.t = setTimeout(this.getmiao(), 1000)
    },
    // 读取cookie
    getCookie: function () {
      // 获取用户的coocki
      if (document.cookie.length > 0) {
        this.checked = true
        var arr = document.cookie.split(';')
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')
          if (arr2[0] === 'userName') {
            this.userForm.User = arr2[1] // 保存到保存数据的地方
          }
          if (arr2[0] === ' userPwd') {
            this.userForm.Password = arr2[1]
          }
        }
        // 判断 是否登录
        this.$confirm('检测到用户信息，是否登录！', '自动登录', {
          confirmButtonText: '确定登录(' + this.datamiao + ')S',
          cancelButtonText: '更换账号',
          type: 'warning'
        }).then(() => {
          if (this.userForm) {
            this.loginGo() // 登录的方法
          }
        }).catch(() => {
          let param = {Username: this.userForm.User}
          this.$api.userAPI.UserOut(param).then((res) => {
            let {Retcode, Reason} = res
            if (Retcode === 1) {
              this.$message({
                type: 'success',
                message: '用户登出成功,请输入新用户名和密码！'
              })
              this.$refs['userForm'].resetFields() // 清空表单
              mUtils.clearCookie() // 清除缓存
            } else {
              this.$message({
                type: 'info',
                message: Reason
              })
            }
          })
        })
      } else {
        // coocki 里面没有用户信息 从缓存里面读
        console.log('coocki 里面没有用户信息 从缓存里面读')
        let readUser = mUtils.getStore('userInfo')
        console.log('coocki 里面没有用户信息 从缓存里面读', readUser)
        if (readUser) {
          if (readUser.isSave) {
            // 如果用户勾选记住密码 赋值
            this.userForm.User = readUser.User
            this.userForm.Password = readUser.Userpwd
            this.checked = true
          }
        }
      }
    },
    // 清除cookie
    clearCookie: function () {
      mUtils.clearCookie() // 清除
    }
  },
  watch: {
  },
  mounted () {
    this.getCookie()
  },
  // 计算属性
  computed: {
    // 这里的...是对象扩展符
    ...mapGetters(['menuitems', 'isLoadRoutes'])
  }
}
</script>

<style lang="less" scoped>
  .login_page {
    background-repeat:no-repeat;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../img/bg1.jpg") no-repeat center center;
    background-size:cover;
    overflow:hidden;
    left:0;
    top: 0;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 1px;
    // background: #fff;
    // border: 1px solid #eaeaea;
    // box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #fff;
    font-size: 20px;
  }
  .remember {
    margin: 0px 0px 35px 0px;
    float: left;
    height: 50%;

  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: red !important;
  }
  input:-webkit-autofill
  {
    -webkit-box-shadow: 0 0 0 1000px white inset;  //使用足够大的纯色内阴影覆盖黄色背景
  }
</style>
