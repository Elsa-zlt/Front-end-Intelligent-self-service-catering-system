<template>
    <Select style="width:200px" :placeholder="text" @on-select="handleSelectItem">
      <Option v-for="item in itemArray" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: null
    },
    itemArray: {
      type: Array,
      default: null
    }
  },
  methods: {
    // 在调用该组件的组件中，应自定义事件select用于接收选择结果
    handleSelectItem (e) {
      this.$emit('select', e.value)
    }
  }
}
</script>

<style scoped>

</style>
