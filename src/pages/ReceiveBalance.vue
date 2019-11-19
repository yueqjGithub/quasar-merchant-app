<template>
  <q-page>
    <q-header bordered class="bg-green text-white  header-fix">
      <q-toolbar>
        <q-btn flat round dense class="text-white" v-go-back="'/'" icon="keyboard_arrow_left" />
        <q-toolbar-title class="text-center text-white">佣金扣除明细</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div class="row title-colom">
      <div class="col-6">今日核销费：<span>{{today}}元</span></div>
      <div class="col-6">总核销费：<span>{{count}}元</span></div>
    </div>
    <div class="order-list balance-list" ref="scrollTargetRef">
       <q-pull-to-refresh @refresh="refresh" color="positive" icon="lightbulb">
          <!-- <q-infinite-scroll @load="onLoadRef" :offset="250" :scroll-target="$refs.scrollTargetRef"> -->
            <div class="row li" v-for="(item, index) in items" :key="index">
              <div class="col-8 fl">
                <div class="h3">{{item.user_name}}用户领取</div>
                <div class="p">{{item.shop_name}}</div>
              </div>
              <div class="col-4 fr">
                <div class="times">{{item.create_time}}</div>
                <div class="price">扣除佣金 <span>-￥{{item.amount}}</span></div>
              </div>
            </div>

            <!-- <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="positive" size="40px" />
              </div>
            </template> -->
          <!-- </q-infinite-scroll> -->
        </q-pull-to-refresh>
    </div>
  </q-page>
</template>

<script>
  import {notify} from 'src/utils/popups'
  import {getBalanceHistoryApi} from 'src/api/order'
  export default {
    name: 'ReceiveCost',
    data() {
      return {
        items: [],
        page:1,
        loading:true,
        pageCount:300
      }
    },
  created () {
    this.onLoadRef()
  },
  computed: {
    today() {
      return this.$store.state.user.indexStatistics.today_cost_coupon_fee
    },
    count(){
      return this.$store.state.user.indexStatistics.cost_coupon_fee
    }
  },
    methods: {
      onLoadRef(){
        // setTimeout(() => {
          let data = {"thisPage":1,"pageCount":this.pageCount,type: 0} // 0-消费，1-充值
          getBalanceHistoryApi(data).then(res=>{
            if (res.list.length !== 0) {
              this.items = [...this.items,...res.list]
              // done()
            }
          }).catch(err=>{
            console.log(err)
          })

        // }, 2000)
      },
      refresh (done) {
        setTimeout(() => {
          this.items = []
          let data = {"thisPage":1,"pageCount":this.pageCount}
          getBalanceHistoryApi(data).then(res=>{
            this.items = [...res.list]
            done()
          }).catch(err=>{
            console.log(err)
          })
        }, 1000)
      }
    },
  }
</script>
