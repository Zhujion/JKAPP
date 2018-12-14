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
              <el-button class="el-icon-circle-plus" type="primary" @click="handleAdd"  >新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      <!--列表-->
      <el-table :data="pageData.tableData" overf highlight-current-row v-loading="listLoading"
                @selection-change="selsChange" style="width: 100%">
        <el-table-column type="selection" ></el-table-column>
        <el-table-column prop="Username" label="用户名" sortable></el-table-column>
        <el-table-column prop="Usertype" label="用户类型" sortable  :formatter="formUsertype"></el-table-column>
        <el-table-column prop="Email" label="联系邮箱" sortable></el-table-column>
        <el-table-column prop="Phonenum" label="联系电话" sortable ></el-table-column>
        <el-table-column prop="Company" label="公司名称" sortable></el-table-column>
        <el-table-column prop="Address" label="地址" sortable></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="small" @click="HandleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" @click="handlDel(scope.$index, scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页下拉条-->
      <el-col :span="24">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length === 0">批量删除</el-button>
        <el-button type="primary">全部导出</el-button>
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
      <!--新增弹出层-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true">
        <el-form ref="addform" :model="addform" label-width="80px" :rules="addFormRules">
          <el-form-item label="用户名称:" prop="Username">
            <el-input v-model="addform.Username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司名称:">
            <el-input v-model="addform.Company" ></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="Phonenum">
            <el-input v-model="addform.Phonenum" ></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱:">
            <el-input v-model="addform.Email" ></el-input>
          </el-form-item>
          <el-form-item label="公司地址:">
            <el-input type="textarea" v-model="addform.Address" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addSubmit" type="primary" :loading="addLoading">立即创建</el-button>
          <el-button type="warning" @click.native="addFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <!--编辑页面-->
      <el-dialog title="编辑" :visible.sync="editdFormVisible" :clost-on-click-model="false" :append-to-body="true">
        <el-form ref="editform" :model="editform" label-width="80px" :rules="editFormRules">
          <el-form-item label="用户名:" prop="Username">
            <el-input v-model="editform.Username" :disabled="true"></el-input>
          </el-form-item>
         <el-form-item label="公司名称:">
           <el-input v-model="editform.Company"></el-input>
         </el-form-item>
          <el-form-item label="联系电话:" prop="Phonenum">
            <el-input v-model="editform.Phonenum"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱:">
            <el-input v-model="editform.Email"></el-input>
          </el-form-item>
          <el-form-item label="公司地址:">
            <el-input type="textarea" v-model="editform.Address"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editSubmit" type="primary" :loading="editFormLoading">确定</el-button>
          <el-button type="warning" @click.native="editdFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </section>
</template>

