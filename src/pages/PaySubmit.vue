<template>
  <q-page>
    <q-header class="bg-green text-white  header-fix">
      <q-toolbar>
        <q-btn flat round dense class="text-white" v-go-back="'/'" icon="keyboard_arrow_left" />
        <q-toolbar-title class="text-center text-white">充值提现</q-toolbar-title>
        <q-btn flat dense class="text-white" :to="{name:'Withdrawal'}" label="申请提现" />
      </q-toolbar>
    </q-header>
    <div class="pay-index">
      <p>余额</p>
      <div class="price">{{money}}<span>元</span></div>
    </div>
    <div class="pay-list" ref="scrollTargetRef">
    <q-pull-to-refresh @refresh="refresh" color="positive" icon="lightbulb">
    <!-- <q-infinite-scroll @load="onLoadRef" :offset="250" :scroll-target="$refs.scrollTargetRef"> -->
      <div class="li row" v-for="(item, index) in items" :key="index">
      <!-- <div class="li row"> -->
        <div class="col-10 fl">
          <div class="h3" v-if="item.type == 0">{{item.user_name}}用户核销支付佣金 </div>
          <div class="h3" v-if="item.type == 1">{{item.user_name}}用户充值金额</div>
          <div class="h3" v-if="item.type == 2">{{item.user_name}}申请提现成功 3~5个工作日到账</div>
          <div class="time">{{item.create_time}}</div>
        </div>
        <div class="col-2 fr">{{item.amount}}<span>元</span></div>
      </div>
    <!-- </q-infinite-scroll> -->
    </q-pull-to-refresh>

    </div>
    <q-footer class="footer" @click="topays()">充值</q-footer>
  </q-page>
</template>

<script>
import {notify} from 'src/utils/popups'
import {getPayOrderApi} from 'src/api/order'
import { debounce } from 'quasar'

export default {
    name: 'PaySubmit',
    data() {
      return {
        items: [],
        page:1,
        pageCount:200
      }
    },
    created () {
      this.onLoadRef();
    },
    computed: {
      money() {
        this.nums == this.$store.state.user.indexStatistics.balance
        return this.$store.state.user.indexStatistics.balance
      }
    },
    methods: {
      onLoadRef(){
        // setTimeout(() => {
          let data = {"thisPage":1,"pageCount":this.pageCount}
          getPayOrderApi(data).then(res=>{
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
          getPayOrderApi(data).then(res=>{
            this.items = [...res.list]
            done()
          }).catch(err=>{
            console.log(err)
          })
        }, 1000)
      },
      topays(){
        // notify('支付功能开发中，请稍后再试')
        // this.$router.push({name:'Recharge'})
        this.$router.push({name: 'Recharge'})
      }

    },
  }
</script>
<style scoped>
  .pay-index{background-color: #8dc550;color: #fff;padding: 30px 10px 10px;}
  .pay-index p{font-size: 16px;height: 24px;line-height: 24px;margin-bottom: 0}
  .pay-index .price{font-size: 34px;font-weight: bold;}
  .pay-index .price span{font-size: 14px;display: inline-block;padding-left: 5px;}
  .pay-list{background-color: #fff;padding: 10px;}
  .pay-list .li{background-color: #fff;border-bottom: 1px solid #f1f0f6;padding: 10px 0}
  .pay-list .li:last-child{border-bottom: 0;}
  .pay-list .li .fl .h3{font-size: 14px;color: #333;margin-bottom: 5px;}
  .pay-list .li .fl .time{color: #b4b3b3;font-size: 12px;}
  .pay-list .li .fl{text-align: left}
  .pay-list .li .fr{text-align: right;padding-top: 10px;font-size: 16px;color: #ff6633;font-weight: bold;}
  .pay-list .li .fr span{font-size: 12px;color: #333;display: inline-block;padding-left: 3px;}
  .footer{height: 50px;line-height: 50px;background-color: #8dc550;text-align: center;position: fixed;bottom: 0;font-size: 16px;}
</style>
