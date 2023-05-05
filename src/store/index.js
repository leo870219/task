import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";
import accountModule from "@/store/member/account";
import productModule from "@/store/member/product";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account: accountModule,
    product: productModule,
  },
  state: {
    isLogin: !!VueCookies.get("user"),
  },
  mutations: {
    setUserIsLogin(state, status) {
      state.isLogin = status;
    },
  },
});
