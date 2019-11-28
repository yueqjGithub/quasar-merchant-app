const routes = [
  {
    path: '/', component: () => import ('layouts/PageLayout.vue'),
    children: [
      {path: '', name: 'Login', component: () => import ('pages/Login.vue')},
      {path: '/register', name: 'Register', component: () => import ('pages/Register.vue')}
    ]
  },
  {
    path: '/index', component: () => import('layouts/indexLayout.vue'),
    children: [
      {path: 'companyindex', name: 'CompanyIndex', component: () => import('pages/index/company')},
      {path: 'shopindex', name: 'ShopIndex', component: () => import('pages/index/shop')}
    ]
  },
  {
    path: '/scan', component: () => import('pages/module/scan.vue')
  },
  {
    path: '/user', component: () => import ('layouts/UserLayout'),
    children: [
      {path: 'index', name: 'Index', component: () => import ('pages/Index'), meta: {title: '统计报表', requireAuth: true}},
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import ('pages/Coupon'),
        meta: {title: '发放优惠券', requireAuth: true}
      },
      {path: 'mine', name: 'Mine', component: () => import ('pages/Mine'), meta: {title: '我的信息', requireAuth: true}}, // 我的主页
      {
        path: 'application',
        name: 'Application',
        component: () => import ('pages/application/Application'),
        meta: {title: '应用', requireAuth: true}
      }, // 应用主页

    ]
  },
  {
    path: '/page', component: () => import ('layouts/HeaderLayout'),
    children: [
      {
        path: 'paysubmit',
        name: 'Paysubmit',
        component: () => import ('pages/PaySubmit'),
        meta: {title: '充值提现', requireAuth: true}
      },
      {
        path: 'cashier',
        name: 'Cashier',
        component: () => import ('pages/Cashier'),
        meta: {title: '门店报表', requireAuth: true}
      },
      {
        path: 'receiverecord',
        name: 'ReceiveRecord',
        component: () => import ('pages/ReceiveRecord'),
        meta: {title: '领取明细', requireAuth: true}
      },
      {
        path: 'receivecost',
        name: 'ReceiveCost',
        component: () => import ('pages/ReceiveCost'),
        meta: {title: '核销明细', requireAuth: true}
      },
      {
        path: 'receivebalance',
        name: 'ReceiveBalance',
        component: () => import ('pages/ReceiveBalance'),
        meta: {title: '佣金扣除明细', requireAuth: true}
      },
      {
        path: 'balance',
        name: 'Balance',
        component: () => import ('pages/Balance'),
        meta: {title: '知了贝', requireAuth: true}
      },
      {path: 'fans', name: 'Fans', component: () => import ('pages/Fans'), meta: {title: '粉丝', requireAuth: true}},
      {
        path: 'createcoupon',
        name: 'CreateCoupon',
        component: () => import ('pages/CreateCoupon'),
        meta: {title: '新增优惠券', requireAuth: true}
      },
      {
        path: 'editcoupon',
        name: 'EditCoupon',
        component: () => import ('pages/EditCoupon'),
        meta: {title: '编辑优惠券', requireAuth: true}
      },
      {
        path: 'recharge',
        name: 'Recharge',
        component: () => import ('pages/Recharge'),
        meta: {title: '充值', requireAuth: true}
      },
      {
        path: 'withdrawal',
        name: 'Withdrawal',
        component: () => import ('pages/Withdrawal'),
        meta: {title: '提现', requireAuth: true}
      },
      // {path: 'createpay',name: 'createPay',component: () =>import ('pages/CreatePay'),meta: {title: '充值',requireAuth: true }}
      {
        path: 'setting',
        name: 'Setting',
        component: () => import ('pages/setting'),
        meta: {title: '设置', requireAuth: true}
      }, // 设置主页
      {
        path: 'resetpwd',
        name: 'ResetPassword',
        component: () => import ('pages/settings/ResetPassword'),
        meta: {title: '修改密码', requireAuth: true}
      }, // 修改密码
      {
        path: 'userinfo',
        name: 'UserInfo',
        component: () => import ('pages/userInfo/UserInfo'),
        meta: {title: '个人资料', requireAuth: true}
      }, // 个人资料首页
      {
        path: 'storeslist',
        name: 'StoresList',
        component: () => import ('pages/application/StoresList'),
        meta: {title: '门店', requireAuth: true}
      }, // 门店列表
      {
        path: 'storeinfo',
        name: 'StoreInfo',
        component: () => import ('pages/application/StoreInfo'),
        meta: {title: '门店详情', requireAuth: true}
      } // 门店详情
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({path: '*', component: () => import ('pages/Error404.vue')})
}

export default routes
