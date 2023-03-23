<template>
  <div class="complaint">
    <Title>
      <template #title>
        <span>用户投诉管理</span>
      </template>
    </Title>
    <FeedbackTablePage :chooseComponent="tableObj" url="" edit="反馈" del="结束"></FeedbackTablePage>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
import FeedbackTablePage from '@/components/FeedbackTablePage'

export default {
  components: {
    Title,
    FeedbackTablePage
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
            title: '用户编号',
            key: 'consumerId',
            width: 150,
            align: 'center'
          },
          {
            title: '用户投诉时间',
            key: 'feedbackManagerTime',
            width: 200,
            align: 'center'
          },
          {
            title: '投诉内容',
            key: 'feedbackComplaint',
            width: 150,
            align: 'center',
            tooltip: true
          },
          {
            title: '状态',
            key: 'feedbackStatus',
            slot: 'status_c',
            width: 120,
            align: 'center'
          },
          {
            title: '管理员反馈内容',
            key: 'returnOpinion',
            width: 200,
            align: 'center'
          },
          {
            title: '管理员反馈时间',
            key: 'feedbackManagerTime',
            width: 200,
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
