<template>
  <q-page padding>
     <q-header bordered class="bg-green text-white  header-fix">
      <q-toolbar>
        <q-btn flat round dense class="text-white" v-go-back="'/'" icon="keyboard_arrow_left" />
        <q-toolbar-title class="text-center text-white">粉丝</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <div class="order-list" ref="scrollTargetRef">
       <q-pull-to-refresh @refresh="refresh" color="positive" icon="lightbulb">
           <q-infinite-scroll  @load="onLoadRef" :offset="1" :disable="items.length < pageCount || page > totalPage">
            <div class="row li" v-for="(item, index) in items" :key="index">
              <div class="col-2 fl">
                <img class="thunmb" :src="item.photo">
              </div>
              <div class="col-10 fr text-left username">{{item.user_name}}</div>
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
    </div>

  </q-page>
</template>

<script>
import {notify} from 'src/utils/popups'
import {getFansApi} from 'src/api/order'
export default {
  name: 'Fans',
  data() {
    return {
      items: [],
      page:1,
      totalPage: 1,
      pageCount:50
    }
  },
  created () {
    this.refresh();
  },
  methods: {
      onLoadRef(done){
        // setTimeout(() => {
          let data = {"thisPage":this.page + 1,"pageCount":this.pageCount}
          getFansApi(data).then(res=>{
            if (res.list.length !== 0) {
              this.items = [...this.items,...res.list]
              this.totalPage = res.totalPage
              // done()
            } else {
              this.$q.notify('没有更多啦')
            }
            this.page++
            done()
          }).catch(err=>{
            console.log(err)
          })

        // }, 2000)
      },
      refresh (done) {
        setTimeout(() => {
          this.items = []
          this.page = 1
          this.totalPage = 1
          let data = {"thisPage":1,"pageCount":this.pageCount}
          getFansApi(data).then(res=>{
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
<style scoped>
.username{color: #333;font-size: 15px;}
</style>
