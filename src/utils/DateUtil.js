export default class {
  // 返回最近七天的日期
  getDay () {
    const days = []
    // eslint-disable-next-line no-tabs
    for (let i = 0; i <= 24 * 6; i += 24) {		// 今天加上前6天
      // eslint-disable-next-line no-tabs
      const dateItem = new Date(Date.getTime() - i * 60 * 60 * 1000)	// 使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
      // eslint-disable-next-line no-tabs
      const y = dateItem.getFullYear()	// 获取年份
      // eslint-disable-next-line no-tabs
      let m = dateItem.getMonth() + 1	// 获取月份js月份从0开始，需要+1
      // eslint-disable-next-line no-tabs
      let d = dateItem.getDate()	// 获取日期
      // eslint-disable-next-line no-tabs
      m = this.addDate0(m)	// 给为单数的月份补零
      // eslint-disable-next-line no-tabs
      d = this.addDate0(d)	// 给为单数的日期补零
      // eslint-disable-next-line no-tabs
      const valueItem = y + '-' + m + '-' + d	// 组合
      // eslint-disable-next-line no-tabs
      days.push(valueItem)	// 添加至数组
    }
    console.log('最近七天日期：', days)

    return days
  }

  // 给日期加0
  addDate0 (time) {
    if (time.toString().length === 1) {
      time = '0' + time.toString()
    }
    return time
  }

  static getDay () {
    const days = []
    // eslint-disable-next-line no-tabs
    for (let i = 0; i <= 24 * 6; i += 24) {		// 今天加上前6天
      // eslint-disable-next-line no-tabs
      const dateItem = new Date(Date.getTime() - i * 60 * 60 * 1000)	// 使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
      // eslint-disable-next-line no-tabs
      const y = dateItem.getFullYear()	// 获取年份
      // eslint-disable-next-line no-tabs
      let m = dateItem.getMonth() + 1	// 获取月份js月份从0开始，需要+1
      // eslint-disable-next-line no-tabs
      let d = dateItem.getDate()	// 获取日期
      // eslint-disable-next-line no-tabs
      m = this.addDate0(m)	// 给为单数的月份补零
      // eslint-disable-next-line no-tabs
      d = this.addDate0(d)	// 给为单数的日期补零
      // eslint-disable-next-line no-tabs
      const valueItem = y + '-' + m + '-' + d	// 组合
      // eslint-disable-next-line no-tabs
      days.push(valueItem)	// 添加至数组
    }
    console.log('最近七天日期：', days)

    return days
  }
}
