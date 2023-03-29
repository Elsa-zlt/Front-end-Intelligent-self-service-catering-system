<template>
  <div>
    <Title>
      <template #title>
        <span>收支统计</span>
      </template>
    </Title>
    <div class="content">
      <!-- 数值统计 -->
      <div class="totalIncome">
        <div class="each">
          <div>
            <div class="text">收入总数</div>
            <div class="num">￥20000元</div>
          </div>
        </div>
        <div class="each">
          <div>
            <div class="text">今日营收</div>
            <div class="num">￥20000元</div>
          </div>
        </div>
        <div class="each">
          <div>
            <div class="text">昨日营收</div>
            <div class="num">￥20000元</div>
          </div>
        </div>
        <div class="each">
          <div>
            <div class="text">本月营收</div>
            <div class="num">￥20000元</div>
          </div>
        </div>
        <div class="each">
          <div>
            <div class="text">本年营收</div>
            <div class="num">￥20000元</div>
          </div>
        </div>
      </div>

      <!-- 销售统计 -->
      <DetailCard padding="0 20px" class="saleStats">
          <template #title>
            销售统计
          </template>
          <template #content>
            <div class="container">
              <div class="data">
                <div>
                  <div class="income">
                    <span>本月销售总额</span>
                    <div class="num">{{incomeNum}}</div>
                    <div class="compare">
                      <span class="iconfont" :class="{green: incomeAvg > 0}" v-if="incomeAvg > 0">&#xec41;</span>
                      <span class="iconfont" :class="{red: incomeAvg < 0}" v-else>&#xe632;</span>
                      <span class="text">{{incomeAvg}}%同比上月</span>
                    </div>
                  </div>
                  <div class="spend">
                    <span>本月支出总额</span>
                    <div class="num">{{spendNum}}</div>
                    <div class="compare">
                      <span class="iconfont" :class="{green: spendAvg > 0}" v-if="spendAvg > 0">&#xec41;</span>
                      <span class="iconfont" :class="{red: spendAvg < 0}" v-else>&#xe632;</span>
                      <span class="text">{{spendAvg}}%同比上月</span>
                    </div>
                  </div>
                </div>
              </div>
              <div id="saleImg" style="width: 908px;height: 400px"></div>
              <TimeRange class='time' first="本日" second="本月" third="本年" @chooseFirst="handleFirst" @chooseSecond="handleSecond" @chooseThird="handleThird"></TimeRange>
              <Date class="date"  type1="month" placeholder1="请选择月份"></Date>
            </div>
          </template>
      </DetailCard>

      <!-- 交易统计 -->
      <DetailCard class="tradeStats" padding="0">
        <template #title>
          交易统计
        </template>
        <template #content>
          <div class="container">
            <div id="tradeImg" style="width:1100px;height:470px"></div>
            <TimeRange class='time' first="本日" second="本月" third="本年" @chooseFirst="handleFirst" @chooseSecond="handleSecond" @chooseThird="handleThird"></TimeRange>
            <Date class="date"  type1="month" placeholder1="请选择月份"></Date>
          </div>
        </template>
      </DetailCard>

      <!-- 菜品收支统计 -->
      <DetailCard class="dishStats">
        <template #title>
          菜品收支统计
        </template>
        <template #content>
          <div class="container">
            <div class="condition">
              <Search class="search"></Search>
              <TimeRange class="time" first="本日" second="本月" third="本年"  @chooseFirst="handleFirst" @chooseSecond="handleSecond" @chooseThird="handleThird"></TimeRange>
              <Date class="date"></Date>
            </div>
            <Table class="table" :isBorder="true" :isStripe="true" :head="dishTableHead" :body="dishTableBody" width1="'960px'" editText="编辑" delText="删除"></Table>
            <Page class="page" :totalData="dishTotal" @returnPage="handleDishReturnPage"></Page>
          </div>
        </template>
      </DetailCard>

      <!-- 用户个人统计 -->
      <DetailCard class="userStats">
        <template #title>
          用户个人统计
        </template>
        <template #content>
          <div class="container">
            <div class="condition">
              <Search class="search"></Search>
              <TimeRange class="time" first="本日" second="本月" third="本年" @chooseFirst="handleFirst" @chooseSecond="handleSecond" @chooseThird="handleThird"></TimeRange>
              <Date class="date"></Date>
            </div>
            <div class="table">
              <Table class="table1" :isBorder="true" :isStripe="true" :head="userTableHead" :body="userTableBody" width1="'902px'" editText="编辑" delText="删除"></Table>
            </div>
            <Page class="page" :totalData="userTotal" @returnPage="handleUserReturnPage"></Page>
          </div>
        </template>
      </DetailCard>
    </div>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
