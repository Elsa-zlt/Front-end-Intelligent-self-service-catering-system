<template>
  <div class="chooseDate">
              <ul>
                <li :class="index === 1 ? 'active': ''" @click="handleFirst">{{first}}</li>
                <li :class="index === 2 ? 'active': ''" @click="handleSecond">{{second}}</li>
                <li :class="index === 3 ? 'active': ''" @click="handleThird">{{third}}</li>
              </ul>
            </div>
</template>

<script>
export default {
  props: {
    first: {
      type: String,
      default: '今天'
    },
    second: {
      type: String,
      default: '本周'
    },
    third: {
      type: String,
      default: '本月'
    }
  },
  data () {
    return {
      // 控制active样式
      index: 1
    }
  },
  methods: {
    handleFirst () {
      this.index = 1
      // 当按钮内容为今天或本日时，返回当天日期
      if (this.first === '今天' || this.first === '本日') {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var nowDate = year + '/' + month + '/' + day
        // 触发事件，传递日期给父组件
        this.$emit('chooseFirst', nowDate)
      } else if (this.first === '最近7天') {
        var days = this.getRangeDay(7)
        this.$emit('chooseFirst', days)
      }
    },
    handleSecond () {
      this.index = 2
      // 当按钮内容为本周时，返回周一和周日的日期
      // 当按钮为本月时，返回本月第一天和最后一天日期
      if (this.second === '本周') {
        var date = new Date()
        var nowTime = date.getTime()
        var day = date.getDay() || 7 // 为周日的时候 day 修改为7  否则当天周天会有问题
        var oneDayTime = 24 * 60 * 60 * 1000
        var MondayTime = nowTime - (day - 1) * oneDayTime // 周一的日期
        var SundayTime = nowTime + (7 - day) * oneDayTime // 周日的日期
        // date格式的日期
        var monday = new Date(MondayTime)
        var sunday = new Date(SundayTime)
        var month = monday.getMonth() + 1
        var Monday, Sunday
        // 格式化后的周一到周日的日期
        //  1. 星期一补0
        // if (month < 10) {
        //   if (monday.getDate() < 10) {
        //     Monday = monday.getFullYear() + '/0' + month + '/0' + monday.getDate()
        //   } else {
        //     Monday = monday.getFullYear() + '/0' + month + '/' + monday.getDate()
        //   }
        // } else {
        //   if (monday.getDate() < 10) {
        //     Monday = monday.getFullYear() + '/' + month + '/0' + monday.getDate()
        //   } else {
        //     Monday = monday.getFullYear() + '/' + month + '/' + monday.getDate()
        //   }
        // }
        Monday = monday.getFullYear() + '/' + month + '/' + monday.getDate()
        Sunday = sunday.getFullYear() + '/' + month + '/' + sunday.getDate()
        var week = []
        // 传递日期给父组件
        this.$emit('chooseSecond', [Monday, Sunday, week])
      } else if (this.second === '本月') {
        date = new Date()
        var nowMonth = date.getMonth() + 1
        var list = [1, 3, 5, 7, 8, 10, 12]
        var year = date.getFullYear()
        month = date.getMonth() + 1
        var firstDay = year + '/' + month + '/' + 1
        var lastDay
        if (list.indexOf(nowMonth) === null) {
          lastDay = year + '/' + month + '/' + 30
          this.$emit('chooseSecond', [firstDay, lastDay])
        } else {
          lastDay = year + '/' + month + '/' + 31
          this.$emit('chooseSecond', [firstDay, lastDay])
        }
      } else if (this.second === '最近30天') {
        var days = this.getRangeDay(30)
        this.$emit('chooseSecond', days)
      }
    },
    handleThird () {
      // 显示active样式
      this.index = 3
      // 当按钮内容为本月时，返回本月第一天和最后一天的日期
      // 当按钮为本年时，返回本年的年份
      if (this.third === '本月') {
        var date = new Date()
        var nowMonth = date.getMonth() + 1
        var list = [1, 3, 5, 7, 8, 10, 12]
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var firstDay = year + '/' + month + '/' + 1
        var lastDay
        if (list.indexOf(nowMonth) === null) {
          lastDay = year + '/' + month + '/' + 30
          this.$emit('chooseThird', [firstDay, lastDay])
        } else {
          lastDay = year + '/' + month + '/' + 31
          this.$emit('chooseThird', [firstDay, lastDay])
        }
      } else if (this.third === '本年') {
        var thisYear = new Date().getFullYear()
        this.$emit('chooseThird', thisYear)
      } else if (this.third === '最近90天') {
        var days = this.getRangeDay(90)
        this.$emit('chooseThird', days)
      }
    },
    // 日期补0
    addDate0 (time) {
      if (time.toString().length === 1) {
        time = '0' + time.toString()
      }
      return time
    },
    getRangeDay (num) {
      var days = []
      var date = new Date()
      for (let i = 0; i <= (num - 1) * 24; i += 24) { // 前num-1天的小时数
        var time = date.getTime()
        var dateItem = new Date(time - i * 60 * 60 * 1000) // 使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
        var y = dateItem.getFullYear() // 获取年份
        var m = dateItem.getMonth() + 1 // 获取月份js月份从0开始，需要+1
        var d = dateItem.getDate() // 获取日期
        m = this.addDate0(m) // 给为单数的月份补零
        d = this.addDate0(d) // 给为单数的日期补零
        var valueItem = y + '-' + m + '-' + d // 组合
        days.push(valueItem) // 添加至数组
      }
      return days
    }
  }
}
</script>

<style scoped lang='less'>
.chooseDate {
  ul {
    display: flex;
    .active {
      color: #3aa1fe;
      border: 1px solid #3aa1fe;
    }
    li {
      // width: 64px;
      height: 34px;
      line-height: 34px;
      padding: 0 12px;
      background-color: #fff;
      border: 1px solid #e4e4e4;
      border-radius: 3px;
      // color: #333;
      font-size: 16px;
      text-align: center;
      list-style: none;
      cursor: pointer;
    }
  }
}
</style>
