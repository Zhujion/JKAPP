<template>
    <section>
      <!--查询-->
      <el-row :span="24" class="toolbar">
        <el-form :inline="true" >
          <el-form-item label="医疗机构名称：">
            <el-input placeholder="请输入医疗机构名称查询，支持模糊查询" v-model="unitname" style="width: 400px;height: 30px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button round class="el-icon-search" type="primary" v-on:click="getUsers"></el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="el-icon-circle-plus" type="primary" @click="handleAdd"  >新增</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!--表格-->
      <el-table :data="pageData.tableData" overf highlight-current-row v-loading="listLoading"
                @selection-change="selsChange" style="width: 100%">
        <el-table-column type="selection" aria-disabled="false" ></el-table-column>
        <el-table-column prop="Unitname" label="医疗机构" sortable></el-table-column>
        <el-table-column prop="Provincecode" label="省份代码" sortable></el-table-column>
        <el-table-column prop="Province" label="省份名称" sortable></el-table-column>
        <el-table-column prop="Addr" label="地址" sortable ></el-table-column>
        <el-table-column prop="C_syzxs" label="所有制形式" sortable></el-table-column>
        <el-table-column prop="Naturebusi" label="机构类别" sortable ></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="small"  @click="HandleEdit(scope.$index, scope.row)">编辑</el-button>
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
          <el-form-item label="省份代码:" prop="Provincecode">
            <el-input v-model="addform.Provincecode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="省份名称:" prop="province">
            <el-input v-model="addform.Province" ></el-input>
          </el-form-item>
          <el-form-item label="机构名称:" prop="unitname">
            <el-input v-model="addform.Unitname" ></el-input>
          </el-form-item>
          <el-form-item label="机构类别:" prop="c_jglb">
            <el-input v-model="addform.C_jglb" ></el-input>
          </el-form-item>
          <el-form-item label="机构等次:" prop="c_jgdc">
            <el-input v-model="addform.C_jgdc" ></el-input>
          </el-form-item>
          <el-form-item label="经营性质:" prop="naturebusi">
            <el-input v-model="addform.Naturebusi" ></el-input>
          </el-form-item>
          <el-form-item label="服务对象:" prop="c_fwdx">
            <el-input v-model="addform.C_fwdx" ></el-input>
          </el-form-item>
          <el-form-item label="所有形式制:" prop="c_syzxs">
            <el-input v-model="addform.C_syzxs" ></el-input>
          </el-form-item>
          <el-form-item label="地址:" prop="addr">
            <el-input type="textarea" v-model="addform.Addr" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addSubmit" type="primary" :loading="addLoading">立即创建</el-button>
          <el-button type="warning" @click.native="addFormVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <!--编辑弹出层-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true">
        <el-form ref="editform" :model="editform" label-width="80px" :rules="editFormRules">
          <el-form-item label="省份代码:" prop="Provincecode">
            <el-input v-model="editform.Provincecode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="省份名称:" prop="province">
            <el-input v-model="editform.Province" ></el-input>
          </el-form-item>
          <el-form-item label="机构名称:" prop="unitname">
            <el-input v-model="editform.Unitname" ></el-input>
          </el-form-item>
          <el-form-item label="机构类别:" prop="c_jglb">
            <el-input v-model="editform.C_jglb" ></el-input>
          </el-form-item>
          <el-form-item label="机构等次:" prop="C_jgdc">
            <el-input v-model="editform.C_jgdc" ></el-input>
          </el-form-item>
          <el-form-item label="经营性质:" prop="Naturebusi">
            <el-input v-model="editform.Naturebusi" ></el-input>
          </el-form-item>
          <el-form-item label="服务对象:" prop="C_fwdx">
            <el-input v-model="editform.C_fwdx" ></el-input>
          </el-form-item>
          <el-form-item label="所有形式制:" prop="C_syzxs">
            <el-input v-model="editform.C_syzxs" ></el-input>
          </el-form-item>
          <el-form-item label="地址:" prop="Addr">
            <el-input type="textarea" v-model="editform.Addr" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="updSubmit" type="primary" :loading="editLoading">确定</el-button>
          <el-button type="warning" @click.native="editFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </section>
</template>

