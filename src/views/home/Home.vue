/* eslint-disable no-unused-vars */
<template>
  <div>
    <Title>
      <template #title>
        <span>首页 </span><span>{{hello}}</span>
      </template>
    </Title>
    <div class="content">
      <!-- 餐厅信息 -->
      <DetailCard id="restaurant" padding="10px 45px 20px">
        <template #title>
          餐厅详情
        </template>
        <template #content>
          <div class="r_msg">
            <div class="img">
              <img src="https://n.sinaimg.cn/sinakd10121/400/w1000h1000/20200325/0a54-irkazzv1018453.png">
            </div>
            <div class="msg">
              <div class="name">{{resName}}</div>
              <div class="time">
                <span class="iconfont icon-shizhong"></span>
                {{resOpenTime}}
              </div>
              <div class="add">
                <span class="iconfont icon-ditu-dibiao"></span>
                {{resAddress}}
              </div>
            </div>
            <div class="detail">餐厅详情</div>
          </div>
        </template>
      </DetailCard>

      <!-- 销售情况 -->
      <DetailCard id="sale" padding="20px 80px">
        <template #title>
          销售情况
        </template>
        <template #content>
          <div class="detail">
            <div class="income">
              <div class="today">
                <div class="text">今日销售额 (元)</div>
                <div class="time">截止5分钟前</div>
              </div>
              <div class="num">{{totalPrice}}</div>
            </div>
            <div class="total">
              <div class="today">
                <div class="text">今日订单总数</div>
                <div class="time">截止5分钟前</div>
              </div>
              <div class="num">{{orderNums}}</div>
            </div>
          </div>
        </template>
      </DetailCard>

      <!-- 热门搜索 销售额占比 -->
      <div id="hotData">
        <DetailCard id="hot" width="565px">
          <template #title>
            热门搜索
          </template>
          <template #content>
            <div class="stats">
              <div class="total">
                <div class="text">
                  搜索用户数
                </div>
                <div class="pic">
                  <img src="../../assets/热门搜索.png" alt="">
                </div>
              </div>
              <div class="each">
                <div class="text">
                  人均搜索次数
                </div>
                <div class="pic">
                  <img src="../../assets/热门搜索.png" alt="">
                </div>
              </div>
            </div>
            <div class="table">
              <Table :width1="'525px'" :head="tableHead" :body="tableData"></Table>
            </div>
          </template>
        </DetailCard>
        <DetailCard id="classify" width="565px">
          <template #title>
            销售额类别占比
          </template>
          <template #content>
            <TimeRange @chooseFirst="handleToday" @chooseSecond="handleWeek" @chooseThird="handleMonth"></TimeRange>
            <div class="stats">
              <!-- <span class="text">销售额</span> -->
              <div id="img_classify" style="width:525px;height:412px;"></div>
            </div>
          </template>
        </DetailCard>
      </div>

      <!-- 订单统计 -->
      <DetailCard id="order" padding="0 20px">
        <template #title>
          订单统计
        </template>
        <template #content>
          <LineEcharts eachId="img_order"  url="/orderStats.json" title="订单" unit="数"></LineEcharts>
        </template>
      </DetailCard>

      <!-- 销售统计 -->
      <DetailCard id="saleStats" padding="0 20px">
        <template #title>
          销售统计
        </template>
        <template #content>
          <LineEcharts eachId="img_sale" url="/saleStats.json" title="销售" unit="额"></LineEcharts>
        </template>
      </DetailCard>

      <!-- 商品总览 -->
      <div id="goods">
        <DetailCard width="565px">
          <template #title>
            商品总览
          </template>
          <template #content>
            <GoodTotalCard :textArr="['已下架', '已上架', '菜品种类', '菜品总数']" url="/goodsTotal.json"></GoodTotalCard>
          </template>
        </DetailCard>
        <DetailCard width="565px">
          <template #title>
            用户总览
          </template>
          <template #content>
            <TotalCard :textArr="['今日下单', '今日新增', '本月新增', '用户总数']" url="/goodsTotal.json"></TotalCard>
          </template>
        </DetailCard>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
