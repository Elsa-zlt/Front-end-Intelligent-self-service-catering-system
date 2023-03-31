<template>
  <div class="container">
    <div class="data">
      <div>
        <div class="month">
          <span>本月{{title}}总{{unit}}</span>
          <div class="num">{{monthData}}</div>
          <div class="compare">
            <span class="iconfont" :class="{green: monthAvg > 0}" v-if="monthAvg > 0">&#xec41;</span>
            <span class="iconfont" :class="{red: monthAvg < 0}" v-else>&#xe632;</span>
            <span class="text">{{monthAvgchange}}%同比上月</span>
          </div>
        </div>
        <div class="week">
          <span>本周{{title}}总{{unit}}</span>
          <div class="num">{{weekData}}</div>
          <div class="compare">
            <span class="iconfont" :class="{green: weekAvg > 0}" v-if="weekAvg > 0">&#xec41;</span>
            <span class="iconfont" :class="{red: weekAvg < 0}" v-else>&#xe632;</span>
            <span class="text">{{weekAvgchange}}%同比上周</span>
          </div>
        </div>
      </div>
    </div>
    <div :id="eachId" class="img" style="width: 938px;height: 420px"></div>
    <TimeRange class='time' @chooseFirst="handleToday" @chooseSecond="handleWeek" @chooseThird="handleMonth"></TimeRange>
    <DateV class="date"></DateV>
  </div>
</template>

<script>
import DateV from './Date.vue'
import TimeRange from './TimeRange.vue'
import * as echarts from 'echarts'
import axios from 'axios'
import service from '@/utils/http'

