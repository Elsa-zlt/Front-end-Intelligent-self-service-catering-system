<template>
    <div class="container">
      <div class="demo-upload-list" v-for="item in uploadList" :key="item.uid">
          <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                  <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon> -->
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
          </template>
          <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
      </div>
      <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
          </div>
      </Upload>
    </div>
</template>
<script>
export default {
  data () {
    return {
      imgName: '',
      visible: false,
      uploadList: []
    }
  },
  methods: {
    // 删除图片
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    // 图片上传成功
    handleSuccess (res, file) {
      console.log(file)
      console.log(123)
      file.url = 'https://i.loli.net/2021/05/31/bhkBwgcovT4GlyY.png'
      this.$emit('uploadSuccess', file.url)
    },
    // 文件格式验证失败
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    // 图片超出指定大小
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    // 图片上传前
    handleBeforeUpload () {
      const check = this.uploadList.length < 1
      if (!check) {
        this.$Notice.warning({
          title: '最多只可以上传1张照片哦'
        })
      }
      return check
    }
  },
  mounted () {
    console.log(this.$refs)
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style scoped lang='less'>
.container {
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
}
</style>
