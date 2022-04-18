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
    <Date class="date"></Date>
  </div>
</template>

<script>
import Date from './Date.vue'
import TimeRange from './TimeRange.vue'
import * as echarts from 'echarts'
import axios from 'axios'

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
    Date
  },

  data () {
    return {
      monthData: 0,
      weekData: 0,
      monthAvg: 0,
      weekAvg: 0,
      data: []
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
    axios.get(this.url).then(res => {
      // console.log(res)
    })

    axios.get(this.url).then(res => {
      this.monthData = res.data.result.monthOrder
      this.weekData = res.data.result.weekOrder
      this.monthAvg = res.data.result.monthAvg
      this.weekAvg = res.data.result.weekAvg
      this.setOrderEcharts(this.eachId, res.data.result.data)
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
