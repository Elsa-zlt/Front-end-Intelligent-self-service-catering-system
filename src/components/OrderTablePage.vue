<template>
  <div class="container">
    <div class="search_condition w">
      <Select class="select" v-show="chooseComponent.new" :text="chooseComponent.dishClassify" :itemArray="chooseComponent.dishArr" @select="handleSelectValue"></Select>
      <Select class="select" v-show="chooseComponent.haveSelect" :text="chooseComponent.selectText" :itemArray="chooseComponent.selectArr" @select="handleSelectValue"></Select>
      <Date class="select" v-show="chooseComponent.haveDate" @getDate="getDateChoose"></Date>
      <Button type="primary" class="button" v-show="chooseComponent.haveDate || chooseComponent.haveSelect" @click="handleClickSelect"><span class="iconfont icon-loudou"></span>筛选</Button>
      <Button type="primary" class="button" v-show="chooseComponent.haveDate || chooseComponent.haveSelect" @click="handleResetSelect">刷新</Button>
      <Search v-show="chooseComponent.haveSearch" @getSearch="handleSearch"></Search>
      <slot name="new"></slot>
    </div>
    <div class="table w" :style="style1">
      <Table v-if="isShow" :isBorder="chooseComponent.isBorder" :isStripe="chooseComponent.isStripe" :head="chooseComponent.tableHead" :body="tableData" :width1="chooseComponent.tableWidth" :editText="edit" :delText="del"></Table>
    </div>
    <div class="page w">
      <Page @returnPage="handleReturnPage" :totalData="pageDataLength"></Page>
    </div>
  </div>
</template>

<script>
import Select from './Select.vue'
import Date from './Date.vue'
import Search from './Search.vue'
import Table from './Table.vue'
import Page from './Page.vue'
import axios from 'axios'
import service from '@/utils/http'

