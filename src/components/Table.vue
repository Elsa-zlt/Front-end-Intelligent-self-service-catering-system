/* eslint-disable vue/no-parsing-error */
<template>
    <Table :border="isBorder" :stripe="isStripe" :columns="head" :data="body" :disabled-hover="disabledHover" class="table" :width="width1">
      <template slot-scope="{ index }" slot="action">
        <span class="edit"  @click="show(index)">{{ editText }}</span>
        <span class="del" @click="remove(index)">{{ delText }}</span>
      </template>
      <template slot-scope="{ row }" slot="status_c">
        {{row.status === 0 ? '未反馈' : '已反馈'}}
      </template>
      <template slot-scope="{ row }" slot="status_o">
        {{row.status === 0 ? '未完成' : '已完成'}}
      </template>
      <template slot-scope="{ row }" slot="status_d">
        {{row.status === 0 ? '未上架' : '已上架'}}
      </template>
      <template slot-scope="{ row }" slot="sex">
        {{row.sex === 0 ? '男' : '女'}}
      </template>
      <template slot-scope="{ row }" slot="increase">
        {{ row.increase }}%
        <span class="iconfont green">
          {{ row.increase > 0 ? '&#xec41;' : null }}
        </span>
        <span class="iconfont red">
          {{ row.increase > 0 ? null : '&#xec42;' }}
        </span>
      </template>
      <template slot-scope="{ row }" slot="img">
        <div class="box">
          <div class="img">
            <img :src="row.mPhoto">
          </div>
        </div>
      </template>
    </Table>
</template>
<script>
export default {
  props: {
    // 设置中左边的文字
    editText: {
      type: String
    },
    // 设置中右边的文字
    delText: {
      type: String
    },
    isStripe: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: false
    },
    head: {
      type: Array,
      default: null
    },
    body: {
      type: Array,
      default: null
    },
    width1: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      disabledHover: true
    }
  },
  methods: {
    show (index) {
      console.log(index)
    },
    remove (index) {
      this.body.splice(index, 1)
    }
  }
}
</script>

<style scoped lang='less'>
.ivu-table-border {
  border: none!important;;
}
.edit {
  color: #0033CC;
  margin-right: 13px;
  cursor: pointer;
}
.del {
  color: #FF0066;
  cursor: pointer;
}
.green {
  color: #15af62;
}
.red {
  color: #f36357;
}
.box {
  display: flex;
  justify-content: center;
  .img {
    overflow: hidden;
    width: 80px;
    height: 60px;
    margin: 10px 0;
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
// 上下箭头字体
@font-face {
  font-family: 'iconfont';  /* Project id 2714555 */
  src: url('//at.alicdn.com/t/font_2714555_l1a4upkoe6.woff2?t=1629792812524') format('woff2'),
       url('//at.alicdn.com/t/font_2714555_l1a4upkoe6.woff?t=1629792812524') format('woff'),
       url('//at.alicdn.com/t/font_2714555_l1a4upkoe6.ttf?t=1629792812524') format('truetype');
}
</style>
