<template>
    <div class="page">
      <Page :total="totalData" show-elevator @on-change="handleChangePage"/>
    </div>
</template>
<script>
export default {
  props: {
    totalData: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dataLength: 0,
      pageIndex: 0
    }
  },
  methods: {
    handleChangePage (e) {
      this.$emit('returnPage', e)
    }
  }
}
</script>

<style scoped>
.page {
  margin-top: 20px;
}
</style>
