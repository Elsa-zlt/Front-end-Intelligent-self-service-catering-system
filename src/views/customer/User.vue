<template>
  <div class="user">
    <Title>
      <template #title>
        <span>用户信息</span>
      </template>
    </Title>
    <UserTablePage :chooseComponent="tableObj" url=""></UserTablePage>
  </div>
</template>

<script>
import Title from '../../components/Title.vue'
import UserTablePage from '@/components/UserTablePage'

export default {
  components: {
    Title,
    UserTablePage
  },
  data () {
    return {
      // 初始化数据表信息的对象
      tableObj: {
        selectText: '请选择性别',
        selectArr: [
          {
            value: 0,
            label: '男'
          },
          {
            value: 1,
            label: '女'
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
            key: 'id',
            width: 70,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'name',
            width: 150,
            align: 'center'
          },
          {
            title: '用户电话',
            key: 'phone',
            width: 160,
            align: 'center'
          },
          {
            title: '性别',
            key: 'sex',
            width: 80,
            align: 'center',
            tooltip: true
          },
          {
            title: '密码',
            key: 'password',
            width: 150,
            align: 'center'
          },
          {
            title: '注册时间',
            key: 'time',
            width: 200,
            align: 'center'
          },
          {
            title: '设置',
            slot: 'action',
            width: 120,
            align: 'center'
          }
        ],
        tableWidth: '986',
        haveSelect: true,
        haveSearch: true,
        havePage: true,
        haveDate: true,
        isBorder: true,
        isStripe: true
      }
    }
  },
  methods: {

  }
}
</script>
