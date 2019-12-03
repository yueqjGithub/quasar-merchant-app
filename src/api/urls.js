const urls = {
  // 登录
  login: '/api/common/login/login.vm', // 登录
  register: '/api/b/company/create.vm', // 商家入驻
  uploadImg: '/api/common/upload/upload.vm', // 图片上传
  getAddress: '/api/service/common/geo.vm', // 获取经纬度
  resetMypwd: '/api/b/my/update.vm', // 修改登录用户密码
  resetShopPwd: '/api/b/shop/change_password.vm', // 重置门店密码
  getContract: '/api/b/my/get_contract.vm', // 获取电子合同内容
  saveContract: '/api/b/my/contract.vm', // 保存电子合同
  // 首页
  getShopList: '/api/b/index/company_or_shop.vm', // 获取门店List
  getCompanyInfo: '/api/b/index/company/company_analysis.vm', // 首页商户数据
  getCompanyAna: '/api/b/index/company/order_cost.vm', // 商户核销订单数据
  getCompanyCustomer: '/api/b/index/company/customer.vm', // 获取商户顾客详情
  getCompanySettlement: '/api/b/index/company/settlement.vm', // 获取商户结算详情
  // -----
  getShopInfo: '/api/b/index/shop/shop_analysis.vm', // 首页门店数据
  getShopAna: '/api/b/index/company/order_cost.vm', // 门店核销订单数据
  getShopCustomer: '/api/b/index/company/customer.vm', // 获取门店顾客详情
  getShopSettlement: '/api/b/index/company/settlement.vm', // 获取门店结算详情
  // -----
  querySettlementDetail: '/api/b/index/shop/details.vm', // 查询结算明细
  // 应用
  queryMyProduct: '/api/b/product/product/list.vm', // 查询菜品列表
  queryTags: '/api/b/product/tags/list.vm', // 查询菜品标签
  queryMyShop: '/api/b/shop/list.vm', // 查询门店列表
  queryShopTypeList: '/api/b/shop/shop_type/list.vm', // 查询门店类型列表
  queryProductTypeList: '/api/b/product/product/get_product_type.vm', // 查询菜品类型列表
  createProduct: '/api/b/product/product/create.vm', // 新建菜品
  editProduct: '/api/b/product/product/update.vm', // 修改菜品
  editShop: '/api/b/shop/update.vm', // 修改门店
  getShops: '/api/b/shop/list.vm', // 菜品获取发放门店
  getBankInfo: '/api/b/shop/get_bank.vm', // 获取银行信息
  createShop: '/api/b/shop/create.vm' // 新建门店

}

export default urls
