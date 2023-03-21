<template>
  <div class="container">
    <Title>
      <template #title>
        新增菜品
      </template>
    </Title>
    <div class="content">
      <div class="box">
        <Form :model="formItem" :label-width="80">
          <FormItem label="菜品名称:">
            <Input class="name" v-model="formItem.name" placeholder="请输入菜品名称"></Input>
          </FormItem>
          <FormItem label="菜品分类:">
            <Select class="classify" v-model="formItem.select">
              <Option v-for="(item) in formItem.option" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="菜品图片:">
            <UploadImg @uploadSuccess="handleUploadSuccess"></UploadImg>
          </FormItem>
          <FormItem label="菜品原料:">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入菜品的原料"></Input>
          </FormItem>
          <FormItem label="菜品成本:">
            <InputNumber :min="0" :step="0.1" v-model="formItem.cost"></InputNumber> 元
          </FormItem>
          <FormItem label="菜品单价:">
            <InputNumber :min="0" :step="0.1" v-model="formItem.price"></InputNumber> 元
          </FormItem>
          <FormItem label="菜品热量:">
            <InputNumber :min="0" :step="1" v-model="formItem.calorie"></InputNumber> 千卡
          </FormItem>
          <FormItem label="菜品状态:">
            <RadioGroup v-model="formItem.status">
              <Radio label="1">菜品上架</Radio>
              <Radio label="0">菜品下架</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit">保存菜品</Button>
            <Button style="margin-left: 60px" @click="handleGoBack">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '../../components/Title.vue'
import UploadImg from '../../components/UploadImg.vue'
import service from '@/utils/http'

export default {
  components: {
    Title,
    UploadImg
  },
  data () {
    return {
      formItem: {
        num: '',
        name: '',
        select: '',
        option: ['肉类', '青叶菜类', '瓜果类', '水果类'],
        status: '',
        textarea: '',
        cost: 0,
        price: 0,
        calorie: 0,
        MenuCount: 0
      },
      M_category: ''
    }
  },
  methods: {
    getCategory (mCategory) {
      if (mCategory === '肉类') {
        return '1'
      } else if (mCategory === '青叶菜类') {
        return '2'
      } else if (mCategory === '瓜果类') {
        return '3'
      } else {
        return '4'
      }
    },
    // 保存菜品
    handleSubmit () {
      // this.getMenuCount()
      console.log(this.MenuCount)
      this.formItem.num = this.MenuCount + 1
      for (var key in this.formItem) {
        if (this.formItem[key] === '' || this.formItem.key === 0) {
          this.$Notice.warning({
            title: '请把菜品相关信息填写完整哦'
          })
          return
        }
      }
      console.log(this.formItem.select)
      if (this.formItem.select === '肉类') {
        this.M_category = '1'
      } else if (this.formItem.select === '青叶菜类') {
        this.M_category = '2'
      } else if (this.formItem.select === '瓜果类') {
        this.M_category = '3'
      } else {
        this.M_category = '4'
      }
      console.log(this.M_category)
      console.log(this.formItem)
      service.post('menu', {
        mId: this.formItem.num,
        mName: this.formItem.name,
        mOldPrice: this.formItem.cost,
        mPrice: this.formItem.price,
        mCalorie: this.formItem.calorie,
        mCategory: this.M_category,
        mMaterial: this.formItem.textarea
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          console.log(res.data)
        })
      console.log(this.formItem.calorie)
    },
    async getMenuCount () {
      service.get('menu/count', {
      })
        .catch(error => {
          console.log(error)
        })
        .then(res => {
          // console.log(res.data.data)
          this.MenuCount = res.data.data
        })
    },
    // 点击返回
    handleGoBack () {
      this.$router.push('/index/dish')
    },
    // 图片上传成功，接受图片的网络地址
    handleUploadSuccess (url) {
      console.log('图片上传成功', url)
    }
  },
  mounted () {
    this.getMenuCount()
  }
}
</script>

<style scoped lang='less'>
.content {
  width: 1060px;
  margin: 10px auto 0;
  padding: 30px 0;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e4e4e4;
  .box {
    width: 500px;
    margin: 0 auto;
    .num {
      width: 200px;
    }
    .name {
      width: 200px;
    }
    .classify {
      width: 150px;
    }
  }
}
</style>
