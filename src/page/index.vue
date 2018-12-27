<template>
  <div>
    <section class="data_section">
      <el-row :gutter="10" class="row_list">
        <queryDn></queryDn>
      </el-row>
    </section>
  </div>
</template>

<script>
import bardata from './echarts/bardata'
import userTable from './echarts/userTable'
import queryDn from './medica/queryDn'
export default {
  name: 'index',
  data () {
    return {
      // 全部用户 管理员 普通用户
      userConutForm: {
        userAllConut: '100',
        userAdminConut: '23',
        userConut: '77'
      },
      // 登录名 IP 登录时间
      userForm: {
        userName: 'admin',
        loginIP: '1111111111',
        loginDate: ''
      },
      // 表格  查询
      bar_id: 'bar_data',
      // 表格 创建
      cerate_id: 'cerate_id'
    }
  },
  components: {
    bardata,
    userTable,
    queryDn
  },
  beforeDestroy () {
  },
  methods: {
    userme () {
      console.log('获取的缓存信息++++++++++++', localStorage.getItem('userInfo'))
      let UserInfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log(UserInfo)
      this.userForm.userName = UserInfo.User
      this.userForm.loginIP = UserInfo.loginIP
      this.userForm.loginDate = UserInfo.loginDate
      // this.$message('上次登录时间：' + this.userForm.loginDate + ' 上次登录IP：' + this.userForm.loginIP)
    }
  },
  mounted () {
    this.userme()
  }
}
</script>

<style scoped lang="less">
  .data_section{
    padding:10px;
    .row_list{
      margin-bottom: 20px;
    }
    .pay{
      background-color:#18a689;
    }
    .income{
      background-color:#99CC00;
    }
    .hidden_investors{
      background-color:#33CC99;
    }
    .intention_investors{
      background-color:#3b5999;
    }
    .waitpending_investors{
      background-color:#66CC99;
    }
    .pending_investors{
      background-color:#009999;
    }
    .pass_investors{
      background-color:#FF9900;
    }
    .newadd_investors{
      background-color:#0099CC;
    }

    .data_list{
      text-align: center;
      font-size: 14px;
      border-radius: 6px;
      padding: 15px 0;
      color:#fff;
      .list_number{
        font-size:16px;
        font-weight:bold;
      }
      .number{
        font-size:16px;
        font-weight:bold;
      }

    }

  }
  .el_card {
    left: 0 ;
    top:0;
    width: 99%;
    margin: 0 auto;
  }
  .el_loginindex {
    text-align: center;
    font-size: 10px;
    color: #fff;
    padding: 4px 0;
    border-radius: 6px;
  }
</style>
