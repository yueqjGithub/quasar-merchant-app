<template>
  <q-page padding class="bg-white">
     <q-header class="bg-white header-fix">
      <q-toolbar>
        <q-btn flat round dense class="text-black" :to="{name: 'Application'}" icon="app:iconleft"/>
        <q-toolbar-title class="text-center text-black">知了贝明细</q-toolbar-title>
        <span></span>
      </q-toolbar>
    </q-header>

    <div class="order-list" ref="scrollTargetRef">
      <q-pull-to-refresh @refresh="refresh" color="positive" icon="lightbulb">
        <q-infinite-scroll  @load="onLoadRef" :offset="1" :disable="items.length < pageCount || page > totalPage">
            <div class="row li" v-for="(item, index) in items" :key="index">
              <div v-if="item.type === 0" class="zlb-item">
                <div class="zlb-l zlb-cont">
                  <p class="zlb-blk">核销费</p>
                  <p class="zlb-gr">{{item.create_time}}</p>
                </div>
                <div class="zlb-r zlb-cont">
                  <p class="zlb-blk">-{{item.amount}}</p>
                  <p class="zlb-gr">剩余知了贝</p>
                </div>
              </div>
              <div v-if="item.type === 1" class="zlb-item">
                <div class="zlb-l zlb-cont">
                  <p class="zlb-blk">充值</p>
                  <p class="zlb-gr">{{item.create_time}}</p>
                </div>
                <div class="zlb-r zlb-cont">
                  <p class="zlb-blue">+{{item.amount}}</p>
                  <p class="zlb-gr">剩余知了贝</p>
                </div>
              </div>
<!--              <div class="col-8 fl">-->
<!--                <div class="h3">{{item.user_name}}用户核销</div>-->
<!--                <div class="p">{{item.create_time}}</div>-->
<!--              </div>-->
<!--              <div class="col-4 fr">+{{item.amount}}知了贝</div>-->
            </div>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="positive" size="40px" />
              </div>
            </template>
            <!-- <div class="nomarl" v-else>
              ~到底了~
            </div>  -->
           </q-infinite-scroll>
        </q-pull-to-refresh>
        <q-inner-loading :showing="showLoading">
          <q-spinner-tail size="50px" color="positive" />
        </q-inner-loading>
    </div>
  </q-page>
</template>

<script>
import {notify} from 'src/utils/popups'
// import {getBalanceApi} from 'src/api/order'
import urls from 'src/api/urls'
export default {
  name: 'Balance',
  data() {
    return {
      showLoading: false,
      items: [],
      page:1,
      totalPage: 1,
      pageCount:50
    }
  },
  created () {
    let vm = this
    async function loadingSet () {
      vm.showLoading = true
      await vm.refresh();
      vm.showLoading = false
    }
    loadingSet()
  },
  methods: {
      onLoadRef(done){
        // setTimeout(() => {
        // this.showLoading = true
        let data = {"thisPage":this.page + 1,"pageCount":this.pageCount}
          this.$axiosGet(urls.getBalanceList, data).then(res=>{
            if (res.list.length !== 0) {
              this.items = [...this.items,...res.list]
              this.totalPage = res.totalPage
              // done()
            } else {
              this.$q.notify('没有更多啦')
            }
            this.page++
            // this.showLoading = false
            done()
          }).catch(err=>{
            console.log(err)
            // this.showLoading = false
          })

        // }, 2000)
      },
      refresh (done) {
        setTimeout(() => {
          this.items = []
          let data = {"thisPage":1,"pageCount":this.pageCount}
          this.$axiosGet(urls.getBalanceList, data).then(res=>{
            this.items = [...res.list]
            done()
          }).catch(err=>{
            console.log(err)
          })
        }, 0)
      }
  },
}
</script>
<style scoped>
  .zlb-item{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }
  .zlb-cont{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .zlb-l{
    align-items: flex-start;
  }
  .zlb-r{
    align-items: flex-end;
  }
  .zlb-blk{
    color: black;
    font-size: 1.6rem;
  }
  .zlb-gr{
    color: #999999;
    font-size: 1.4rem;
  }
  .zlb-blue{
    color: #3C88F6;
    font-size: 1.6rem;
  }
</style>
