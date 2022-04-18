<template>
  <div>
    <!-- 路由容器 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isIndexShow: false
    }
  },
  methods: {
    isLogin (e) {
      this.isIndexShow = e
    }
  }
}
</script>

<style>
</style>
