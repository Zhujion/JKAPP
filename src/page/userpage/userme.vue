<template>
    <section>
        <el-col :span="24" class="toolbar">
          <el-form :inline="true">
              <el-form-item label="用户名称：">
                <el-input placeholder="用户名" v-model="filters.name" style="width: 400px;height: 30px"></el-input>
              </el-form-item>
            <el-form-item>
              <el-button round class="el-icon-search" type="primary" v-on:click="getUsers"></el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="el-icon-circle-plus" type="primary"  >新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      <!--列表-->
      <el-table :data="tableData" overf highlight-current-row="true" v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
        <el-table-column type="selection" ></el-table-column>
        <el-table-column type="index" ></el-table-column>
        <el-table-column porp="Username" label="用户名" sortable></el-table-column>
        <el-table-column porp="Usertype" label="用户类型" sortable ></el-table-column>
        <el-table-column porp="Email" label="联系邮箱" sortable></el-table-column>
        <el-table-column porp="Phonenum" label="联系电话" sortable ></el-table-column>
        <el-table-column porp="Company" label="公司名称" sortable></el-table-column>
        <el-table-column porp="Address" label="地址" sortable></el-table-column>
        <el-table-column label="操作" >
          <template>
            <el-button size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页下拉条-->
      <el-col :span="24">
        <el-button type="danger">批量删除</el-button>
        <el-button type="primary">批量导出</el-button>
        <el-button type="primary">全部导出</el-button>
        <!--pageSIze改变时会触发@size-change-->
        <!--currentPage 改变时会触发@currentPage -->
        <el-pagination
          layout="prev, pager, next, total, sizes, jumper"
          :current-page.sync="pageData.pageNO"
          :page-size="pageData.pageSize"
          :page-sizes="pageData.pageSizesList"
          :total="pageData.totalDataNumber"
          style="float: contour"></el-pagination>
      </el-col>
      <!--新增弹出层-->

    </section>
</template>

<script>
import adduser from './Addpage'

// @size-change="handleSizeChange"
// @current-change="handleCurrentChange"
export default {
  name: 'user_me',
  data () {
    return {
      isShow: false,
      filters: {
        name: ''
      },
      // 分页数据
      pageData: {
        pageNO: 1,
        pageSize: 10,
        pageSizesList: [10, 30, 50],
        tableData: [], // 返回的结果
        totalDataNumber: 0 // 总页数
      }
    }
  },
  components: {
    adduser // 注册子组件
  },
  methods: {
    openAdd (data) {
    },
    handleSizeChange (val) {
    },
    getUsers () {
      console.log('开始加载用户')
      console.log('当前页', this.pageData.pageNO)
      console.log('用户名', this.filters.name)
      let para = {Username: this.filters.name, Currentpage: this.pageData.pageNO}
      console.log(JSON.stringify(para))
      this.$api.userAPI.UserPage(para).then(res => {
        let {Retcode, Reason, Pagesize, Curpage, Count, Userinfos} = res
        if (Retcode === 1) { // 成功
          this.pageData.tableData = Count // 总条数
          this.pageData.totalDataNumber = Pagesize // 总页数
          this.pageData.pageNO = Curpage // 当前第几页
          this.pageData.tableData = Userinfos
        } else { // 失败
          this.$message.error(Reason)
        }
      })
    }
  },
  handleCurrentChange () {
  },
  selsChange: function (sels) {
    this.sels = sels
  }
}
</script>

<style scoped lang="less">
.toolbar{
  background-color: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
}
</style>
