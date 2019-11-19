<template>
<q-page padding>
    <q-header bordered class="bg-green text-white  header-fix">
      <q-toolbar>
        <q-btn flat round dense class="text-white" v-go-back="'/'" icon="keyboard_arrow_left" />
        <q-toolbar-title class="text-center text-white">领取明细</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div class="row title-colom">
      <div class="col-6">今日领取：<span>{{today}}</span></div>
      <div class="col-6">总领取：<span>{{count}}</span></div>
    </div>
    

    <div class="order-list" ref="scrollTargetRef">
       <q-pull-to-refresh @refresh="refresh" color="positive" icon="lightbulb">
          <!-- <q-infinite-scroll  @load="onLoadRef" :offset="300" :scroll-target="$refs.scrollTargetRef"> -->

            <div class="row li" v-for="(item, index) in items" :key="index">
              <div class="col-8 fl">
                <div class="h3">{{item.user_name}}用户领取</div>
                <div class="p">{{item.shop_name}}</div>
              </div>
              <div class="col-4 fr">{{item.create_time}}</div>
            </div>

            <!-- <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="positive" size="40px" />
              </div>
            </template> -->
            <!-- <div class="nomarl" v-else>
              ~到底了~
            </div>  -->
          <!-- </q-infinite-scroll> -->
        </q-pull-to-refresh>
    </div>
    <!-- content -->
</q-page>
</template>

<script>
  import {notify} from 'src/utils/popups'
  import {getReceiveRecordApi} from 'src/api/order'
  import { debounce } from 'quasar'
  export default {
    name: 'ReceiveRecord',
    data() {
      return {
        items: [],
        page:1,
        pageCount:6
      }
    },
    computed: {
      today() {
        return this.$store.state.user.indexStatistics.today_buy_coupon_count
      },
      count(){
        return this.$store.state.user.indexStatistics.buy_coupon_count
      }
    },
    created () {
      this.onLoadRef();
    },
    methods: {
      onLoadRef(){
        // setTimeout(() => {
          let data = {"thisPage":1,"pageCount":this.pageCount}
          getReceiveRecordApi(data).then(res=>{
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
          getReceiveRecordApi(data).then(res=>{
            this.items = [...res.list]
            done()
          }).catch(err=>{
            console.log(err)
          })
        }, 1000)
      }
      // bounceImage(element){
      //   setTimeout(() => {
      //     this.onLoadRef()
      //   }, 2000)
      // }
    },
  }
</script>
