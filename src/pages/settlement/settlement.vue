<template>
  <q-page class="q-pa-md">
    <q-pull-to-refresh @refresh="refresh" v-if="list.length > 0">
      <q-infinite-scroll @load="turnPage" :offset="1" :disable="list.length < pageCount || page > totalPage" class="custom-infinite" ref="clues-all-infinite">
        <div v-for="k in list" :key="k.id" class="cus-card">
          <div class="q-pa-md flex-row flex-space-between detail-border">
            <span class="detail-word">对账单号：{{k.order_no}}</span>
            <span class="text-negative" v-if="k.check_status === 0">审核中</span>
            <span class="text-orange" v-if="k.check_status === 1">付款中</span>
            <span class="text-green" v-if="k.check_status === 2">已到账</span>
          </div>
          <div class="q-pa-md flex-row flex-space-between detail-bottom">
            <div class="flex-column">
              <span class="detail-count">结算金额：￥{{k.cost}}</span>
              <span class="detail-time">结算时间：{{k.end_time}}</span>
            </div>
            <q-btn size="sm" outline label="查看明细" color="grey-4" text-color="grey-6" @click="toDetail(k)"></q-btn>
          </div>
        </div>
      </q-infinite-scroll>
      <q-inner-loading :showing="showLoading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-pull-to-refresh>

    <div class="text-center text-grey-14" v-else>当前暂无数据</div>
  </q-page>
</template>

<script>
import urls from 'src/api/urls'
import { mapState } from 'vuex'
export default {
  name: "settlement",
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
    vm.$store.commit('common/setTit', '结算详情')
    let role = this.$route.params.type
    let url
    let param
    if (role === 1) {
      url = urls.getCompanySettlement
      param = {
        'thisPage': 1,
        'pageCount': vm.pageCount,
        'time_status': vm.status,
        'companyid': vm.$q.localStorage.getItem('userInfo').companyid
      }
      vm.queryInfo(url, param)
    } else if (role === 2) {
      url = urls.getShopSettlement
      param = {
        'thisPage': 1,
        'pageCount': vm.pageCount,
        'time_status': vm.status,
        'shopid': vm.$q.localStorage.getItem('currentShop')
      }
      vm.queryInfo(url, param)
    }
  },
  computed: {
    ...mapState({
      status: (state) => state.common.searchOptions.time_status
    })
  },
  watch: {
    status (val) {
      this.refresh()
    }
  },
  methods: {
    toDetail (obj) {
      let type = this.$route.params.type
      this.$router.push({name: 'SettlementDetail', params: {obj: obj, type: type}})
    },
    refresh (done) {
      let vm = this
      vm.page = 1
      let url
      let role = vm.$route.params.type
      let params = {
        'thisPage': this.page,
        'pageCount': this.pageCount,
        'time_status': vm.status
      }
      if (role === 1) {
        params['companyid'] = vm.$q.localStorage.getItem('userInfo').companyid
        url = urls.getCompanySettlement
      } else if (role === 2) {
        url = urls.getShopSettlement
        params['shopid'] = vm.$q.localStorage.getItem('currentShop')
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
          vm.$store.commit('common/setInfo', {key: 'cost_total', value: res.cost_total.cost_total})
          vm.$store.commit('common/setInfo', {key: 'account_total', value: res.account_total.account_total})
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
      let url
      let role = vm.$route.params.type
      let params = {
        'thisPage': this.page + 1,
        'pageCount': this.pageCount,
        'time_status': vm.status
      }
      if (role === 1) {
        params['companyid'] = vm.$q.localStorage.getItem('userInfo').companyid
        url = urls.getCompanySettlement
      } else if (role === 2) {
        url = urls.getShopSettlement
        params['shopid'] = vm.$q.localStorage.getItem('currentShop')
      }
      // 参数拼接完成
      vm.showLoading = true
      vm.$axios(url, params).then(res => {
        let code = res.code
        if (code === 'success') {
          if (res.list.length > 0) {
            vm.$store.commit('common/setInfo', {key: 'cost_total', value: res.cost_total.cost_total})
            vm.$store.commit('common/setInfo', {key: 'account_total', value: res.account_total.account_total})
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
        console.log(err)
        vm.showLoading = false
      })
    }
  }
}
</script>

<style scoped>
.detail-word{
  font-size: 1.2rem;
  color: #8E8E93;
}
.detail-border{
  border-bottom: 1px solid #E6E6E6;
}
.detail-count{
  font-size: 1.2rem;
  color: #666666;
}
.detail-time{
  margin-top: .5rem;
  font-size: 1.2rem;
  color: #333333;
}
</style>
