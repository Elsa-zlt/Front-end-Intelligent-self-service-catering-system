<template>
  <div>
    <Title>
      <template #title>
        <span>菜品管理</span>
      </template>
    </Title>
    <BaseTable :chooseComponent="tableObj" url='/dish.json' style1="width: 1160px;margin: 0 auto" edit="下架">
      <template #new>
        <Button type="primary" class="new" @click="handleNewDish">新增菜品</Button>
      </template>
    </BaseTable>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
import BaseTable from '../../components/BaseTablePage.vue'

export default {
  components: {
    BaseTable,
    Title
  },
  data () {
    return {
      tableObj: {
        dishClassify: '请选择菜品类目',
        dishArr: [
          {
            value: 0,
            label: '类目'
          },
          {
            value: 1,
            label: '类目'
          },
          {
            value: 2,
            label: '类目'
          },
          {
            value: 3,
            label: '类目'
          }
        ],
        selectText: '请选择状态',
        selectArr: [
          {
            value: 0,
            label: '已上架'
          },
          {
            value: 1,
            label: '未上架'
          }
        ],
        tableHead: [
          {
            type: 'selection',
            width: 54,
            align: 'center'
          },
          {
            title: '编号',
            key: 'mId',
            width: 65,
            align: 'center'
          },
          {
            title: '菜品照片',
            key: 'mPhoto',
            slot: 'img',
            width: 120,
            align: 'center'
          },
          {
            title: '菜品分类',
            key: 'category',
            width: 100,
            align: 'center'
          },
          {
            title: '菜品原料',
            key: 'material',
            width: 100,
            align: 'center',
            tooltip: true
          },
          {
            title: '成本',
            key: 'oldprice',
            width: 70,
            align: 'center'
          },
          {
            title: '单价',
            key: 'price',
            width: 70,
            align: 'center'
          },
          {
            title: '热量',
            key: 'calorie',
            width: 90,
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            slot: 'status_d',
            width: 90,
            align: 'center'
          },
          {
            title: '上传时间',
            key: 'time',
            width: 168,
            align: 'center'
          },
          {
            title: '菜品详情',
            key: 'detail',
            width: 121,
            align: 'center'
          },
          {
            title: '设置',
            slot: 'action',
            width: 110,
            align: 'center'
          }
        ],
        tableWidth: '1160',
        haveSelect: true,
        haveSearch: true,
        havePage: true,
        haveDate: false,
        isBorder: true,
        isStripe: true,
        new: true
      }
    }
  },
  methods: {
    handleNewDish () {
      this.$router.push('/index/newDish')
    }
  }
}
</script>
