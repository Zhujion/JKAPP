<template>
  <el-scrollbar>
    <el-form ref="form" :model="form" label-width="80px" class="fromSize">
      <el-form-item label="用户名称:">
        <el-input v-model="form.Username" ></el-input>
      </el-form-item>
      <el-form-item label="公司名称:">
        <el-input v-model="form.Company" ></el-input>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input v-model="form.Phonenum" ></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱:">
        <el-input v-model="form.Email" ></el-input>
      </el-form-item>
      <el-form-item label="公司地址:">
        <el-input type="textarea" v-model="form.Address" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" type="primary">立即创建</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="warning">退出</el-button>
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>

<script>
export default {
  data () {
    return {
      form: {
        Username: '',
        Phonenum: '', // 电话 必填
        Email: '', // 邮箱 选填
        Company: '', // 公司 选填
        Address: '', // 地址 选填
        Usertype: '' // 用户类型 1 管理员 0 普通用户
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.form)
    }
  }
}

</script>

<style scoped lang="less">
.fromSize{
  // width: 400px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
