<template>
  <q-page class="q-pa-md">
    <q-pull-to-refresh @refresh="queryInfo">
      <div class="cus-card q-pa-md"  @click="toAna">
        <div class="cus-card-tit">
          <span class="cus-card-tit-word">订单核销</span>
          <q-btn flat round icon="fa fa-angle-right" size="sm" class="c-tips"></q-btn>
        </div>
        <div class="flex-row flex-space-between">
          <div class="flex-column left">
            <span class="tit-md">订单数</span>
            <span class="content">{{order.order_num}}</span>
          </div>
          <div class="flex-column right">
            <span class="tit-md">订单金额</span>
            <span class="content">￥{{order.total}}</span>
          </div>
        </div>
      </div>
      <!------------------------------2-------------------------->
      <div class="cus-card q-pa-md"  @click="toCus">
        <div class="cus-card-tit">
          <span class="cus-card-tit-word">顾客</span>
          <q-btn flat round icon="fa fa-angle-right" size="sm" class="c-tips"></q-btn>
        </div>
        <div class="flex-row flex-space-between">
          <div class="flex-column left">
            <span class="tit-md">消费人数</span>
            <span class="content">{{order.customer}}</span>
          </div>
        </div>
      </div>
      <!------------------------------3-------------------------->
      <div class="cus-card q-pa-md"  @click="toSettle">
        <div class="cus-card-tit">
          <span class="cus-card-tit-word">结算款</span>
          <q-btn flat round icon="fa fa-angle-right" size="sm" class="c-tips"></q-btn>
        </div>
        <div class="flex-row flex-space-between">
          <div class="flex-column left">
            <span class="tit-md">结算金额</span>
            <span class="content cus-orange">￥{{order.cost}}</span>
          </div>
        </div>
      </div>
      <q-inner-loading :showing="showLoading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
  import urls from 'src/api/urls'
  import { mapState } from 'vuex'
  export default {
    name: "company",
    data () {
      return {
        showLoading: false,
        order: {
          cost: 0, // 结算金额
          customer: 0, // 核销人数
          order_num: 0, // 订单数
          total: 0 // 订单金额
        }
      }
    },
    created () {
      this.$store.commit('common/setTit', '经营状况')
      this.queryInfo()
    },
    computed: {
      ...mapState({
        status: (state) => state.common.searchOptions.time_status
      })
    },
    watch: {
      status (val) {
        this.queryInfo()
      }
    },
    methods: {
      toAna () { // 跳转核销详情
        this.$store.commit('common/isShowBack', true)
        this.$router.push({name: 'Analysis', params: {type: 2}}) // type 1- 商户进入，2-门店进入
      },
      toCus () {
        this.$store.commit('common/isShowBack', true)
        this.$router.push({name: 'Customer', params: {type: 2}}) // type 1- 商户进入，2-门店进入
      },
      toSettle () {
        this.$store.commit('common/isShowBack', true)
        this.$store.commit('common/setSearchOptions', 2)
        this.$router.push({name: 'Settlement', params: {type: 2}}) // type 1- 商户进入，2-门店进入
      },
      queryInfo (done) {
        let vm = this
        let status = this.status
        let id = this.$q.localStorage.getItem('currentShop')
        let params = {
          'time_status': status,
          'shopid': id
        }
        vm.showLoading = true
        // console.log(params)
        this.$axios(urls.getShopInfo, params).then(res => {
          let code = res.code
          if (code === 'success') {
            Object.assign(vm.order, res.order)
            setTimeout(() => {
              vm.showLoading = false
            }, 1000)
            if (done) {
              done()
            }
          } else {
            setTimeout(() => {
              vm.showLoading = false
            }, 1000)
            vm.$q.notify(res.msg)
          }
        }, () => {
          setTimeout(() => {
            vm.showLoading = false
          }, 1000)
        })
      }
    }
  }
</script>

<style scoped>
  .cus-card-tit{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cus-card-tit-word{
    font-size: 1.8rem;
    font-weight: bold;
    color: #000000;
  }
  .tit-md{
    margin-top: 2rem;
    font-size: 1.4rem;
  }
  .content{
    margin-top: 1.2rem;
    font-size: 2.1rem;
    font-weight: bolder;
  }
  .left{
    margin-left: 6rem;
  }
  .right{
    margin-right: 6rem;
  }
  .cus-orange{
    color: #FF632E;
  }
</style>
