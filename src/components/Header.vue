<template>
   <div class="header">
      <div class="left">智慧自助餐饮系统</div>
      <ul class="right">
        <li @click="handleSet"><span class="iconfont icon-yonghu2"></span>账户设置</li>
        <li @click="handleExit"><span class="iconfont icon-guanji"></span>退出登录</li>
      </ul>
    </div>
</template>

<script>
export default {
  methods: {
    handleSet () {
      console.log('账户设置')
    },

    handleExit () {
      console.log('退出登录')
    }
  }
}
</script>

<style scoped lang='less'>
.header {
  position: relative;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 54px;
  color: #fff;
  background-color: #464c5b;
  .left {
    position: absolute;
    left: 20px;
    // float: left;
    font-size: 20px;
  }
  .right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    color: #cccccc;
    font-size: 16px;
    list-style: none;
    li {
      display: flex;
      align-items: center;
      margin: 0 20px;
      cursor: pointer;
      span {
        font-size: 24px;
        margin-right: 5px;
      }
    }
  }
}
</style>
