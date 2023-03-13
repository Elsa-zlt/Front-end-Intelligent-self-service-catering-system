import service from '@/utils/http'
import axios from 'axios'

function handleTest() {
  // console.log(JSON.parse(localStorage.getItem('user_token')))
  // console.log(typeof (JSON.parse(localStorage.getItem('user_token'))))
  let info1 = localStorage.getItem('user_token')
  info1 = info1.substring(1, info1.length - 1)
  console.log(info1)
  service.get('restaurant/list', {})
    .catch(error => {
      console.log(error)
    })
    .then(res => {
      console.log(res)
    })

  axios.get('http://localhost:8081/restaurant/list', {
    headers: {
      token: info1
    }
  }).catch(error => {
    console.log(error)
  })
    .then(res => {
      console.log(JSON.parse(localStorage.getItem('user_token')))
      console.log(res)
    })
  axios.get('http://localhost:8081/menu/list', {
    headers: {
      token: info1
    }
  }).catch(error => {
    console.log(error)
  })
    .then(res => {
      console.log(JSON.parse(localStorage.getItem('user_token')))
      console.log(res)
    })
  axios.put('http://localhost:8081/restaurant', {
    resId: 5,
    resName: 'hhh',
    resAddress: 'hhh',
    resOpenTime: 'hhh',
    resNum: 1
  }, {
    headers: {
      token: info1
    }
  }).catch(error => {
    console.log(error)
  })
    .then(res => {
      console.log(JSON.parse(localStorage.getItem('user_token')))
      console.log(res)
    })
  service
    .post('restaurant', {
      resId: 7,
      resName: 'test1',
      resAddress: 'test1',
      resOpenTime: 'test1',
      resNum: 1
    })
    .catch(error => {
      console.log(error)
    })
    .then(res => {
      console.log(res)
    })
  service
    .post('order', {
      oId: '22',
      mId: '2',
      cId: '1',
      mName: '韭菜',
      moNum: '3',
      moPrice: '5'
    })
    .catch(error => {
      console.log(error)
    })
    .then(res => {
      console.log(res)
    })
}
