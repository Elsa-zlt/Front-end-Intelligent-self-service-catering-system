<template>
  <div class='navbar'>
    <Row>
      <Col span="8">
          <Menu :theme="theme2" @on-open-change="handleOpenChange" @on-select="handleSelectMenu" width="230px">
              <Submenu name="1" class="submenu" @click="handleHome">
                  <template slot="title">
                      <span class="iconfont icon-home1"></span>
                      首页
                      <div class="home" @click.stop="handleHome"></div>
                  </template>
              </Submenu>
              <Submenu name="2" class="submenu">
                  <template slot="title">
                      <span class="iconfont icon-thin-_newspaper_"></span>
                      反馈管理
                  </template>
                  <MenuItem name="2-1" class="menuitem" to="/index/assess">用户评分管理</MenuItem>
                  <MenuItem name="2-2" class="menuitem" to="/index/complaint">用户投诉管理</MenuItem>
              </Submenu>
              <Submenu name="3" class="submenu">
                  <template slot="title">
                      <span class="iconfont icon-yonghu1"></span>
                      用户管理
                  </template>
                  <MenuItem name="3-1" class="menuitem" to="/index/user">用户信息</MenuItem>
                  <MenuItem name="3-2" class="menuitem" to="/index/order">订单信息</MenuItem>
              </Submenu>
              <Submenu name="4" class="submenu">
                  <template slot="title">
                      <span class="iconfont icon-tongji"></span>
                      数据统计
                  </template>
                  <MenuItem name="4-1" class="menuitem" to="/index/income">收支统计</MenuItem>
                  <MenuItem name="4-2" class="menuitem" to="/index/like">菜品喜爱统计</MenuItem>
                  <MenuItem name="4-3" class="menuitem" to="/index/caloric">菜品热量统计</MenuItem>
              </Submenu>
              <Submenu name="5" class="submenu">
                  <template slot="title">
                      <span class="iconfont icon-tianping"></span>
                      菜品管理
                      <div class="dish" @click.stop="handleDish"></div>
                  </template>
              </Submenu>
          </Menu>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      theme2: 'light'
    }
  },
  methods: {
    // 跳转至首页
    handleHome () {
      if (this.$router.app._route.path !== '/index/home') {
        this.$router.push('/index/home')
        console.log(11)
      }
    },
    // 跳转至菜品管理页
    handleDish () {
      if (this.$router.app._route.path !== '/index/dish') {
        this.$router.push('/index/dish')
        console.log(22)
      }
    },
    handleOpenChange (e) {
      console.log('打开菜单栏', e)
    },

    handleSelectMenu (e) {
      console.log('选择菜单', e)
    }
  }
}
</script>

<style scoped lang='less'>
.navbar {
  overflow: hidden;
  width: 230px;
  .submenu {
    position: relative;
    font-size: 16px;
    color: #999999;
    background-color: #f4f4f4;
    // .ivu-menu-submenu-title {
    //   padding: 16px 24px!important;
    // }
    .home, .dish {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      // float: left;
      height: 100%;
      width: 100%;
    }
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
</style>
