<template>
    <div>
      <Input search enter-button="搜索" placeholder="请输入搜索内容" @on-search="handleSearch" />
    </div>
</template>
<script>
export default {
  data () {
    return {
      context: ''
    }
  },
  methods: {
    handleSearch (data) {
      this.$emit('getSearch', data)
    }
  }
}
</script>
