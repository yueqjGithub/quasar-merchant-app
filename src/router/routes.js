const routes = [
  {
    path: '/', component: () => import ('layouts/PageLayout.vue'),
    children: [
      {path: '', name: 'Login', component: () => import ('pages/Login.vue')}
      // {path: '/register', name: 'Register', component: () => import ('pages/Register.vue')}
    ]
  },
  { // 首页新
    path: '/index', component: () => import('layouts/indexLayout.vue'),
    children: [
      {path: 'companyindex', name: 'CompanyIndex', component: () => import('pages/index/company')},
      {path: 'shopindex', name: 'ShopIndex', component: () => import('pages/index/shop')},
      {path: 'analysis', name: 'Analysis', component: () => import('pages/analysis/analysis')},
      {path: 'customer', name: 'Customer', component: () => import('pages/customer/customer')},
      {path: 'settlement', name: 'Settlement', component: () => import('pages/settlement/settlement')}
    ]
  },
  { // 对账单明细
    path: '/detail', name: 'SettlementDetail', component: () => import('pages/settleDetail/settleDetail')
  },
  { // 切换门店
    path: '/changeRole', name: 'ChangeRole', component: () => import('pages/index/chooseUser')
  },
  { // 应用首页
    path: '/app', name: 'App', component: () => import('pages/application/index')
  },
  {
    path: '/mine', name: 'Mine', component: () => import('pages/Mine/index')
  },
  // ----------------------以下路由为之前版本
  {
    path: '/scan', component: () => import('pages/module/scan.vue')
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
      {path: 'register', name: 'Register', component: () => import ('pages/index/register.vue')}, // 君子约定，以此为界--入驻
      // {path: 'createpay',name: 'createPay',component: () =>import ('pages/CreatePay'),meta: {title: '充值',requireAuth: true }}
      {
        path: 'resetpwd',
        name: 'ResetPassword',
        component: () => import ('pages/settings/ResetPassword'),
        meta: {title: '修改密码', requireAuth: true}
      }, // 修改密码
      {
        path: 'contract',
        name: 'Contract',
        component: () => import ('pages/contract/contract')
      }, // 合同
      {
        path: 'account',
        name: 'Account',
        component: () => import ('pages/Mine/account'),
        meta: {title: '个人资料', requireAuth: true}
      }, // 个人资料首页
      {
        path: 'storeslist',
        name: 'StoresList',
        component: () => import ('pages/application/StoresList'),
        meta: {title: '门店', requireAuth: true}
      }, // 门店列表111
      {
        path: 'storeinfo',
        name: 'StoreInfo',
        component: () => import('pages/application/StoreInfo')
      }, // 门店信息
      {
        path: 'product',
        name: 'Product',
        component: () => import ('pages/product/product'),
        meta: {title: '门店', requireAuth: true}
      }, // 菜品列表111
      {
        path: 'productinfo',
        name: 'ProductInfo',
        component: () => import('pages/product/productInfo')
      } // 菜品详情
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({path: '*', component: () => import ('pages/Error404.vue')})
}

export default routes