import DetailCard from '../../components/DetailCard.vue'
import Table from '../../components/Table.vue'
import TimeRange from '../../components/TimeRange.vue'
import LineEcharts from '../../components/LineEcharts.vue'
import * as echarts from 'echarts'
import axios from 'axios'
import service from '../../utils/http.js'
import GoodTotalCard from '@/components/GoodTotalCard'
import TotalCard from '@/components/TotalCard'
// import axios from 'axios'

export default {
  components: {
    GoodTotalCard,
    Title,
    DetailCard,
    Table,
    TimeRange,
    LineEcharts,
    TotalCard
  },
  data () {
    return {
      resName: '',
      resOpenTime: '上午9点-下午9点',
      resAddress: '广东海洋大学',
      hello: '',
      totalPrice: '',
      orderNums: '',
      total: '',
      // 热门搜索的表
      tableHead: [
        {
          title: '编号',
          key: 'index',
          width: 100,
          align: 'center'
        },
        {
          title: '搜索关键词',
          key: 'word',
          width: 150,
          align: 'center'
        },
        {
          title: '用户数',
          key: 'num',
          width: 130,
          align: 'center'
        },
        {
          title: '周涨幅',
          key: 'increase',
          slot: 'increase',
          width: 142,
          align: 'center'
        }
      ],
      // 表数据
      tableData: [
        {
          index: '1',
          word: '菜品',
          num: '2,234',
          increase: 128,
          upOrDown: 'up'
        },
        {
          index: '2',
          word: '菜品',
          num: '2,234',
          increase: '128'
        },
        {
          index: '3',
          word: '菜品',
          num: '2,234',
          increase: '128'
        },
        {
          index: '4',
          word: '菜品',
          num: '2,234',
          increase: '-128'
        },
        {
          index: '5',
          word: '菜品',
          num: '2,234',
          increase: '128'
        }
      ],

      // 订单统计部分
      orderUrl: ''
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

    // 销售类别环形图初始化
    setEchartsPie (id, data) {
      var imgClassify = echarts.init(document.getElementById(id))
      var total = 0
      data.forEach(res => {
        // console.log(res.value)
        total += parseFloat(res.value)
        // console.log(total)
      })
      var classifyOption = {
        // 总销售额
        title: {
          show: true,
          text: '总销售额',
          subtext: `￥${total}`,
          top: 173,
          left: 152,
          textAlign: 'center',
          z: 0,
          textStyle: {
            color: '#9f9f9d',
            fontSize: '20',
            fontWeight: 'normal',
            lineHeight: 0
          },
          subtextStyle: {
            color: '#36322e',
            fontSize: '36',
            fontWeight: 'normal'
          }
        },

        // 图例配置
        legend: {
          top: 'middle',
          right: '20',
          // padding: [10, 10, 0, 0],
          x: 'right',
          orient: 'vertical',
          align: 'left',
          icon: 'circle',
          selectedMode: false,
          itemGap: 20,
          formatter: function (name) {
            var legendTitle = name + '  |  '
            var eachAvg = 0
            data.forEach(item => {
              if (name === item.name) {
                eachAvg = item.value / total * 100
                var avg = eachAvg.toString().slice(0, 5)
                legendTitle += avg + '%' + '    ￥' + item.value
              }
            })
            return legendTitle
          }
        },

        // 图标配置
        series: [
          {
            // zlevel: 1,
            name: '菜品类别',
            type: 'pie',
            radius: ['55%', '70%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            stillShowZeroSum: false,
            // zlevel: 1,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: '{b}\n{c}',
                align: 'center',
                verticalAlign: 'middle',
                // 此处重点，字体大小设置为0
                textStyle: {
                  fontSize: '0'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                },
                // 同步样式
                formatter: function (params) {
                  return `{tTitle|${params.name}}\n{tSubTitle|￥${params.value}}\n{tSubAvg|${(params.value / total * 100).toString().slice(0, 5)}%}`
                },
                rich: {
                  tTitle: {
                    color: '#9f9f9d',
                    fontSize: '18',
                    fontWeight: 'normal',
                    lineHeight: 36
                  },
                  tSubTitle: {
                    color: '#36322e',
                    fontSize: '32',
                    fontWeight: 'normal',
                    lineHeight: '50'
                  },
                  tSubAvg: {
                    fontSize: '14',
                    lineHeight: '28'
                  }
                }
              }
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      }
      classifyOption && imgClassify.setOption(classifyOption)

      imgClassify.on('mouseover', { seriesName: '菜品类别' }, params => {
        imgClassify.setOption({
          title: {
            show: false
          }
        })
      })

      imgClassify.on('mouseout', { seriesName: '菜品类别' }, params => {
        imgClassify.setOption({
          title: {
            show: true
          }
        })
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
    // 发送ajax请求获取环形图的数据
    // 初始化环形图
    this.setEchartsPie('img_classify', [
      { value: 4000, name: '肉类' },
      { value: 3000, name: '青叶菜类' },
      { value: 2000, name: '瓜果类' },
      { value: 1000, name: '水果类' }
    ])
    // 餐厅数据
    service.get('restaurant/list', {
    })
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        console.log(res)
        this.resName = res.data.data[0].resName
        this.resAddress = res.data.data[0].resAddress
        this.resOpenTime = res.data.data[0].resOpenTime
      })
    axios.get('http://localhost:8081/hello', {
    })
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        console.log(res)
        this.hello = res.data
      })
    // 订单数据
    service.get('order/list', {
    })
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        console.log(res)
        var orderData = res.data
        console.log(orderData.data)
        var len = orderData.data.length
        var totalPrice = 0
        for (var i = 0; i < len; i++) {
          totalPrice += orderData.data[i].oTotalPrice
        }
        console.log(totalPrice)
        this.totalPrice = totalPrice
        this.orderNums = orderData.data.length
      })
    service.get('menu/count', {
    })
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        console.log(res)
        this.total = res.data.data
        console.log(this.total)
      })
  }
}
</script>

