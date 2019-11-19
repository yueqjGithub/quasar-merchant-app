<template>
  <q-page padding>
    <q-header bordered class="bg-green text-white  header-fix">
      <q-toolbar>
        <q-btn flat round dense class="text-white" v-go-back="'/'" icon="keyboard_arrow_left" />
        <q-toolbar-title class="text-center text-white">核销明细</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div class="row title-colom">
      <div class="col-6">今日核销：<span>{{today}}</span></div>
      <div class="col-6">总核销：<span>{{count}}</span></div>
    </div>
     <div class="order-list" ref="scrollTargetRef">
       <q-pull-to-refresh @refresh="refresh" color="positive" icon="lightbulb">
          <!-- <q-infinite-scroll @load="onLoadRef" :offset="250" :scroll-target="$refs.scrollTargetRef"> -->
            <div class="row li" v-for="(item, index) in items" :key="index">
              <div class="col-8 fl">
                <div class="h3">{{item.user_name}}用户领取</div>
                <div class="p">{{item.shop_name}}</div>
              </div>
              <div class="col-4 fr">{{item.use_time}}</div>
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
  import {getReceiveCostApi} from 'src/api/order'
  export default {
    name: 'ReceiveCost',
    data() {
      return {
        items: [],
        page:1,
        pageCount:300,
        loading:true
      }
    },
    created () {
      this.onLoadRef()
    },

    computed: {
      today() {
        return this.$store.state.user.indexStatistics.today_cost_coupon_count
      },
      count(){
        return this.$store.state.user.indexStatistics.cost_coupon_count
      }
    },

    methods: {
      onLoadRef(){
        // setTimeout(() => {
          let data = {"thisPage":1,"pageCount":this.pageCount}
          getReceiveCostApi(data).then(res=>{
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
          getReceiveCostApi(data).then(res=>{
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
