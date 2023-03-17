<template>
  <div class="user">
    <Title>
      <template #title>
        <span>订单信息</span>
      </template>
    </Title>
    <OrderTablePage :chooseComponent="tableObj" url=''></OrderTablePage>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
// import BaseTable from '../../components/BaseTablePage.vue'
import OrderTablePage from '@/components/OrderTablePage'

export default {
  components: {
    Title,
    OrderTablePage
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
            key: 'oId',
            width: 150,
            align: 'center'
          },
          {
            title: '用户信息',
            key: 'cId',
            width: 150,
            align: 'center'
          },
          {
            title: '订单总价',
            key: 'oTotalPrice',
            width: 120,
            align: 'center'
          },
          {
            title: '订单状态',
            key: 'oStatus',
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
            key: 'oTime',
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
