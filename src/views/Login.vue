/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
    <div class="bg" @click="handleClickOther">
      <div class="center">
        <div class="content">
          <div class="title">智慧自助餐饮系统</div>
          <div class="username" :class="{active:uIsActive}">
            <div class="img"><img src="../assets/images/user.png"></div>
            <input class='input' type="text" name="username" placeholder="请输入管理员帐号" @click.stop="handleUsernameClick" v-model="username">
            <span class="iconfont icon-chahao1" v-show="showUsernameCha" @click.stop="username = ''"></span>
            <!-- <span>{{ uIsActive }}</span> -->
          </div>
          <div class="passwd"  :class="{active:pIsActive}">
            <div class="img"><img src="../assets/images/passwd.png"></div>
            <input class='input' type="password" name="password" placeholder="请输入登录密码" @click.stop="handlePasswordClick" v-model="password">
            <span class="iconfont icon-chahao1" v-show="showPasswordCha" @click.stop="password = ''"></span>
          </div>
          <div class="tips" v-show="tips"><span class="iconfont icon-gantanhao"></span>{{ tips }}</div>
          <div class="submit" :class="{submitclick: submitmove}" @click.stop="handleAjax">登 录</div>
        </div>
      </div>
    </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      // 控制是否展示输入框点击样式
      uIsShow: false,
      pIsShow: false,
      uIsActive: false,
      pIsActive: false,
      // 用户名、密码
      username: '',
      password: '',
      // 登录按钮抖动
      submitmove: false,
      // 提示信息
      tips: '',
      token: ''
    }
  },
  methods: {

    handleTest () {
      console.log(JSON.parse(localStorage.getItem('user_token')))
      console.log(typeof (JSON.parse(localStorage.getItem('user_token'))))
      axios.get('http://localhost:8081/restaurant/list', {
        headers: {
          token: localStorage.getItem('user_token')
        }
      }).catch(error => {
        console.log(error)
      })
        .then(res => {
          console.log(JSON.parse(localStorage.getItem('user_token')))
          console.log(res)
        })
    },

    handleUsernameClick () {
      this.uIsActive = true
      this.pIsActive = false
      this.submitmove = false
    },
    handlePasswordClick () {
      this.pIsActive = true
      this.uIsActive = false
      this.submitmove = false
    },
    handleClickOther () {
      this.uIsActive = false
      this.pIsActive = false
      this.submitmove = false
    },

    handleAjax () {
      if (this.username) {
        if (this.password) {
          // 发送ajax请求,注意要修改请求方式！！！
          axios.post('http://localhost:8081/manager/login', {
            // params: {
            name: this.username,
            password: this.password
            // }
            // headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded'
            // }
          }).then(res => {
            // console.log('登录接口的jwt的token信息', res.data.data.token)
            localStorage.setItem('user_token', JSON.stringify(res.data.data.token))
            console.log('登录接口的jwt的token信息：' + localStorage.getItem('user_token'))
            if (res.data.code === 200) {
              // 跳转至路由index
              this.$router.push('/index')
            } else {
              this.submitmove = true
              this.tips = '帐号或密码不正确'
            }
          })
        } else {
          this.tips = '请填写登录密码'
          this.submitmove = true
        }
      } else {
        this.tips = '请填写管理员账号'
        this.submitmove = true
      }
      // this.$router.push('/index')

      // var user = localStorage.getItem('user_token')
      // var userObj = JSON.parse(user)
      // this.token = userObj.token
      // console.log(JSON.parse(localStorage.getItem('user_token')))
      // // eslint-disable-next-line no-unused-expressions
      // axios.get('http://localhost:8081/restaurant/list', {
      //   headers: {
      //     token: JSON.parse(localStorage.getItem('user_token'))
      //   }
      // })
      //   .then(res => {
      //     console.log(res)
      //   })
    }
  },
  computed: {
    showUsernameCha () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.submitmove = false
      return !!(this.uIsActive && this.username.length)
    },
    showPasswordCha () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.submitmove = false
      return !!(this.pIsActive && this.password.length)
    }
  }
}
</script>

<style scoped lang='less'>
@import '../assets/css/iconfont.css';
* {  //去除默认内外边距
  padding: 0;
  margin: 0;
}
.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  // background-color: #199ed8;
  background-image: url(../assets/images/bg1.jpg);
  background-size: contain;
  .center {
    display: flex;
    // align-items: center;
    justify-content: center;
    min-width: 497px;
    min-height: 588px;
    // padding: 0 2%;
    background-color: #fff;
    box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.28);
    border-radius: 10px;
    box-sizing: border-box;
    .content {
      position: relative;
      width: 95%;
      height: 100%;
      margin: 0 13%;
      .title {
        width: 100%;
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        // margin-bottom: 40px;
        color: #199ed8;
        font-size: 28px;
        font-weight: 700;
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
        text-align: center;
      }
      .title:hover {
        cursor: default;
      }
      .username,
      .passwd {
        position: absolute;
        top: 190px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 67px;
        // padding: 5px;
        border: 1px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 3px;
        .img {
          flex: 0.15;
          margin-right: 7px;
          text-align: center;
        }
        // .icon-suo {
        //   color: #999;
        // }
        .input {
          flex: 0.85;
          height: 95%;
          color: #999999;
          border: 0px;
          outline: none;
        }
        .input::placeholder {
          color: #d5d5d5;
        }
        input:focus:-webkit-autofill,
        input:-webkit-autofill {
          -webkit-text-fill-color: #606266 !important;
          transition: background-color 500000s ease-in-out 50000s;
        }
        .icon-chahao1 {
          position: absolute;
          right: 5px;
          font-size: 24px;
          font-weight: 700;
          color: #1abc9c;
        }
        .icon-chahao1:hover {
          cursor: pointer;
        }
      }
      .passwd {
        top: 283px;
        color: #606266;
      }
      .active {
        border: 3px solid #1abc9c;
      }
      .tips {
        display: flex;
        align-items: center;
        position: absolute;
        top: 370px;
        left: 50%;
        transform: translateX(-50%);
        width: 300px;
        height: 40px;
        font-size: 13px;
        color: #fff;
        background-color: #949494;
        border-radius: 5px;
        .icon-gantanhao{
          margin: 0 5px 0 20px;
          // font-size: 16px;
          color: #fff;

          // background-color: #fff;
        }
      }

      .submit {
        position: absolute;
        top: 430px;
        width: 100%;
        height: 67px;
        line-height: 67px;
        color: #fff;
        font-size: 18px;
        font-family: 'Arial Normal', 'Arial';
        background-color: #199ed8;
        text-align: center;
        border-radius: 3px;
      }
      .submit:hover {
        cursor: pointer;
      }
      .submitclick {
        animation: moveshake 0.3s;
        // top: 430px;
      }
    }
  }
}

@keyframes moveshake {
  0% {
    top: 425px;
  }
  25% {
    top: 435px;
  }
  50% {
    top: 425px;
  }
  75% {
    top: 435px;
  }
  100% {
    top: 425px;
  }
}
</style>
