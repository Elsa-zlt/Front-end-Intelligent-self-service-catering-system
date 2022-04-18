<template>
    <Row>
        <Col span="12">
            <DatePicker :type="type1" placement="bottom-end" :placeholder="placeholder1" style="width: 200px" format="yyyy/MM/dd" @on-change="handleChooseDate" @on-open-change="handleOpenDate"></DatePicker>
        </Col>
    </Row>
</template>
<script>
export default {
  props: {
    type1: {
      type: String,
      default: 'daterange'
    },
    placeholder1: {
      type: String,
      default: '请选择日期'
    }
  },
  methods: {
    handleChooseDate (date) {
      this.$emit('getDate', date)
    },
    handleOpenDate (e) {
      console.log('打开/关闭日历选择器', e)
    }
  }
}
</script>
