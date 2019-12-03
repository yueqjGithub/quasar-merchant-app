export default {
  showBack: false, // 头部是否显示返回按钮
  titleName: '经营状况', // 头部名字
  searchOptions: { // 根据日期查询条件
    'time_status': 2
  },
  cRole: 'hq', // 当前选择的角色code - hq-商户，shop-门店
  // 以下为首页第三栏数据显示控制
  information: {
    order_num: 0, // 订单数
    total: 0, // 订单金额
    customer: 0, // 顾客数量
    cost_total: 0, // 累计结算
    account_total: 0 // 累计到账
  }
}
