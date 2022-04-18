<template>
  <div class="card" :style="`width: ${width};`">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content" :style="`padding:${padding}`">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '1160px'
    },
    padding: {
      type: String,
      default: '20px'
    }
  }
}
</script>

<style scoped lang='less'>
.card {
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    height: 44px;
    padding-left: 20px;
    font-size: 16px;
    font-family: "微软雅黑";
    color: #333;
    background-color: #f2f2f2;
  }
  .content {
    width: 100%;
    background-color: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
  }
}
</style>
