<template>
  <div class="complaint">
    <Title>
      <template #title>
        <span>用户投诉管理</span>
      </template>
    </Title>
    <BaseTable :chooseComponent="tableObj" url="/feedback.json
    " edit="反馈" del="结束"></BaseTable>
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
        selectText: '请选择反馈状态',
        selectArr: [
          {
            value: 0,
            label: '未反馈'
          },
          {
            value: 1,
            label: '已反馈'
          }
        ],
        tableHead: [
          {
            title: '编号',
            key: 'num',
            width: 70,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'cumstomerName',
            width: 150,
            align: 'center'
          },
          {
            title: '用户电话',
            key: 'cumstomerPhone',
            width: 200,
            align: 'center'
          },
          {
            title: '投诉内容',
            key: 'complaint',
            width: 150,
            align: 'center',
            tooltip: true
          },
          {
            title: '状态',
            key: 'status',
            slot: 'status_c',
            width: 120,
            align: 'center'
          },
          {
            title: '投诉时间',
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
        tableWidth: '1012',
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
