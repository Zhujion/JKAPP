<template>
  <el-scrollbar class="coenste" :style="{
     'height':$store.state.page.win_content.height+'px'}">
    <div style="margin-top: 100px;height:400px">
      <div style="width: 710px;height: 120px;margin-top: 100px;margin: 0 auto;">
        <img src="../../img/hong.png" style="width: 100px; height:  100px; margin-left: 0px" />
        <img src="../../img/select.png" style=" width: 600px; height: 100px; margin-left: 0px" />
      </div>
      <div style="width: 700px;height:50px;margin: 0 auto;" >
        <el-input placeholder="请输入要搜索的医师、护士的唯一识别码" v-model="SearchValue"  class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 80px;color: Black;" @change="selectGet">
            <el-option label="医师" value="1"></el-option>
            <el-option label="护士" value="2"></el-option>
          </el-select>
          <el-button  slot="append" icon="el-icon-search" style="width: 80px;background-color: #4285f4;color: #dff7f9" @click.native="getSearch">搜索</el-button>
        </el-input>
      </div>
      <doctorindex v-show="showDoctor"  v-bind:datalist="datetableDoctor"  style="margin: 0 auto;"></doctorindex>
      <nurserindex v-show="showNurser"  v-bind:datalist="datetableNurser" style="margin: 0 auto;"></nurserindex>
    </div>
  </el-scrollbar>
    <!--显示的医师数据-->
</template>

<script>
import doctorindex from './doctorindex'
import nurserindex from './nurseindex'
export default {
  name: 'queryDn',
  data () {
    return {
      select: '',
      showDoctor: false,
      showNurser: false,
      SearchValue: '',
      datetableDoctor: [],
      datetableNurser: [],
      zhujia: 'asdasdasdasdasd'
    }
  },
  components: {
    doctorindex,
    nurserindex
  },
  methods: {
    getSearch () {
      this.showDoctor = false
      this.showNurser = false
      if (this.SearchValue === '') {
        const h = this.$createElement
        this.$notify({
          title: '提示',
          message: h('i', {style: 'color: red'}, '请输入医师或护士的唯一识别码！'),
          type: 'warning'
        })
      } else {
        if (this.select === '1') {
          // 医师
          this.getDoctor()
        } else if (this.select === '2') {
          // 护士
          this.getnurser()
        } else {
          const h = this.$createElement
          this.$notify({
            title: '提示',
            message: h('i', {style: 'color: red'}, '请选择要查询信息的类型（医师、护士）'),
            type: 'warning'
          })
        }
      }
    },
    selectGet (val) {
      console.log('选中的值===', val)
    },
    // 显示医师
    getDoctor () {
      let paras = {Dctid: this.SearchValue}
      this.$api.medicaAPI.MedicalDoctor(paras).then((res) => {
        let {Retcode, Reason, Data} = res
        if (Retcode === 1) {
          this.datetableDoctor = Data
          this.showDoctor = true
        } else {
          // 失败
          this.$message.error(Reason)
        }
      })
    },
    // 显示 护士
    getnurser () {
      let paras = {Nurseid: this.SearchValue}
      this.$api.medicaAPI.MedicalNurse(paras).then((res) => {
        let {Retcode, Reason, Data} = res
        if (Retcode === 1) {
          this.datetableNurser = Data
          this.showNurser = true
        } else {
          // 失败
          this.$message.error(Reason)
        }
      })
    },
    setSize () {
      // lib_$-->$,window的宽,高的获取是没有问题的。
      this.win_size = {
        height: document.body.clientHeight - 1,
        width: document.body.clientWidth - 183
      }
      console.log('高度========================', this.win_size)
      this.$store.dispatch('set_win_content', this.win_size) // 触发动作，content部分的宽高也随即改变。
    }
  },
  created () {
    this.setSize()
  }
}
</script>

<style scoped>

html, body {
  height: 100%;
  margin:0;
  padding:0;
}
.coenste {
  height: 100%;
  width: 100%;
}
.el-input__inner {
  height: 60px!important;
  background-color: red;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
