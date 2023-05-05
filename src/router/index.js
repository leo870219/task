import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PreLogin",
    component: () => import("../pages/preLogin/PreLogin.vue"),
  },
  {
    path: "/member",
    redirect: "/member/account-management",
    name: "Member",
    component: () => import("../pages/member/Member.vue"),
    children: [
      {
        path: "account-management",
        name: "AccountManagement",
        component: () =>
          import("../pages/member/account-management/AccountManagement.vue"),
      },
      {
        path: "account-creator",
        name: "AccountCreator",
        component: () =>
          import("../pages/member/account-creator/AccountCreator.vue"),
      },
      {
        path: "product-management",
        name: "ProductManagement",
        component: () =>
          import("../pages/member/product-management/ProductManagement.vue"),
      },
      {
        path: "product-creator",
        name: "ProductCreator",
        component: () =>
          import("../pages/member/product-creator/ProductCreator.vue"),
      },
    ],
  },
  {
    path: "*",
    redirect: () => {
      return { path: "/" };
    },
    component: () => import("../pages/preLogin/PreLogin.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.isLogin && to.path.indexOf("/member") !== -1) {
    // 将用户重定向到登录页面
    next({ name: "PreLogin" });
  } else {
    next();
  }
});

export default router;
