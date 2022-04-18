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
          <FormItem label="菜品编号:">
            <Input class="num" v-model="formItem.num" placeholder="请输入菜品编号"></Input>
          </FormItem>
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
        option: ['菜品分类1', '菜品分类2', '菜品分类3'],
        status: '',
        textarea: '',
        cost: 0,
        price: 0,
        calorie: 0
      }
    }
  },
  methods: {
    // 保存菜品
    handleSubmit () {
      for (var key in this.formItem) {
        if (this.formItem[key] === '' || this.formItem.key === 0) {
          this.$Notice.warning({
            title: '请把菜品相关信息填写完整哦'
          })
          return
        }
      }
      console.log(this.formItem)
    },

    // 点击返回
    handleGoBack () {
      this.$router.push('/index/dish')
    },
    // 图片上传成功，接受图片的网络地址
    handleUploadSuccess (url) {
      console.log('图片上传成功', url)
    }
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
