<template>
  <div class="container">
    <div class="each">
      <div class="num">{{up}}</div>
      <div class="status">{{textArr[0]}}</div>
    </div>
    <div class="each">
      <div class="num">{{down}}</div>
      <div class="status">{{textArr[1]}}</div>
    </div>
    <div class="each">
      <div class="num">{{classify}}</div>
      <div class="status">{{textArr[2]}}</div>
    </div>
    <div class="each">
      <div class="num">{{total}}</div>
      <div class="status">{{textArr[3]}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import service from "@/utils/http";

export default {
  props: {
    textArr: [],
    url: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      up: 0,
      down: 0,
      classify: 0,
      total: 0
    }
  },
  mounted () {
    axios.get(this.url).then(res => {
      // console.log(res)
      this.up = res.data.result.up
      this.down = res.data.result.down
      // this.classify = res.data.result.classify
      // this.total = res.data.result.total
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
    service.get('menu/CategoryCount', {
    })
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        console.log(res)
        this.classify = res.data.data
        console.log(this.total)
      })
  }
}
</script>

<style scoped lang='less'>
.container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  .each {
    color: #666;
    text-align: left;
    .num {
      display: flex;
      justify-content: center;
      font-size: 48px;
    }
    .status {
      display: flex;
      justify-content: center;
      font-size: 18px;
    }
  }
}
</style>
