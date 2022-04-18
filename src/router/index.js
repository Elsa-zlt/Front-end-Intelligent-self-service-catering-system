import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '../views/Index.vue'

Vue.use(VueRouter) // 注册路由，在注册时vue就自动生成了一个全局组件router-view

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/index',
    name: 'Index',
    // component: Index
    component: () => import(/* webpackChunkName: "group-index" */ '../views/NewIndex.vue'),
    redirect: '/index/home',
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "group-index" */ '../views/home/Home.vue')
      },
      {
        path: 'assess',
        component: () => import(/* webpackChunkName: "group-feedback" */ '../views/feedback/Assess.vue')
      },
      {
        path: 'complaint',
        component: () => import(/* webpackChunkName: "group-feedback" */ '../views/feedback/Complaint.vue')
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "group-customer" */ '../views/customer/User.vue')
      },
      {
        path: 'order',
        component: () => import(/* webpackChunkName: "group-customer" */ '../views/customer/Order.vue')
      },
      {
        path: 'income',
        component: () => import(/* webpackChunkName: "group-stats" */ '../views/stats/Income.vue')
      },
      {
        path: 'like',
        component: () => import(/* webpackChunkName: "group-stats" */ '../views/stats/Like.vue')
      },
      {
        path: 'caloric',
        component: () => import(/* webpackChunkName: "group-stats" */ '../views/stats/Caloric.vue')
      },
      {
        path: 'dish',
        component: () => import(/* webpackChunkName: "group-dishes" */ '../views/dishes/Dish.vue')
      },
      {
        path: 'newDish',
        component: () => import(/* webpackChunkName: "group-dishes" */ '../views/dishes/NewDish.vue')
      },
      {
        path: '*',
        redirect: '/index/home'
      }
    ]
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

// 全局路由拦截
/* router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.fullPath.indexOf('/index') !== -1 && !localStorage.getItem('token')) {
    console.log('进入首页时，没有token')
    next('/login')
  } else {
    next()
  }
}) */

export default router