export default {
  props: {
    // 请求数据url
    url: {
      type: String,
      default: null
    },
    // 设置框文字
    edit: {
      type: String,
      default: '编辑'
    },
    del: {
      type: String,
      default: '删除'
    },
    chooseComponent: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        // 表格是否有边框
        isBorder: true,
        // 表格是否有间隔色
        isStripe: true,
        // 是否有下拉选项框
        haveSelect: true,
        // 下拉选项框默认提示文字,
        selectText: '',
        // 下拉选项框选项值数组
        selectArr: [],
        // 是否有日期选择器
        haveDate: true,
        // 是否有搜索框
        haveSearch: true,
        // 表格头部
        tableHead: {},
        // 表格数据
        tableData: {},
        // 表格宽度
        tableWidth: 0,
        // 是否有分页器
        havePage: true
      }
    },
    style1: {
      type: String,
      default: null
    }
  },
  components: {
    Select,
    Date,
    Search,
    Table,
    Page
  },
  data () {
    return {
      // 下拉选项框选择后对应的返回值
      selectValue: 1,
      // 日历选择器选择后对应的日期
      date: '',
      // 搜索框内容
      search: '',
      // 表格总数据长度
      pageDataLength: 0,
      // 获取到的全部表格数据
      allTableData: [],
      // 表格内显示的10条数据
      tableData: [],
      isShow: false
    }
  },
  methods: {
    handleResetSelect () {
      location.reload()
    },
    handleSelectValue (e) {
      // 拿到下拉选项的选中值
      this.selectValue = e
      // 发送ajax请求
      console.log(e)
    },
    // 处理分页
    handleReturnPage (data) {
      this.tableData = this.allTableData.slice((data - 1) * 10, data * 10)
    },
    // 拿到选择后的日期
    getDateChoose (date) {
      this.date = date
    },
    // 拿到搜索框输入内容
    handleSearch (data) {
      this.search = data
      console.log(this.search)
      // 发送请求
      console.log(this.checkNumber(data))
      if (this.checkNumber(data)) {
        var oId = data
        service.get('order/one/' + oId, {
        })
          .catch(error => {
            console.log(error)
          })
          .then(e => {
            this.pageDataLength = 1
            this.allTableData = []
            console.log(e.data.data)
            this.allTableData[0] = e.data.data
            console.log(this.allTableData[0])
            var oId = this.allTableData[0].oId
            var cId = this.allTableData[0].cId
            service.get('menuorder/' + oId, {
            })
              .catch(error => {
                console.log(error)
              })
              .then(e => {
                this.allTableData[0].dishMsg = e.data.msg
              })
            service.get('consumer/' + cId, {
            })
              .catch(error => {
                console.log(error)
              })
              .then(e => {
                this.allTableData[0].cId = e.data.data.name
                this.tableData = []
                this.tableData[0] = this.allTableData[0]
              })
          })
      } else {
        service.get('order/' + data, {
        })
          .catch(error => {
            console.log(error)
          })
          .then(res => {
            console.log(res.data.data)
            this.pageDataLength = res.data.data.length
            this.allTableData = res.data.data
            for (let i = 0; i < this.allTableData.length; i++) {
              var oId = this.allTableData[i].oId
              var cId = this.allTableData[i].cId
              this.getTableData(oId, i)
              this.getConsumerInfoBycId(cId, i)
            }
            var table = this.allTableData.slice(0, 10)
            this.tableData = table
            console.log(table)
          })
      }
    },
    // 验证字符串是否是数字
    checkNumber (theObj) {
      var reg = /^[0-9]+\.?[0-9]*$/
      if (reg.test(theObj)) {
        return true
      }
      return false
    },
    // 处理点击筛选按钮
    handleClickSelect () {
      if (this.date === '' && this.selectValue === 1) {
        this.getAllTableData()
      }
      // 拿到选择条件，发送请求进行筛选，给tableData进行赋值
      console.log('selectValue:', this.selectValue, 'date:', this.date)
      var DateTime = ''
      for (var i = 0; i < this.date.length; i++) {
        if (i === 0) {
          DateTime += this.date[i] + '-'
        } else {
          DateTime += this.date[i]
        }
      }
      console.log(DateTime)
      if (this.selectValue === 1) {
        service.post('selectOrderByDate', {
          time: DateTime
        })
          .catch(error => {
            console.log(error)
          })
          .then(res => {
            console.log(res.data.data)
            this.pageDataLength = res.data.data.length
            this.allTableData = res.data.data
            for (let i = 0; i < this.allTableData.length; i++) {
              var oId = this.allTableData[i].oId
              var cId = this.allTableData[i].cId
              this.getTableData(oId, i)
              this.getConsumerInfoBycId(cId, i)
            }
            var table = this.allTableData.slice(0, 10)
            this.tableData = table
            console.log(table)
          })
      } else {
        this.pageDataLength = 0
        this.allTableData = null
        this.tableData = null
      }
    },
    async getConsumerInfoBycId (cId, i) {
      service.get('consumer/' + cId, {
      })
        .catch(error => {
          console.log(error)
        })
        .then(e => {
          console.log(e.data.data.name)
          this.allTableData[i].cId = e.data.data.name
        })
    },
    async getTableData (oId, i) {
      service.get('menuorder/' + oId, {
      })
        .catch(error => {
          console.log(error)
        })
        .then(e => {
          console.log(e.data.msg)
          this.allTableData[i].dishMsg = e.data.msg
          if (i === 9) {
            this.tableData = this.allTableData.slice(0, 10)
          }
        })
    },
    async getAllTableData () {
      service.get('order/list', {
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.pageDataLength = res.data.data.length
          this.allTableData = res.data.data
          for (let i = 0; i < this.allTableData.length; i++) {
            var oId = this.allTableData[i].oId
            var cId = this.allTableData[i].cId
            if (this.allTableData[i].oStringTime === null) {
              this.allTableData[i].oStringTime = this.allTableData[i].oTime
            }
            this.getTableData(oId, i)
            this.getConsumerInfoBycId(cId, i)
          }
          var table = this.allTableData.slice(0, 10)
          this.tableData = table
          console.log(table)
        })
    }
  },
  mounted () {
    axios.get(this.url).then(res => {
      // this.pageDataLength = res.data.result.array.length
      // this.allTableData = res.data.result.array
      // var table = this.allTableData.slice(0, 10)
      // this.tableData = table
    })
    this.getAllTableData()
    this.isShow = true
    // service.get('order/list', {
    // })
    //   .catch(error => {
    //     console.log(error)
    //   })
    //   .then(res => {
    //     console.log(res.data.data)
    //     this.pageDataLength = res.data.data.length
    //     this.allTableData = res.data.data
    //     for (let i = 0; i < this.allTableData.length; i++) {
    //       var oId = this.allTableData[i].oId
    //       service.get('menuorder/' + oId, {
    //       })
    //         .catch(error => {
    //           console.log(error)
    //         })
    //         .then(res => {
    //           console.log(res.data.msg)
    //           this.allTableData[i].dishMsg = res.data.msg
    //         })
    //     }
    //     var table = this.allTableData.slice(0, 10)
    //     this.tableData = table
    //     console.log(table)
    //   })
  },
  computed () {
    // this.tableData = this.allTableData.slice(0, 10)
  }
}
</script>

<style scoped lang='less'>
.container {
  position: relative;
  width: 1200px;
  margin: 10px auto ;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #e4e4e4;
  .w {
    width: 1000px;
    margin: 0 auto;
  }
  .search_condition {
    position: relative;
    top: 30px;
    display: flex;
    margin-bottom: 40px;
    .select {
      margin-right: 20px;
    }
    .button {
      margin-right: 120px;
      .icon-loudou {
      font-size: 14px;
      }
    }
    .new {
      margin-left: 50px;
    }
  }
  .table {
    position: relative;
    top: 10px;
    margin-bottom: 20px;
  }
  .page {
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 10px;
    // top: 10px;
  }
}
</style>
