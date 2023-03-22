<template>
  <div class="assess">
    <Title>
      <template #title>
        <span>用户评分管理</span>
      </template>
    </Title>
    <EvaluateTablePage :chooseComponent="tableObj" url='' edit="修改" del="结束"></EvaluateTablePage>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
// import BaseTable from '../../components/BaseTablePage.vue'
import EvaluateTablePage from '@/components/EvaluateTablePage'

export default {
  components: {
    Title,
    EvaluateTablePage
  },
  data () {
    return {
      // 初始化数据表信息的对象
      tableObj: {
        tableHead: [
          {
            title: '编号',
            key: 'consumerId',
            width: 70,
            align: 'center'
          },
          {
            title: '订单编号',
            key: 'orderId',
            width: 180,
            align: 'center'
          },
          {
            title: '菜品编号',
            key: 'menuId',
            width: 160,
            align: 'center'
          },
          {
            title: '评价内容',
            key: 'opinion',
            width: 150,
            align: 'center',
            tooltip: true
          },
          {
            title: '打分',
            key: 'score',
            width: 120,
            align: 'center'
          },
          {
            title: '评价时间',
            key: 'time',
            width: 200,
            align: 'center'
          },
          {
            title: '设置',
            slot: 'action',
            width: 120,
            align: 'center'
          }
        ],
        tableWidth: '1002',
        haveSelct: true,
        haveSearch: true,
        havePage: true,
        haveDate: true,
        isBorder: true,
        isStripe: true
      }
    }
  },
  methods: {

  }
}
</script>
