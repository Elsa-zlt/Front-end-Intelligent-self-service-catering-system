<style scoped lang='less'>
@import '../assets/css/iconfont.css';
.layout{
  position: relative;
  overflow: hidden;
  background: #f5f7f9;
  .header {
    height: 54px;
    line-height: 50px;
    padding: 0 20px;
    background-color: #464c5b;
    .menu {
      height: 54px;
      background-color: #464c5b;
      .layout-logo{
        /* width: 100px; */
        height: 30px;
        /* background: #5b6270; */
        color: #fff;
        font-size: 20px;
        font-family: '微软雅黑';
        border-radius: 3px;
        float: left;
        /* position: relative;
        top: 15px;
        left: 20px; */
      }
      .layout-nav{
        float: right;
        width: 250px;
        height: 54px;
        background-color: #464c5b;
        .ivu-menu-item {
          color: #cccccc;
          font-size: 16px;
        }
        .ivu-menu-item:hover {
          color: #fff;
        }
      }
    }
    .ivu-menu-horizontal {
      line-height: 54px!important;
    }
  }
  .siderbar {
    width: 230px!important;
    .submenu {
      font-size: 18px;
      color: #999999;
      background-color: #f4f4f4;
      // .ivu-menu-submenu-title {
      //   padding: 16px 24px!important;
      // }
      .iconfont {
        margin-right: 5px;
      }
      .menuitem {
        font-size: 16px;
        padding-left: 52px!important;
        background-color: #fcfcfc;
        border-right: 1px solid #dcdee2;
      }
      .ivu-menu-item-active {
        background-color: #fcfcfc!important;
      }
    }
  }
}

</style>
<template>
  <div class="layout">
    <Layout>
      <Header class="header">
                <Menu mode="horizontal" theme="dark" active-name="1" class="menu">
                    <div class="layout-logo">智慧自助餐饮系统</div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <span class="iconfont icon-yonghu2"></span>
                            账户设置
                        </MenuItem>
                        <MenuItem name="2">
                            <span class="iconfont icon-guanji"></span>
                            退出登录
                        </MenuItem>
                    </div>
                </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff',
        width: '230px',minWidth: '230px', maxWidth: '230px', flex: '0 0 230px'}" class="siderbar">
          <Navbar></Navbar>
        </Sider>
        <Layout :style="{backgroundColor: '#f9f9f9'}">
            <Content>
                <!-- <router-view></router-view> -->
                <template>
                  <div id="slider">
                    <Scroll :height="vh" id="scroll">
                      <router-view></router-view>
                    </Scroll>
                  </div>
              </template>
            </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
export default {
  data () {
    return {
      vh: window.innerHeight - 55
    }
  },
  components: {
    Navbar
  },
  mounted () {
    // window.addEventListener('resize', function () {
    //   this.vh = window.innerHeight - 55
    //   console.log(this.vh)
    // }, false)
  }
}
</script>

<style scoped lang='less'>
#id {
  .ivu-scroll-loader {
    display: none!important;;
    height: 0!important;
  }
}
</style>
