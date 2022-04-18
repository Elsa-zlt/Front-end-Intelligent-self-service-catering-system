/* eslint-disable vue/valid-template-root */
<template>
  <div id="box">
    <div>
      <Header class="header"></Header>
      <div class="top"></div>
    </div>
    <div class="content">
      <div class="left">
        <Navbar></Navbar>
      </div>
      <div class='right clearfix'>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    Header,
    Navbar
  }
}
</script>

<style scoped lang='less'>
@import '../assets/css/iconfont.css';
#box {
  background-color: #f9f9f9;
  flex-wrap: wrap;
  .header {
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .top {
    height: 54px;
  }
  .content {
    // height: calc(100vh - 54px);
    display: flex;
    .left {
      position: fixed;
      top: 54px;
      overflow: hidden;
      height: 100%;
      .submenu {
        // height: 54px;
        background-color: #f4f4f4;
        .menuitem {
          background-color: #fcfcfc;
          border-right: 1px solid #dcdee2;
        }
      }
    }
    .right {
      // overflow: hidden;
      // justify-content: center;
      width: calc(100vw - 230px);
      // height: 100%;
    }
    // 清除浮动
    .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .clearfix{
        *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
  }
}
</style>
