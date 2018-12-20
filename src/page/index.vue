<template>
  <div>
    <section class="data_section">
      <el-row :gutter="10" >
        <el-card shadow="always" class="el_card">
          <el-col :xs="8"  :sm="6" :md="6" :lg="6" :xl="6"><div class="pay data_list"><p class="list_number">{{userForm.loginDate}}</p>上次登录（时间）</div></el-col>
          <el-col :xs="8" :sm="6" :md="6" :lg="6" :xl="6"><div class="income data_list"><p class="list_number">{{userForm.loginIP}}</p>登录地址（IP）</div></el-col>
          <el-col :xs="6"  :sm="6" :md="4" :lg="4" :xl="4"><div class="pay data_list"><p class="list_number">{{userConutForm.userAllConut}}</p>用户（人）</div></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><div class="income data_list"><p class="list_number">{{userConutForm.userAdminConut}}</p>管理员（人）</div></el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4"><div class="hidden_investors data_list" ><p class="list_number">{{userConutForm.userConut}}</p>普通用户（人）</div></el-col>
        </el-card>
      </el-row>
      <el-row :gutter="10" class="row_list">
        <el-col :span="12">
          <bardata  id="bar_data"></bardata>
        </el-col>
        <el-col :span="12">
          <userTable id="cerate_id"></userTable>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import bardata from './echarts/bardata'
import userTable from './echarts/userTable'
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
        loginIP: '192.168.5.178',
        loginDate: '2018-12-15 12：23：23'
      },
      // 表格  查询
      bar_id: 'bar_data',
      // 表格 创建
      cerate_id: 'cerate_id'
    }
  },
  components: {
    bardata,
    userTable
  },
  beforeDestroy () {
    if (!this.bar_id || !this.cerate_id) {
      return
    }
    this.bar_chart.dispose()
    this.line_chart.dispose()
    this.bar_chart = null
    this.line_chart = null
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
