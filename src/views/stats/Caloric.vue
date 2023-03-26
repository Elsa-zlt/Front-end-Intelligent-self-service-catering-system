<template>
  <div>
    <Title>
      <template #title>
        <span>菜品热量统计</span>
      </template>
    </Title>
    <div class="content">
      <ClassifyTableStats :tableObj="classifyTable"></ClassifyTableStats>
      <CalorieTableStats :tableObj="calorieTable"></CalorieTableStats>
    </div>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
import ClassifyTableStats from '@/components/ClassifyTableStats'
import CalorieTableStats from '@/components/CalorieTableStats'

export default {
  components: {
    CalorieTableStats,
    ClassifyTableStats,
    Title
  },
  data () {
    return {
      // 菜品类目分析
      classifyTable: {
        title: '菜品类目分析',
        timeText: ['最近7天', '最近30天', '最近90天'],
        havePage: false,
        tableHead: [
          {
            title: '分类名称',
            key: 'mCategory',
            width: 150,
            align: 'center'
          },
          {
            title: '热量总计',
            key: 'totalCalorie',
            width: 150,
            align: 'center'
          },
          {
            title: '热量比例',
            key: 'percentageCalorie',
            width: 150,
            align: 'center'
          }
        ],
        url: '',
        tableWidth: '452'
      },
      // 菜品热量统计分析
      calorieTable: {
        title: '菜品热量统计分析',
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
            title: '热量',
            key: 'calorie',
            width: 150,
            align: 'center'
          },
          {
            title: '消费数量',
            key: 'num',
            width: 150,
            align: 'center'
          }
        ],
        url: '/calorie.json',
        tableWidth: '452'
      }
    }
  }
}
</script>

<style scoped lang='less'>
.content {
  width: 1100px;
  margin: 0 auto;
}
</style>