<style scoped lang='less'>
.content {
  width: 1160px;
  margin: 0 auto;
  padding-top: 10px;
  #sale, #hotData, #order, #saleStats, #goods {
    margin-top: 30px;
  }
  // 餐厅信息
  #restaurant {
    .r_msg {
      position: relative;
      display: flex;
      align-items: center;
      .img {
        overflow: hidden;
        width: 100px;
        height: 100px;
        margin-right: 20px;
        border-radius: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .msg {
        color: #666;
        font: 16px "Arial Normal";
        .name {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .time {
          margin-bottom: 5px;
        }
        .time, .add {
          span {
            color: #d6d6d9;
            margin-right: 3px;
          }
        }
      }
      .detail {
        position: absolute;
        right: 0;
        width: 96px;
        height: 38px;
        line-height: 38px;
        background-color: #F2F2F2;
        border-radius: 10px;
        text-align: center;
        font-size: 16px;
      }
    }
  }
  // 销售统计
  #sale {
    margin-top: 20px;
    .detail {
      display: flex;
      justify-content: space-between;
      .income, .total {
        display: flex;
        align-items: center;
        width: 370px;
        height: 185px;
        padding: 0 20px;
        border: 1px solid #ccc;
        border-radius: 3px;
        .today {
          width: 50%;
          color: #666;
          font: 22px "Arial Normal";
          .text {
            margin-bottom: 50px;
          }
          .time {
            padding-left: 10px;
            font-size: 12px;
          }
        }
        .num {
          width: 50%;
          color: #FF0000;
          font-size: 50px;
          text-align: right;
        }
      }
    }
  }
  // 热门搜索
  #hotData {
    display: flex;
    justify-content: space-between;
    #hot {
      .stats {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .total, .each {
          .text {
            margin-bottom: 5px;
            color: #8a8989;
            font: 16px "Microsoft YaHei";
          }
        }
      }
    }
  }
  // 销售额类别
  // #classify {
  //   .chooseDate {
  //     // margin-top: 10px;
  //   }
  // }

  // // 订单统计
  // #order {
  // }

  // // 销售统计
  // #saleStats {
  //   // margin-top: 30px;
  // }

  // 商品总览
  #goods {
    display: flex;
    justify-content: space-between;
  }
}
</style>
