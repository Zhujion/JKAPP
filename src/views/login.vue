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
    submitLogin (userForm) {
      this.$refs[userForm].validate((valid) => {
        console.log('进来了')
        // this.$router.push({path: '/Home'})
        if (valid) {
          // 定义要传输的josn字段
          let loginParams = { User: this.userForm.User, Password: this.userForm.Password }
          console.log(loginParams)
          // 接口调用
          this.$api.user.login(loginParams).then(res => {
            console.log('ok')
            console.log('打印信息' + res)
            let { msg, code, user } = res
            if (code !== 200) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              sessionStorage.setItem('user', JSON.stringify(user)) // 登陆成功将当如 保存
              this.$router.push({path: '/idnex'})
            }
            console.log(res)
          })
        }
      })
    },
    // 动态生成菜单
    generateMenuPushIndex () {
      const menData = [
        {path: './home', name: '首页', components: 'home', children: [{path: '/home', name: '首页', components: 'home'}]
        }
      ]
      this.$mUtils.setStore('menuData', menData) // 将菜单放入缓存
    }
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