import DetailCard from '../../components/DetailCard.vue'
import Date from '../../components/Date.vue'
import Search from '../../components/Search.vue'
import Table from '../../components/Table.vue'
import Page from '../../components/Page.vue'
import TimeRange from '../../components/TimeRange.vue'
import * as echarts from 'echarts'
import axios from 'axios'
import service from "@/utils/http";

export default {
  components: {
    Title,
    DetailCard,
    Search,
    Table,
    Page,
    Date,
    TimeRange
  },
  data () {
    return {
      incomeNum: 10000,
      spendNum: 20000,
      incomeAvg: 10,
      spendAvg: -20,
      // 菜品收支统计表 (id=4, name=西红柿, price=5, state=已上架, look=82, num=3, income=15, expand=12, profit=3)
      dishTableHead: [
        {
          title: '编号',
          key: 'id',
          width: 70,
          align: 'center'
        },
        {
          title: '菜品名称',
          key: 'name',
          width: 120,
          align: 'center'
        },
        {
          title: '单价',
          key: 'price',
          width: 80,
          align: 'center'
        },
        {
          title: '菜品状态',
          key: 'state',
          width: 100,
          slot: 'status_d',
          align: 'center'
        },
        {
          title: '浏览数',
          key: 'look',
          width: 116,
          align: 'center'
        },
        {
          title: '总销售量',
          key: 'num',
          width: 100,
          align: 'center'
        },
        {
          title: '销售总额',
          key: 'income',
          width: 120,
          align: 'center'
        },
        {
          title: '支出总额',
          key: 'expand',
          width: 120,
          align: 'center'
        },
        {
          title: '利润总额',
          key: 'profit',
          width: 120,
          align: 'center'
        },
        {
          title: '设置',
          slot: 'action',
          width: 110,
          align: 'center'
        }
      ],
      allDishTableBody: [],
      dishTableBody: [],
      dishTotal: 0,
      // 用户个人统计表
      userTableHead: [
        {
          title: '用户编号',
          key: 'id',
          width: 100,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'name',
          width: 130,
          align: 'center'
        },
        {
          title: '电话号码',
          key: 'phone',
          width: 150,
          align: 'center'
        },
        {
          title: '性别',
          key: 'sex',
          slot: 'sex',
          width: 80,
          align: 'center'
        },
        {
          title: '菜品数量',
          key: 'num',
          width: 100,
          align: 'center'
        },
        {
          title: '支出总额',
          key: 'expend',
          width: 110,
          align: 'center'
        },
        {
          title: '热量总计',
          key: 'calorie',
          width: 120,
          align: 'center'
        },
        {
          title: '设置',
          key: 'action',
          slot: 'action',
          width: 110,
          align: 'center'
        }
      ],
      allUserTableBody: [],
      userTableBody: [],
      userTotal: 0,
      TradeEchartsNum1: 10,
      TradeEchartsNum2: 0,
      TradeEchartsNum3: 0,
      TradeEchartsNum4: 0,
      TradeEchartsNum5: 0,
      TradeEchartsNum6: 0,
      TradeEchartsNum7: 0
    }
  },
  methods: {
    handleFirst (date) {
      // 获取当天的日期
      console.log('first', date)
      // 发送请求，接收到返回参数后，调用初始化Echarts图的方法即可
    },
    handleSecond (date) {
      // 获取当前星期，星期一到星期日的日期
      console.log('second', date)
      // 发送请求，接收到返回参数后，调用初始化Echarts图的方法即可
    },
    handleThird (date) {
      // 获取第一天和最后一天的日期
      console.log('third', date)
      // 发送请求，接收到返回参数后，调用初始化Echarts图的方法即可
    },

    // 初始化销售堆叠区域折线图
    setSaleEcharts (id, data) {
      var chartDom = document.getElementById(id)
      var myChart = echarts.init(chartDom)
      var dataDate = []
      var dataIncome = []
      var dataPay = []
      data.forEach(item => {
        dataDate.push(item.name)
        dataIncome.push(item.income)
        dataPay.push(item.pay)
      })

      var option = {
        title: {
          text: '销售统计',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#808080'
          },
          left: '20'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['收入', '支出'],
          right: 20
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: dataDate
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          // 堆叠面积图
          // {
          //   name: '支出',
          //   type: 'line',
          //   stack: '总量',
          //   areaStyle: {},
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: dataPay,
          //   color: '#bcf8e1'
          // },
          // {
          //   name: '收入',
          //   type: 'line',
          //   stack: '总量',
          //   areaStyle: {},
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: dataIncome,
          //   color: '#adc8ff'
          // }

          // 两条折线
          {
            name: '收入',
            type: 'line',
            data: dataIncome,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '支出',
            type: 'line',
            data: dataPay,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }

      option && myChart.setOption(option)
    },

    // 初始化交易统计柱状图
    setTradeEcharts (id, data) {
      var chartDom = document.getElementById(id)
      var myChart = echarts.init(chartDom)
      var dataName = []
      var dataNum = []
      data.forEach(item => {
        console.log(item)
        dataName.push(item.name)
        dataNum.push(item.num)
      })
      var option = {
        xAxis: {
          type: 'category',
          data: dataName
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          x: '13%',
          y: '20%',
          y2: '11%'
        },
        series: [{
          data: dataNum,
          type: 'bar',
          barWidth: 60,
          color: '#73a0fa'
        }]
      }
      option && myChart.setOption(option)
    },

    // 请求菜品统计表数据
    getDishStatsData () {
      axios.get('/').then(res => {
        // this.allDishTableBody = res.data.result.array
        // this.dishTotal = res.data.result.array.length
        // this.dishTableBody = this.allDishTableBody.slice(0, 10)
        // console.log(this.tableData)
      })
      service.post('getMenuIncomeExpenseByTime', {
        data: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.allDishTableBody = res.data.data
          this.dishTableBody = res.data.data.slice(0, 10)
          this.dishTotal = res.data.data.length
          console.log(this.allDishTableBody)
        })
    },
    // 请求用户个人统计数据
    getUserStatsData () {
      axios.get('/userStats.json').then(res => {
        // console.log(res)
        // this.allUserTableBody = res.data.result.array
        // this.userTotal = res.data.result.array.length
        // this.userTableBody = this.allUserTableBody.slice(0, 10)
      })
      service.post('getUserPersonalByTime', {
        data: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.allUserTableBody = res.data.data
          this.userTableBody = res.data.data.slice(0, 10)
          this.userTotal = res.data.data.length
          console.log(this.allDishTableBody)
        })
    },

    // 菜品收支统计分页
    handleDishReturnPage (data) {
      this.dishTableBody = this.allDishTableBody.slice((data - 1) * 10, data * 10)
    },

    // 用户个人统计分页
    handleUserReturnPage (data) {
      this.userTableBody = this.allUserTableBody.slice((data - 1) * 10, data * 10)
    },

    async getTradeEcharts () {
      service.post('getTradeEchartsByPriceAndDate', {
        LowPrice: '0',
        HighPrice: '10',
        date: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.TradeEchartsNum1 = res.data.data
        })

      service.post('getTradeEchartsByPriceAndDate', {
        LowPrice: '11',
        HighPrice: '20',
        date: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.TradeEchartsNum2 = res.data.data
        })

      service.post('getTradeEchartsByPriceAndDate', {
        LowPrice: '21',
        HighPrice: '30',
        date: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.TradeEchartsNum3 = res.data.data
        })

      service.post('getTradeEchartsByPriceAndDate', {
        LowPrice: '31',
        HighPrice: '40',
        date: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.TradeEchartsNum4 = res.data.data
        })

      service.post('getTradeEchartsByPriceAndDate', {
        LowPrice: '41',
        HighPrice: '50',
        date: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.TradeEchartsNum5 = res.data.data
        })

      service.post('getTradeEchartsByPriceAndDate', {
        LowPrice: '51',
        HighPrice: '60',
        date: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.TradeEchartsNum6 = res.data.data
        })

      service.post('getTradeEchartsByPriceAndDate', {
        LowPrice: '61',
        HighPrice: '100000000',
        date: '20230323'
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.TradeEchartsNum7 = res.data.data
          this.setTradeEcharts('tradeImg', [
            { name: '0-10元', num: this.TradeEchartsNum1 },
            { name: '11-20元', num: this.TradeEchartsNum2 },
            { name: '21-30元', num: this.TradeEchartsNum3 },
            { name: '31-40', num: this.TradeEchartsNum4 },
            { name: '41-50', num: this.TradeEchartsNum5 },
            { name: '50-60', num: this.TradeEchartsNum6 },
            { name: '61元以上', num: this.TradeEchartsNum7 }
          ])
        })
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
    this.setSaleEcharts('saleImg', [
      { name: '08-23', income: 220, pay: 120 },
      { name: '08-24', income: 182, pay: 132 },
      { name: '08-25', income: 191, pay: 101 },
      { name: '08-26', income: 234, pay: 134 },
      { name: '08-27', income: 290, pay: 90 },
      { name: '08-28', income: 330, pay: 230 },
      { name: '08-29', income: 310, pay: 200 }
    ])

    this.getTradeEcharts()


    // 请求菜品统计表数据
    this.getDishStatsData()
    // 请求用户个人统计表数据
    this.getUserStatsData()
  }
}
</script>

<style scoped lang='less'>
.content {
  width: 1100px;
  margin: 0 auto;

  .totalIncome, .saleStats, .tradeStats, .dishStats, .userStats {
    width: 100%!important;
  }
  // 统计总数部分
  .totalIncome {
    display: flex;
    justify-content: space-around;
    padding: 16px 0;
    margin-top: 10px;
    border-radius: 10px;
    background-color: #f2f2f2;
    .each {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 164px;
      height: 96px;
      background-color: #fff;
      color: #666;
      border: 1px solid #ccc;
      border-radius: 3px;
      .text {
        display: flex;
        justify-content: center;
        width: 100%;
        font: 20px "Arial Normal";
      }
      .num {
        display: flex;
        justify-content: center;
        width: 100%;
        font: 22px "微软雅黑";
      }
    }
  }

  // 销售统计
  .saleStats {
    margin-top: 30px;
    .container {
      position: relative;
      display: flex;
      height: 480px;
      .data {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 180px;
        height: 100%;
        border-right: 1px solid #dfdfdf;
        .income, .spend {
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
        .income {
          margin-bottom: 50px;
        }
      }
      #saleImg {
        margin-top: 70px;
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
  }

  // 交易统计
  .tradeStats {
    margin-top: 30px;
    .container {
      position: relative;
      #tradeImg {
        margin-top: 10px;
      }
      .time {
        position: absolute;
        top: 10px;
        right: 240px
      }
      .date {
        position: absolute;
        top: 11px;
        right: 20px
      }
    }
  }

  // 菜品收支统计 用户个人统计
  .dishStats, .userStats {
    margin-top: 30px;
    .container {
      // height: 625px;
      // box-sizing: border-box;
      .condition {
        display: flex;
        position: relative;
        width: 100%;
        height: 54px;
        .search {
          position: absolute;
          left: 0;
          width: 200px;
        }
        .time {
          position: absolute;
          right: 200px;
          margin-right: 100px;
        }
        .date {
          position: absolute;
          right: 0;
        }
      }
      .page {
        display: flex;
        justify-content: center;
      }
    }
  }
  .userStats {
    .container {
      .table {
        display: flex;
        justify-content: center;
        width: 100%;
        .table1 {
          width: 902px;
        }
      }
    }
  }
}
</style>
