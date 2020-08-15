import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Goods from '@/views/Goods'
import Thanks from '@/views/Thanks'
import GoodsDetail from '@/views/Goods/GoodsDetail'
import User from '@/views/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'home',
    component: Index,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'thanks',
        component: Thanks
      },
      {
        path: 'goodsDetail',
        name: 'goodsDetail',
        component: GoodsDetail
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
