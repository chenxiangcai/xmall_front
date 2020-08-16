import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import { getStore } from '@/utils/storage'
// 使用vue-lazylocad
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/images/error.png',
  loading: 'static/images/load.gif',
  attempt: 1
})
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  const token = getStore('token')
  if (token) {
    // 表示用户已登录
    config.headers.common.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 全局守卫
router.beforeEach((to, from, next) => {
  axios.post('/api/validate', {}).then(res => {
    const data = res.data
    if (data.state !== 1) {
      // 用户要登录
      if (to.matched.some(record => record.meta.auth)) {
        // 用户未登录 需要跳转登录页面
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    } else {
      // 保存用户的信息
      store.commit('ISLOGIN', data)

      if (to.path === '/login') {
        router.push({
          path: '/'
        })
      }
      next()
    }
  }).catch(error => {
    console.log(error)
  })
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