<script>
import adduser from './Addpage'
import qs from 'qs'
// @size-change="handleSizeChange"
// @current-change="handleCurrentChange"
export default {
  name: 'user_me',
  data () {
    return {
      listLoading: false,
      filters: {
        name: ''
      },
      // 分页数据
      pageData: {
        pageNO: 1, // 当前页数
        pageSize: 10, // 每页显示
        pageSizesList: [10, 30, 50],
        tableData: [], // 返回的结果
        totalDataNumber: 0, // 总页数
        Count: 0 // 总条数
      },
      sels: [], // 列表选中列
      // 新增
      // 表单数据
      addform: {
        Username: '',
        Phonenum: '', // 电话 必填
        Email: '', // 邮箱 选填
        Company: '', // 公司 选填
        Address: '', // 地址 选填
        Usertype: '' // 用户类型 1 管理员 0 普通用户
      },
      // 新增
      addFormVisible: false, // 新增页面是否显示
      addLoading: false,
      addFormRules: {
        Username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        Phonenum: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ]
      },
      // 编辑
      editform: {
        Username: '',
        Phonenum: '', // 电话 必填
        Email: '', // 邮箱 选填
        Company: '', // 公司 选填
        Address: '' // 地址 选填
      },
      editFormLoading: false,
      editdFormVisible: false,
      editFormRules: {
        Username: [{required: true, message: '请输入用户名称', trigger: 'blur'}],
        Phonenum: [{required: true, message: '请输入手机号', trigger: 'blur'}]
      },
      dellist: [],
      delItem: {}
    }
  },
  components: {
    adduser // 注册子组件
  },
  methods: {
    // 性别显示转换
    formUsertype: function (row, column) {
      return row.Usertype === 1 ? '管理员' : row.Usertype === 0 ? '普通用户' : '未知'
    },
    openAdd (data) {
    },
    // 查询
    getUsers () {
      let para = {Username: this.filters.name, Currentpage: this.pageData.pageNO}
      console.log(JSON.stringify(para))
      let _this = this
      this.listLoading = true
      this.$api.userAPI.UserPage(para).then(res => {
        let {Retcode, Reason, Pagesize, Curpage, Count, Userinfos} = res
        if (Retcode === 1) { // 成功
          _this.pageData.Count = Count // 总条数
          _this.pageData.totalDataNumber = Pagesize // 总页数
          _this.pageData.pageNO = Curpage // 当前第几页
          _this.pageData.tableData = Userinfos
          this.listLoading = false
        } else { // 失败
          this.$message.error(Reason)
        }
      })
    },
    handleCurrentChange (val) {
      this.pageData.pageNO = val
      this.getUsers()
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    // 新增页面
    handleAdd: function () {
      console.log('点击新增')
      this.addFormVisible = true
      this.addform = {
        Username: '',
        Phonenum: '', // 电话 必填
        Email: '', // 邮箱 选填
        Company: '', // 公司 选填
        Address: '', // 地址 选填
        Usertype: '0' // 用户类型 1 管理员 0 普通用户
      }
    },
    // 添加用户
    addSubmit: function () {
      console.log('开始创建用户')
      this.$refs.addform.validate((valid) => {
        console.log('创建用户', valid)
        if (valid) {
          console.log('通过')
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addFormVisible = true
            var aa = this.addform
            console.log('对象', aa)
            let para = Object.assign({}, aa)
            console.log('发送的数据', para)
            this.$api.userAPI.AddUser(para).then((res) => {
              let {Retcode, Reason} = res
              if (Retcode === 1) {
                // 成功
                this.$message({
                  type: Reason,
                  message: '创建用户成功！'
                })
                this.$refs['addform'].resetFields() // 清空表单
                this.addFormVisible = false // 关闭弹出层
                this.getUsers() // 执行查询
              } else {
                this.message.error(Reason)
                // :modal-append-to-body="false"
              }
            })
          }).catch(() => {
            // 取消触发
          })
        }
      })
    },
    // 编辑用户
    // 显示
    HandleEdit: function (index, row) {
      this.editdFormVisible = true
      console.log('得到的数据', row)
      this.editform = Object.assign({}, row)
    },
    // 修改提交
    editSubmit: function () {
      this.$refs.editform.validate((valid) => {
        if (valid) {
          this.$confirm('确定修改吗？', '提示', {}).then(() => {
            this.editFormLoading = true
            var aa = this.editform
            let para = Object.assign({}, aa)
            this.$api.userAPI.updateUser(para).then((res) => {
              this.editFormLoading = false
              let {Retcode, Reason} = res
              if (Retcode === 1) {
                // 成功
                this.$message({
                  type: Reason,
                  message: '修改用户成功！'
                })
                this.$refs['editform'].resetFields() // 清空表单
                this.editdFormVisible = false // 关闭弹出层
                this.getUsers() // 执行查询
              } else {
                this.message.error(Reason)
              }
            })
          }).catch(() => {
            console.log('取消修改')
          })
        }
      })
    },
    // 删除
    handlDel: function (idnex, row) {
      this.$confirm('确认删除该用户？', '提示', {type: 'warning'}).then(() => {
        this.listLoading = true
        let para = {Username: row.Username, Method: 0}
        console.log('单独删除username===', para)
        this.$api.userAPI.delUser(para).then((res) => {
          let {Retcode, Reason} = res
          if (Retcode === 1) {
            this.listLoading = false
            this.$message({
              type: Reason,
              message: '删除用户成功！'
            })
            this.getUsers()
          } else {
            this.message.error(Reason)
          }
        })
      }).catch(() => {
        console.log('取消删除')
      })
    },
    // 批量删除
    batchRemove: function () {
      var usernames = this.sels.map(item => item.Username).toString()
      this.sels.map(item => item.Username).forEach((item, index) => {
        this.delItem = Object.assign({}, this.delItem, {Username: item}) // 追加成[ {Username: item}, {Username: item}, {Username: item}]
        this.dellist = this.dellist.concat(item) // 追加成[x,x,x,x,x,x]
      })
      // console.log('数组delItem', JSON.stringify(this.delItem))
      console.log('数组dellist', JSON.stringify(this.dellist))
      this.$confirm('确认删除所选中的用户吗？', '提示', {type: 'warning'}).then(() => {
        this.listLoading = true
        // let para = JSON.stringify(this.dellist)
        // let para = this.dellist
        let para = {Username: usernames, Method: 1}
        console.log('请求拦截字符串', qs.stringify(para))
        console.log('批量删除的username===', para)
        this.$api.userAPI.delUser(para).then((res) => {
          let {Retcode, Reason} = res
          if (Retcode === 1) {
            this.listLoading = false
            this.$message({
              type: Reason,
              message: '批量删除用户成功！'
            })
            this.getUsers()
          } else {
            this.message.error(Reason)
          }
        })
      }).catch(() => {})
    }
  },
  mounted () {
    // 加载前触发
    this.getUsers()
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