export default {
  props: {
    eachId: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    unit: {
      type: String,
      default: null
    }
  },
  components: {
    TimeRange,
    DateV
  },

  data () {
    return {
      monthData: 0,
      weekData: 0,
      monthAvg: 0,
      weekAvg: 0,
      data: [],
      SaleEchartsValue: [0, 0, 0, 0, 0, 0, 0],
      SaleEchartsDays: []
    }
  },

  methods: {
    handleToday (date) {
      // 获取当天的日期
      console.log('today')
      console.log(date)
    },
    handleWeek (date) {
      // 获取当前星期，星期一到星期日的日期
      console.log('week', date)
    },
    handleMonth (date) {
      // 获取第一天和最后一天的日期
      console.log('month', date)
    },
    // 初始化折线图
    setOrderEcharts (id, data) {
      var chartDom = document.getElementById(id)
      var myChart = echarts.init(chartDom)
      var dataName = []
      var dataValue = []
      data.forEach(item => {
        dataName.push(item.name)
        dataValue.push(item.value)
      })

      var option = {
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'category',
          data: dataName
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: dataValue,
          type: 'line',
          lineStyle: {
            color: '#85aaf6' // 改变折线颜色
          }
        }]
      }

      option && myChart.setOption(option)
    },
    async getSaleEcharts () {
      console.log(this.SaleEchartsDays)
      service.post('getSaleEchartsByDate', {
        data: this.SaleEchartsDays[0]
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res)
          this.SaleEchartsValue[0] = res.data.data.income
        })
      service.post('getSaleEchartsByDate', {
        data: this.SaleEchartsDays[1]
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data.expend)
          this.SaleEchartsValue[1] = res.data.data.income
        })
      service.post('getSaleEchartsByDate', {
        data: this.SaleEchartsDays[2]
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data.expend)
          this.SaleEchartsValue[2] = res.data.data.income
        })
      service.post('getSaleEchartsByDate', {
        data: this.SaleEchartsDays[3]
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data.expend)
          this.SaleEchartsValue[3] = res.data.data.income
        })
      service.post('getSaleEchartsByDate', {
        data: this.SaleEchartsDays[4]
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data.expend)
          this.SaleEchartsValue[4] = res.data.data.income
        })
      service.post('getSaleEchartsByDate', {
        data: this.SaleEchartsDays[5]
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data.expend)
          this.SaleEchartsValue[5] = res.data.data.income
        })
      service.post('getSaleEchartsByDate', {
        data: this.SaleEchartsDays[6]
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data.expend)
          this.SaleEchartsValue[6] = res.data.data.income

          this.setOrderEcharts(this.eachId, [
            { name: this.SaleEchartsDays[6], value: this.SaleEchartsValue[6] },
            { name: this.SaleEchartsDays[5], value: this.SaleEchartsValue[5] },
            { name: this.SaleEchartsDays[4], value: this.SaleEchartsValue[4] },
            { name: this.SaleEchartsDays[3], value: this.SaleEchartsValue[3] },
            { name: this.SaleEchartsDays[2], value: this.SaleEchartsValue[2] },
            { name: this.SaleEchartsDays[1], value: this.SaleEchartsValue[1] },
            { name: this.SaleEchartsDays[0], value: this.SaleEchartsValue[0] }
          ])
        })
    },
    async getDay () {
      const days = []
      // eslint-disable-next-line no-tabs
      for (let i = 0; i <= 24 * 6; i += 24) {		// 今天加上前6天
        const dateItem1 = new Date()
        const dateItem = new Date(dateItem1.getTime() - i * 60 * 60 * 1000)// 使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
        const y = dateItem.getFullYear()// 获取年份
        let m = dateItem.getMonth() + 1// 获取月份js月份从0开始，需要+1
        let d = dateItem.getDate()// 获取日期
        m = this.addDate0(m)// 给为单数的月份补零
        d = this.addDate0(d)// 给为单数的日期补零
        const valueItem = y + '-' + m + '-' + d// 组合
        days.push(valueItem)// 添加至数组
      }
      console.log('最近七天日期：', days)
      this.SaleEchartsDays = days
      return days
    },

    addDate0 (time) {
      if (time.toString().length === 1) {
        time = '0' + time.toString()
      }
      return time
    }
  },

  computed: {
    monthAvgchange () {
      return Math.abs(this.monthAvg)
    },
    weekAvgchange () {
      return Math.abs(this.weekAvg)
    }
  },

  mounted () {
    this.getDay()
    this.getSaleEcharts()
    axios.get(this.url).then(res => {
      // console.log(res)
    })

    axios.get(this.url).then(res => {
      this.monthData = res.data.result.monthOrder
      this.weekData = res.data.result.weekOrder
      this.monthAvg = res.data.result.monthAvg
      this.weekAvg = res.data.result.weekAvg
      // this.setOrderEcharts(this.eachId, res.data.result.data)
    })
  }
}
</script>

<style scoped lang='less'>
.container {
  position: relative;
  display: flex;
  height: 420px;
  .data {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 180px;
    height: 100%;
    border-right: 1px solid #dfdfdf;
    .month, .week {
      width: 100%;
      color: #666;
      font-size: 16px;
      .num {
        font-size: 30px;
      }
      .compare {
        .text {
          color: #ccc;
        }
        .green {
          color: #33cc00;
        }
        .red {
          color: #ff0033;
        }
      }
    }
    .month {
      margin-bottom: 50px;
    }
  }
  .img {
    margin-top: 24px;
  }
  .time {
    position: absolute;
    top: 10px;
    right: 240px;
  }
  .date {
    position: absolute;
    top: 11px;
    right: 20px;
  }
}
// 上下箭头字体
// @font-face {
//   font-family: 'iconfont';  /* Project id 2714555 */
//   src: url('//at.alicdn.com/t/font_2714555_l1a4upkoe6.woff2?t=1629792812524') format('woff2'),
//        url('//at.alicdn.com/t/font_2714555_l1a4upkoe6.woff?t=1629792812524') format('woff'),
//        url('//at.alicdn.com/t/font_2714555_l1a4upkoe6.ttf?t=1629792812524') format('truetype');
// }
</style>