<script>
export default {
  name: 'medicaIndex',
  data () {
    return {
      // 添加
      addform: {
        Unitname: '',
        Addr: '',
        C_syzxs: '',
        C_jglb: '',
        C_jgdc: '',
        Naturebusi: '',
        C_fwdx: '',
        Province: '',
        Provincecode: ''
      },
      addFormVisible: false,
      addFormRules: {
        Unitname: [{required: true, message: '请输入医疗机构名称', trigger: 'blur'}],
        Addr: [{required: true, message: '请输入地址', trigger: 'blur'}],
        C_syzxs: [{required: true, message: '请输入所有制形式', trigger: 'blur'}],
        C_jglb: [{required: true, message: '请输入机构类别', trigger: 'blur'}],
        C_jgdc: [{required: true, message: '请输入机构等次', trigger: 'blur'}],
        Naturebusi: [{required: true, message: '请输入经营性质', trigger: 'blur'}],
        C_fwdx: [{required: true, message: '请输入服务对象', trigger: 'blur'}],
        Province: [{required: true, message: '请输入省份名称', trigger: 'blur'}],
        Provincecode: [{required: true, message: '请输入省份代码', trigger: 'blur'}]
      },
      // 查询
      unitname: '', // 查询条件
      isunitnameVisible: false,
      listLoading: false,
      tableForm: {
        Unitname: '',
        Addr: '',
        C_syzxs: '',
        C_jglb: '',
        C_jgbc: '',
        Naturebusi: '',
        C_fwdx: '',
        Province: '',
        Provincecode: ''
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
      // 新增
      addLoading: false,
      // 编辑
      editform: {
        Unitname: '',
        Addr: '',
        C_syzxs: '',
        C_jglb: '',
        C_jgbc: '',
        Naturebusi: '',
        C_fwdx: '',
        Province: '',
        Provincecode: ''
      },
      editFormVisible: false,
      editFormRules: {
        Unitname: [{required: true, message: '请输入医疗机构名称', trigger: 'blur'}],
        Addr: [{required: true, message: '请输入地址', trigger: 'blur'}],
        C_syzxs: [{required: true, message: '请输入所有制形式', trigger: 'blur'}],
        C_jglb: [{required: true, message: '请输入机构类别', trigger: 'blur'}],
        C_jgbc: [{required: true, message: '请输入机构等次', trigger: 'blur'}],
        Naturebusi: [{required: true, message: '请输入经营性质', trigger: 'blur'}],
        C_fwdx: [{required: true, message: '请输入服务对象', trigger: 'blur'}],
        Province: [{required: true, message: '请输入省份名称', trigger: 'blur'}],
        Provincecode: [{required: true, message: '请输入省份代码', trigger: 'blur'}]
      },
      editLoading: false,
      // 删除
      // 批量删除
      sels: [] // 列表选中列
    }
  },
  methods: {
    // 查询查询数据的方法
    getUsers: function () {
      let para = {Unitname: this.unitname, Currentpage: this.pageData.pageNO}
      let _this = this
      this.listLoading = true
      this.$api.medicaAPI.MedicalPage(para).then(res => {
        let {Retcode, Reason, Pagesize, Curpage, Count, Hospitals} = res
        if (Retcode === 1) { // 成功
          _this.pageData.Count = Count // 总条数
          _this.pageData.totalDataNumber = Pagesize // 总页数
          _this.pageData.pageNO = Curpage // 当前第几页
          _this.pageData.tableData = Hospitals
          this.listLoading = false
        } else { // 失败
          this.$message.error(Reason)
        }
      })
    },
    // 新增 显示
    handleAdd: function () {
      this.addFormVisible = true
      this.addform = {
        Unitname: '',
        Addr: '',
        C_syzxs: '',
        C_jglb: '',
        C_jgbc: '',
        Naturebusi: '',
        C_fwdx: '',
        Province: '',
        Provincecode: ''
      }
    },
    // 新增 医疗机构
    addSubmit: function () {
      this.$refs.addform.validate((visible) => {
        console.log('=======开始添加=========')
        if (visible) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            var aa = this.addform
            let para = Object.assign({}, aa)
            console.log('添加的数据', para)
            this.$api.medicaAPI.Addhospital(para).then((res) => {
              console.log('=======开始添加接口=========')
              let {Retcode, Reason} = res
              console.log('=======进来了=========', res)
              if (Retcode === 1) {
                // 成功
                this.$message({
                  type: Reason,
                  message: '创建医疗机构信息成功！'
                })
                this.$refs['addform'].resetFields() // 清空表单
                this.addFormVisible = false // 关闭弹出层
                this.getUsers() // 执行查询
              } else {
                this.message.error(Reason)
                // :modal-append-to-body="false"
              }
            })
            this.addLoading = false
          }).catch(() => {
            // 取消触发
          })
        }
      })
    },
    // 编辑
    HandleEdit: function (index, row) {
      console.log('得到的数据', row)
      if (row.Ismodify === 0) {
        this.$message({
          type: 'warning',
          message: '该数据禁止编辑！'
        })
      } else {
        this.editFormVisible = true
        this.editform = Object.assign({}, row)
      }
    },
    // 修改
    updSubmit: function () {
      this.$refs.editform.validate((valid) => {
        if (valid) {
          this.$confirm('确定修改吗？', '提示', {}).then(() => {
            this.editLoading = true
            var aa = this.editform
            let para = Object.assign({}, aa)
            this.$api.medicaAPI.updateMedical(para).then((res) => {
              this.editLoading = false
              let {Retcode, Reason} = res
              if (Retcode === 1) {
                // 成功
                this.$message({
                  type: Reason,
                  message: '修改医疗机构成功！'
                })
                this.$refs['editform'].resetFields() // 清空表单
                this.editFormVisible = false // 关闭弹出层
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
    handlDel: function (index, row) {
      if (row.Ismodify === 0) {
        this.$message({
          type: 'warning',
          message: '该数据禁止删除！'
        })
      } else {
        this.$confirm('确认删除该医疗机构？', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true
          let para = {unitname: row.unitname, Method: 0}
          this.$api.medicaAPI.delMedical(para).then((res) => {
            this.listLoading = false
            let {Retcode, Reason} = res
            if (Retcode === 1) {
              this.$message({
                type: Reason,
                message: '删除医疗机构成功！'
              })
              this.getUsers()
            } else {
              this.message.error(Reason)
            }
          })
        }).catch(() => {
          console.log('取消删除')
        })
      }
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      var unitname = this.sels.map(item => item.Username).toString()
      this.$confirm('确认删除所选中的用户吗？', '提示', {type: 'warning'}).then(() => {
        this.listLoading = true
        // let para = JSON.stringify(this.dellist)
        // let para = this.dellist
        let para = {unitname: unitname, Method: 1}
        console.log('批量删除的username===', para)
        this.$api.medicaAPI.delMedical(para).then((res) => {
          this.listLoading = false
          let {Retcode, Reason} = res
          if (Retcode === 1) {
            this.$message({
              type: Reason,
              message: '批量删除医疗机构成功！'
            })
            this.getUsers()
          } else {
            this.message.error(Reason)
          }
        })
      }).catch(() => {})
    },
    handleCurrentChange (val) {
      this.pageData.pageNO = val
      this.getUsers()
    }
  },
  mounted () {
    // 加载前触发
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
