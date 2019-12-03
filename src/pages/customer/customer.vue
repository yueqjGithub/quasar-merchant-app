<template>
  <q-page class="q-pa-md">
    <q-pull-to-refresh @refresh="refresh" v-if="list.length > 0">
      <q-infinite-scroll @load="turnPage" :offset="1" :disable="list.length < pageCount || page > totalPage" class="custom-infinite" ref="clues-all-infinite">
        <div v-for="k in list" :key="k.buyer" class="cus-card q-pa-md">
          <div class="flex-row flex-align-center">
            <q-avatar color="tips" size="4rem">
              <img :src="k.photo" alt="">
            </q-avatar>
            <span class="detail-word detail-ma-l">{{k.nickname}}</span>
          </div>
          <div class="flex-column detail-cont">
            <span class="detail-word">最近消费：{{k.product_name}}</span>
            <span class="detail-word detail-ma-t">消费时间：{{k.use_time}}</span>
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
  name: "customer",
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
    vm.$store.commit('common/setTit', '消费顾客')
    let role = this.$route.params.type
    let url
    let param
    if (role === 1) {
      url = urls.getCompanyCustomer
      param = {
        'thisPage': 1,
        'pageCount': vm.pageCount,
        'time_status': vm.status,
        'companyid': vm.$q.localStorage.getItem('userInfo').companyid
      }
      vm.queryInfo(url, param)
    } else if (role === 2) {
      url = urls.getShopCustomer
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
        url = urls.getCompanyCustomer
      } else if (role === 2) {
        url = urls.getShopCustomer
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
          vm.$store.commit('common/setInfo', {key: 'customer', value: res.customer_num.customer})
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
        url = urls.getCompanyCustomer
      } else if (role === 2) {
        url = urls.getShopCustomer
        params['shopid'] = vm.$q.localStorage.getItem('currentShop')
      }
      // 参数拼接完成
      vm.showLoading = true
      vm.$axios(url, params).then(res => {
        let code = res.code
        if (code === 'success') {
          if (res.list.length > 0) {
            vm.$store.commit('common/setInfo', {key: 'customer', value: res.customer_num.customer})
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
  color: #666666;
}
.detail-ma-l{
  margin-left: 1rem;
}
.detail-ma-t{
  margin-top: 1rem;
}
.detail-cont{
  margin-top: 1.5rem;
}
</style>
