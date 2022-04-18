<template>
  <div class="user">
    <Title>
      <template #title>
        <span>订单信息</span>
      </template>
    </Title>
    <BaseTable :chooseComponent="tableObj" url='/order.json'></BaseTable>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
import BaseTable from '../../components/BaseTablePage.vue'

export default {
  components: {
    Title,
    BaseTable
  },
  data () {
    return {
      // 初始化数据表信息的对象
      tableObj: {
        selectText: '请选择状态',
        selectArr: [
          {
            value: 0,
            label: '未取餐'
          },
          {
            value: 1,
            label: '已取餐'
          }
        ],
        tableHead: [
          {
            type: 'selection',
            width: 54,
            align: 'center'
          },
          {
            title: '订单编号',
            key: 'orderId',
            width: 150,
            align: 'center'
          },
          {
            title: '用户信息',
            key: 'comsumerMsg',
            width: 150,
            align: 'center'
          },
          {
            title: '订单总价',
            key: 'orderTotalPrice',
            width: 120,
            align: 'center'
          },
          {
            title: '订单状态',
            slot: 'status_o',
            width: 100,
            align: 'center',
            tooltip: true
          },
          {
            title: '菜品信息',
            key: 'dishMsg',
            width: 150,
            align: 'center'
          },
          {
            title: '下单时间',
            key: 'orderTime',
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
        tableWidth: '1046',
        haveSelect: true,
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
