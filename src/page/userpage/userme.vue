<template>
    <section>
        <el-col :span="24" class="el-tooltip">
          <el-form :inline="true">
              <el-form-item>
                <el-input placeholder="用户名"></el-input>
              </el-form-item>
            <el-form-item>
              <el-button round class="el-icon-search" type="primary"></el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="el-icon-circle-plus" type="primary" @click="openAdd" v-model="isShow">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      <!--列表-->
      <el-table>
        <el-table-column type="selection" width="80"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column porp="username" label="用户名" sortable width="120"></el-table-column>
        <el-table-column porp="usertype" label="用户类型" sortable width="120"></el-table-column>
        <el-table-column porp="email" label="联系邮箱" sortable width="120"></el-table-column>
        <el-table-column porp="phone" label="联系电话" sortable width="120"></el-table-column>
        <el-table-column porp="registered" label="注册时间" sortable width="120"></el-table-column>
      </el-table>
      <!--下拉条-->
      <el-col :span="24">
        <el-button type="danger">批量删除</el-button>
        <el-button type="primary">批量导出</el-button>
        <el-button type="primary">全部导出</el-button>
      </el-col>
      <!--新增弹出层-->
      <adduser :invitor="isShow" @changingType="openAdd"></adduser>
    </section>
</template>

<script>
import adduser from './Addpage'
export default {
  name: 'user_me',
  data () {
    return {
      isShow: false
    }
  },
  components: {
    adduser // 注册子组件
  },
  method: {
    openAdd (data) {
    }
  }
}
</script>

<style scoped>

</style>
