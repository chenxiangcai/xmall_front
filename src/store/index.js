import Vue from 'vue'
import Vuex from 'vuex'
import { setStore, getStore } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    userInfo: null,
    cartList: [],
    showCart: false
  },
  mutations: {
    // 网页初始化时从本地缓存获取购物车数据
    INITBUYCART (state) {
      const initCart = getStore('buyCart')
      if (initCart) {
        state.cartList = JSON.parse(initCart)
      }
    },
    SHOWCART (state, { showCart }) {
      state.showCart = showCart
    },
    ISLOGIN (state, data) {
      state.login = true
      state.userInfo = data
    },
    ADDCART (state, { productId, salePrice, productName, productImageBig, productNum = 1 }) {
      const cart = state.cartList
      const goods = {
        productId,
        salePrice,
        productName,
        productImageBig
      }
      let falg = true
      if (cart.length) {
        cart.forEach(item => {
          if (item.productId === productId) {
            if (item.productNum >= 0) {
              falg = false
              item.productNum += productNum
            }
          }
        })
      }
      if (!cart.length || falg) {
        goods.productNum = productNum
        cart.push(goods)
      }
      state.cartList = cart
      setStore('buyCart', cart)
    }
  },
  actions: {
  },
  modules: {
  }
})
