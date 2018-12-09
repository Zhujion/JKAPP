<template>
 <div class="home">
   <head-nav></head-nav>
   <div class="lef-fixed-right-auto">
     <left-menu></left-menu>
     <div class="content_page"
     :style="{'margin-left':$store.state.menu.sidebar.width,
     'width':$store.state.page.win_content.width+'px',
     'height':$store.state.page.win_content.height+'px'}">
        <div class="content">
          <bread></bread>
          <resource-view></resource-view><!--页面渲染入口-->
        </div>
     </div>
   </div>
 </div>
</template>

<script>
import HeadNav from './headNav'
import Bread from './bread'
import LeftMenu from './leftMenu'

export default {
  data () {
    return {
      win_size: {
        height: '',
        width: ''
      }
    }
  },
  component: {
    HeadNav,
    LeftMenu,
    Bread
  },
  methods: {
    // 用于自适配窗口页面大小
    setSize () {
      // lib_$-->$,window的宽,高的获取是没有问题的。
      this.win_size = {
        height: document.body.clientHeight - 73,
        width: document.body.clientWidth - 183
      }
      this.$store.dispatch('set_win_content', this.win_size) // 触发动作，content部分的宽高也随即改变。
    }
  },
  created () {
    this.setSize()
  },
  mounted () {
    window.onreset = () => {
      this.setSize()
    }
  }
}
</script>

<style scoped lang="less">
  .content_page{
    position: fixed;
    top:71px;
    background: #FFF;
    overflow:auto;
  }
  .content{
    width:100%;
    height:100%;
  }
</style>
