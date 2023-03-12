// 导入axios
import axios from 'axios'

// 从localStorage里面获取登录时保存的token信息
let TOKENINFO = localStorage.getItem('user_token')
TOKENINFO = TOKENINFO.substring(1, TOKENINFO.length - 1)

// 配置axios工具类
const service = axios.create({
  // 基础URL
  baseURL: 'http://localhost:8081',
  // 请求超时
  timeout: 5000,
  // 请求头headers信息，保存请求token信息
  headers: {
    token: TOKENINFO
  }
})

// 导出service
export default service
