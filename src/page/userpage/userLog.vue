<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item label="用户名/IP地址：">
          <el-input placeholder="请输入用户名或用户IP" v-model="userNameOrIP" style="width: 400px;height: 30px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round class="el-icon-search" type="primary" v-on:click="getUsers"></el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="pageData.tableData" overf highlight-current-row v-loading="listLoading"
              style="width: 100%">
      <el-table-column prop="Username" label="用户名" sortable align="center" ></el-table-column>
      <el-table-column prop="UserIp" label="IP" sortable align="center"></el-table-column>
      <el-table-column prop="Operate" label="操作名称" sortable align="center"></el-table-column>
      <el-table-column prop="IsSuccess" label="操作结果" sortable :formatter="formIsSuccess" align="center"></el-table-column>
      <el-table-column prop="Time" label="操作时间" sortable :formatter="formTime" align="center"></el-table-column>
      <el-table-column prop="Detail" label="详细信息" sortable align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.Detail}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页下拉条-->
    <el-col :span="24">
      <!--pageSIze改变时会触发@size-change-->
      <!--currentPage 改变时会触发@currentPage -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page=pageData.pageNO
        :page-sizes=pageData.pageSizesList
        :page-size=pageData.pageSize
        layout="total, prev, pager, next, jumper"
        :total=pageData.Count
        style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>
.toolbar{
background-color: #f2f2f2;
padding: 10px;
margin: 10px 0px;
}
<script>
import * as mUtils from 'utils/mUtils'
export default {
  data () {
    return {
      listLoading: false,
      userNameOrIP: '',
      // 分页数据
      pageData: {
        pageNO: 1, // 当前页数
        pageSize: 10, // 每页显示
        pageSizesList: [10, 30, 50],
        tableData: [], // 返回的结果
        totalDataNumber: 0, // 总页数
        Count: 0 // 总条数
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageData.pageNO = val
      this.getUsers()
    },
    getUsers () {
      let para = {SearchTag: this.userNameOrIP, Currentpage: this.pageData.pageNO}
      console.log(JSON.stringify(para))
      let _this = this
      this.listLoading = true
      this.$api.userAPI.UserLog(para).then(res => {
        let {Retcode, Reason, Pagesize, Curpage, Count, Useroptlogs} = res
        console.log(JSON.stringify(res))
        if (Retcode === 1) { // 成功
          _this.pageData.Count = Count // 总条数
          _this.pageData.totalDataNumber = Pagesize // 总页数
          _this.pageData.pageNO = Curpage // 当前第几页
          _this.pageData.tableData = Useroptlogs
          this.listLoading = false
        } else { // 失败
          this.$message.error(Reason)
        }
      })
    },
    // 操作结果转换
    formIsSuccess: function (row, column) {
      return row.IsSuccess === 1 ? '成功' : row.IsSuccess === 0 ? '失败' : '未知'
    },
    // 时间转换formatDate
    formTime: function (row, colunmn) {
      var date = new Date(row.Time)
      return mUtils.formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created () {
    this.getUsers()
  }
}
</script>

<style scoped>
  .toolbar{
    background-color: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;
  }
</style>
