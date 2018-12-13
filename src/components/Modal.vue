<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close" v-show="show">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <slot name="header">
            <label style="font-size: 10px">修改密码</label>
            <button type="button" class="btn-close el-icon-close" @click="close"></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            这是一个公用模板
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            这是脚部
            <el-button type="primary" @click="close">确定</el-button>
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
      isbtnPwdVisible: true
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
</style>
