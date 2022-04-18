<template>
  <div>
    <Title>
      <template #title>
        <span>菜品喜爱统计</span>
      </template>
    </Title>
    <div class="content">
      <TableStats :tableObj="classifyTable"></TableStats>
      <TableStats :tableObj="likeTable"></TableStats>
    </div>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
import TableStats from '../../components/TableStats.vue'

export default {
  components: {
    Title,
    TableStats
  },
  data () {
    return {
      // 菜品分类
      classifyTable: {
        title: '菜品类目销售分析',
        timeText: ['最近7天', '最近30天', '最近90天'],
        havePage: false,
        tableHead: [
          {
            title: '分类名称',
            key: 'classify',
            width: 150,
            align: 'center'
          },
          {
            title: '销售数量',
            key: 'saleNum',
            width: 150,
            align: 'center'
          },
          {
            title: '数量比例',
            key: 'numRatio',
            width: 150,
            align: 'center'
          },
          {
            title: '销售金额',
            key: 'saleMoney',
            width: 150,
            align: 'center'
          },
          {
            title: '金额比例',
            key: 'moneyRatio',
            width: 150,
            align: 'center'
          }
        ],
        url: '/classifyStats.json',
        tableWidth: '753'
      },

      // 菜品喜爱
      likeTable: {
        title: '菜品喜爱统计分析',
        timeText: ['最近7天', '最近30天', '最近90天'],
        havePage: true,
        tableHead: [
          {
            title: '菜品名称',
            key: 'name',
            width: 150,
            align: 'center'
          },
          {
            title: '浏览人数',
            key: 'visitNum',
            width: 150,
            align: 'center'
          },
          {
            title: '付款人数',
            key: 'payNum',
            width: 150,
            align: 'center'
          },
          {
            title: '销售数量',
            key: 'saleNum',
            width: 150,
            align: 'center'
          },
          {
            title: '销售金额',
            key: 'saleMoney',
            width: 150,
            align: 'center'
          }
        ],
        url: '/likeStats.json',
        tableWidth: '753'
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped lang='less'>
.content {
  // overflow: hidden;
  width: 1100px;
  margin: 0 auto;
  .classify, .favor {
    position: relative;
    margin-top: 30px;
    .date {
      position: absolute;
      top: 6px;
      right: 20px;
    }
    .time {
      position: absolute;
      top: 6px;
      right: 250px;
    }
    .table {
      display: flex;
      justify-content: center;
    }
    .page {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
