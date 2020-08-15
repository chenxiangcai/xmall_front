import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    userInfo: null,
    cartList: [],
    showCart: false
  },
  mutations: {
    SHOWCART (state, { showcart }) {
      state.showcart = showcart
    }
  },
  actions: {
  },
  modules: {
  }
})
