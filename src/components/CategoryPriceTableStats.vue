<template>
  <div class="container">
    <DetailCard width="1100px">
      <template #title>
        {{ tableObj.title }}
      </template>
      <template #content>
        <Date class="date"></Date>
        <TimeRange class="time" :first="tableObj.timeText[0]" :second="tableObj.timeText[1]" :third="tableObj.timeText[2]" @chooseFirst="handleFirst" @chooseSecond="handleSecond" @chooseThird="handleThird"></TimeRange>
        <div class="table">
          <Table :head="tableObj.tableHead" :body="tableBody" :isBorder="true" :isStripe="true" :width1="tableObj.tableWidth"></Table>
        </div>
        <Page class="page" v-if="tableObj.havePage" @returnPage="handleReturnPage" :totalData="tableLength"></Page>
      </template>
    </DetailCard>
  </div>
</template>

<script>
import DetailCard from './DetailCard.vue'
import Table from './Table.vue'
import Date from './Date.vue'
import TimeRange from './TimeRange.vue'
import Page from './Page.vue'
import axios from 'axios'
import service from '@/utils/http'

export default {
  components: {
    DetailCard,
    Table,
    TimeRange,
    Date,
    Page
  },
  props: {
    tableObj: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        // 详情卡标题
        title: '',
        // 时间范围的文字
        timeText: [],
        // 是否有分页器
        havePage: false,
        // 表头
        tableHead: [],
        // 表数据请求地址
        url: '',
        // 表宽度
        tableWidth: ''

      }
    }
  },
  data () {
    return {
      allTableBody: [],
      tableBody: [],
      tableLength: 0
    }
  },
  methods: {
    getTableDate (url, date) {
      // if (url === '/likeStats.json' || url === '/calorie.json') {
      //   axios.get(url).then(res => {
      //     this.allTableBody = res.data.result.array
      //     this.tableBody = res.data.result.array.slice(0, 10)
      //     this.tableLength = res.data.result.array.length
      //   })
      // } else if (url === '/classifyStats.json' || url === '/classify.json') {
      //   axios.get(url).then(res => {
      //     this.tableBody = res.data.result.array
      //   })
      // }
      service.post('getCategoryPriceByTime', {
        data: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.allTableBody = res.data.data
          this.tableBody = res.data.data.slice(0, 10)
          this.tableLength = res.data.data.length
          var table = this.allTableBody.slice(0, 10)
          this.tableData = table
          console.log(table)
        })
    },
    handleFirst (date) {
      // 获取当天的日期
      console.log('first', date)
    },
    handleSecond (date) {
      // 获取当前星期，星期一到星期日的日期
      console.log('second', date)
    },
    handleThird (date) {
      // 获取第一天和最后一天的日期
      console.log('third', date)
    },
    // 菜品喜爱分页
    handleReturnPage (data) {
      this.tableBody = this.allTableBody.slice((data - 1) * 10, data * 10)
    }
  },
  mounted () {
    this.getTableDate(this.tableObj.url, '2021/8/30')
    console.log(this.tableObj.url)
  }
}
</script>

<style scoped lang='less'>
.container {
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
</style>
