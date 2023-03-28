<template>
  <div>
    <Title>
      <template #title>
        <span>菜品喜爱统计</span>
      </template>
    </Title>
    <div class="content">
      <CategoryPriceTableStats :tableObj="classifyTable"></CategoryPriceTableStats>
      <MenuPriceStatsTable :tableObj="likeTable"></MenuPriceStatsTable>
    </div>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
import CategoryPriceTableStats from '@/components/CategoryPriceTableStats'
import MenuPriceStatsTable from '@/components/MenuPriceStatsTable'

export default {
  components: {
    MenuPriceStatsTable,
    CategoryPriceTableStats,
    Title
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
            key: 'category',
            width: 150,
            align: 'center'
          },
          {
            title: '销售数量',
            key: 'num',
            width: 150,
            align: 'center'
          },
          {
            title: '数量比例',
            key: 'ratio',
            width: 150,
            align: 'center'
          },
          {
            title: '销售金额',
            key: 'totalPrice',
            width: 150,
            align: 'center'
          },
          {
            title: '金额比例',
            key: 'totalPriceRatio',
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
            title: '销售数量',
            key: 'num',
            width: 150,
            align: 'center'
          },
          {
            title: '数量比例',
            key: 'ratio',
            width: 150,
            align: 'center'
          },
          {
            title: '销售金额',
            key: 'totalPrice',
            width: 150,
            align: 'center'
          },
          {
            title: '金额比例',
            key: 'totalPriceRatio',
            width: 150,
            align: 'center'
          }
        ],
        url: '',
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
