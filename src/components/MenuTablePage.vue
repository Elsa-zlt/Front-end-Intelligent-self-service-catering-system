<template>
  <div class="container">
    <div class="search_condition w">
      <Select class="select" v-show="chooseComponent.new" :text="chooseComponent.dishClassify" :itemArray="chooseComponent.dishArr" @select="handleSelectValue"></Select>
      <Select class="select" v-show="chooseComponent.haveSelect" :text="chooseComponent.selectText" :itemArray="chooseComponent.selectArr" @select="handlePutValue"></Select>
      <Date class="select" v-show="chooseComponent.haveDate" @getDate="getDateChoose"></Date>
      <Button type="primary" class="button" v-show="chooseComponent.haveDate || chooseComponent.haveSelect" @click="handleClickSelect"><span class="iconfont icon-loudou"></span>筛选</Button>
      <Button type="primary" class="button" v-show="chooseComponent.haveDate || chooseComponent.haveSelect" @click="handleResetSelect">刷新</Button>
      <Search v-show="chooseComponent.haveSearch" @getSearch="handleSearch"></Search>
      <slot name="new"></slot>
    </div>
    <div class="table w" :style="style1">
      <Table :isBorder="chooseComponent.isBorder" :isStripe="chooseComponent.isStripe" :head="chooseComponent.tableHead" :body="tableData" :width1="chooseComponent.tableWidth" :editText="edit" :delText="del"></Table>
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
      selectValue: '',
      // 是否上架
      put: 0,
      // 搜索框内容
      search: '',
      // 表格总数据长度
      pageDataLength: 0,
      // 获取到的全部表格数据
      allTableData: [],
      // 表格内显示的10条数据
      tableData: []
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
    },
    handlePutValue (e) {
      // 拿到下拉选项的选中值
      this.put = e
      // 发送ajax请求
    },
    // 处理分页
    handleReturnPage (data) {
      this.tableData = this.allTableData.slice((data - 1) * 10, data * 10)
    },
    // 拿到选择后的日期
    getDateChoose (date) {
      this.date = date
    },
    getCategory (mCategory) {
      if (mCategory === '1') {
        mCategory = '肉类'
      } else if (mCategory === '2') {
        mCategory = '青叶菜类'
      } else if (mCategory === '3') {
        mCategory = '瓜果类'
      } else {
        mCategory = '水果类'
      }
      return mCategory
    },
    // 拿到搜索框输入内容
    handleSearch (data) {
      this.search = data
      console.log(this.search)
      // 发送请求
      service.post('menu/search', {
        data: data
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data.data)
          this.pageDataLength = res.data.data.length
          this.allTableData = res.data.data
          for (var i = 0; i < this.allTableData.length; i++) {
            this.allTableData[i].mPhoto = '/avatar.jpg'
          }
          var table = this.allTableData.slice(0, 10)
          this.tableData = table
          console.log(table)
        })
    },
    // 处理点击筛选按钮
    handleClickSelect () {
      // 拿到选择条件，发送请求进行筛选，给tableData进行赋值
      console.log('selectValue:', this.selectValue, 'put:', this.put)
      this.getCategory(this.put)
      if (this.put === 0) {
        service.post('menu/category', {
          data: this.selectValue + 1
        })
          .catch(error => {
            console.log(error)
          })
          .then(res => {
            console.log(res.data.data)
            this.pageDataLength = res.data.data.length
            this.allTableData = res.data.data
            for (var i = 0; i < this.allTableData.length; i++) {
              this.allTableData[i].mPhoto = '/avatar.jpg'
            }
            var table = this.allTableData.slice(0, 10)
            this.tableData = table
            console.log(table)
          })
      } else {
        this.pageDataLength = 0
        this.allTableData = null
        var table = null
        this.tableData = table
        console.log(table)
      }
    }
  },
  mounted () {
    axios.get(this.url).then(res => {
      // this.pageDataLength = res.data.result.array.length
      // this.allTableData = res.data.result.array
      // var table = this.allTableData.slice(0, 10)
      // this.tableData = table
    })
    service.get('menu/list', {
    })
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        console.log(res.data.data)
        this.pageDataLength = res.data.data.length
        this.allTableData = res.data.data
        for (var i = 0; i < this.allTableData.length; i++) {
          this.allTableData[i].mPhoto = '/avatar.jpg'
        }
        var table = this.allTableData.slice(0, 10)
        this.tableData = table
        console.log(table)
      })
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
