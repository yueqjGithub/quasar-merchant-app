<template>
  <q-page class="q-pa-md">
    <q-pull-to-refresh @refresh="refresh">
      <q-infinite-scroll @load="turnPage" :offset="1" :disable="list.length < pageCount || page > totalPage" class="custom-infinite" ref="clues-all-infinite">
        <div v-for="k in list" :key="k.id" class="cus-card q-pa-md">
          <div class="flex-row flex-space-between">
            <span class="company-name">{{k.shop_name || '1111'}}</span>
            <span class="company-name">供应价格：{{k.buy_price || '1111'}}</span>
          </div>
          <div class="flex-row flex-space-between flex-align-center cont-detail">
            <div class="flex-column">
              <span class="product-name">{{k.product_name || '1111'}}</span>
              <span class="detail">订单编号：{{k.orderid || '1111'}}</span>
              <span class="detail">核销时间：{{k.use_time || '1111'}}</span>
            </div>
            <div>
              <img src="statics/images/over.png" alt="" class="used-img">
            </div>
          </div>
        </div>
      </q-infinite-scroll>
      <q-inner-loading :showing="showLoading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import urls from 'src/api/urls'
export default {
  name: "analysis",
  props: ['orderNo'],
  data () {
    return {
      showLoading: false,
      page: 1,
      pageCount: 20,
      totalPage: 0,
      list: []
    }
  },
  created () {
    let vm = this
    let param = {
      'thisPage': 1,
      'pageCount': vm.pageCount,
      'order_no': this.orderNo
    }
    vm.queryInfo(urls.querySettlementDetail, param)
  },
  methods: {
    refresh (done) {
      let vm = this
      vm.page = 1
      let url = urls.querySettlementDetail
      let params = {
        'thisPage': this.page,
        'pageCount': this.pageCount,
        'order_no': this.orderNo
      }
      vm.queryInfo (url, params, done)
    },
    queryInfo (url, param, done) { // 刷新及首次请求
      let vm = this
      vm.page = 1
      vm.showLoading = true
      vm.$axios(url, param).then(res => {
        // console.log(res)
        let code = res.code
        if (code === 'success') {
          vm.list = [...res.list]
          vm.total = res.totalCount
          vm.totalPage = res.totalPage
          if (done) {
            done()
          }
          vm.showLoading = false
        } else {
          vm.$q.notify(res.msg)
          vm.showLoading = false
        }
      }, () => {
      })
    },
    turnPage (index, done) { // 下拉加载
      let vm = this
      let url = urls.querySettlementDetail
      let params = {
        'thisPage': this.page,
        'pageCount': this.pageCount,
        'order_no': this.orderNo
      }
      // 参数拼接完成
      vm.showLoading = true
      vm.$axios(url, params).then(res => {
        let code = res.code
        if (code === 'success') {
          if (res.list.length > 0) {
            vm.datas = [...vm.datas, ...res.list]
            // Array.prototype.push.apply(vm.datas)
            vm.totalPage = res.totalPage
            vm.page++
          } else {
            vm.page++
            vm.$q.notify('没有更多啦')
          }
          done() // 终极方案，page+1，上啦加载执行条件，page-totalPage < 1
        } else {
          this.$q.notify(res.msg)
        }
        vm.showLoading = false
      }, err => {
        vm.showLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .company-name{
    color: #333333;
    font-size: 1.2rem;
  }
  .cont-detail{
    margin-top: 1rem;
  }
  .detail{
    color: #666666;
    font-size: 1.1rem;
    margin-top: .5rem;
  }
  .product-name{
    color: #000000;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  .used-img{
    max-width: 20vw;
  }
</style>
