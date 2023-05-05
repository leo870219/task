export default {
  sidebar: [
    {
      title: "帳號管理",
      type: "link",
      path:'/member/account-management',
      categories: [
        {
          title: "列表",
          path: "/member/account-management",
        },
        {
          title: "新增",
          path: "/member/account-creator",
        },
      ],
    },
    {
      title: "產品管理",
      type: "link",
      path:'/member/product-management',
      categories: [
        {
          title: "列表",
          path: "/member/product-management",
        },
        {
          title: "新增",
          path: "/member/product-creator",
        },
      ],
    },
    {
      title: "登出",
      type: "feature",
      categories: [],
    },
  ],
  modal: {
    title: "系統訊息",
    checkMessage: "確認刪除？",
    submit: "確認",
    cancel: "取消",
  },
};
