import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

// 全局守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(value => value.meta.auth)) {
    next({
      path: 'login',
      query: {
        redirect: to.fullPath
      }
    })
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
