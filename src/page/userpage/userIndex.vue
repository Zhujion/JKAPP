<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close" v-show="show">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <slot name="header">
            <label style="font-size: 10px">个人信息</label>
            <button type="button" class="btn-close el-icon-close" @click="close"></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
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
            </el-form>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            这是脚部
            <el-button type="primary" @click="close" v-loading="isbtnUserVisible">确定</el-button>
            <el-button @click="close">取消</el-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['show'],
  data () {
    return {
      form: {
        Username: '',
        Phonenum: '', // 电话 必填
        Email: '', // 邮箱 选填
        Company: '', // 公司 选填
        Address: '', // 地址 选填
        Usertype: '' // 用户类型 1 管理员 0 普通用户
      },
      isbtnUserVisible: false
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center; }
  .modal {
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x:auto; display: flex;
    flex-direction: column; }
  .modal-header, .modal-footer { padding: 10px; display: flex; }
  .modal-header { border-bottom: 1px solid #eee; color: #4aae9b; justify-content: space-between; }
  .modal-footer { border-top: 1px solid #eee; justify-content: flex-end; }
  .modal-body { position: relative; padding: 20px 10px; }
  .btn-close { border: none 0; font-size: 10px; padding: 5px; cursor: pointer; font-weight: bold; color: #4aae9b; background-color: transparent; }
  .btn-green { color: #fff; background-color: #4aae9b; border: 1px solid #4aae9b; border-radius: 2px; }
  .modal-fade-enter,
  .modal-fade-leave-active { opacity: 0; }
  .modal-fade-enter-active,
  .modal-fade-leave-active { transition: opacity .5s ease }
  .el-input__inner{
    height: 30px !important;
  }
  .fromSize{
    width: 400px;
   }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
