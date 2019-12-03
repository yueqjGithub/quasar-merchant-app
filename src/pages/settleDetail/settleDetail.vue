<template>
  <q-layout view="lHh lpr lFf" class="cus-bg-grey">
    <q-header elevated>
      <div class="bg-primary index-header">
        <div class="index-header-ball"></div>
        <div class="index-header-content">
          <!---------------CompanyName----------------------->
          <div class="index-cont-1 index-cont-item">
            <q-btn flat round icon="img:statics/images/back.png" class="text-white" @click="goBack"></q-btn>
          </div>
          <!---------------tit----------------------->
          <div class="index-cont-2 index-cont-item">
            <span class="index-tit">对账单明细</span>
          </div>
          <!---------------total--------------------------->
          <div class="index-cont-3 index-cont-item">
            <div class="flex-row flex-space-between full-width">
              <div class="flex-column">
                <span class="detail-word">对账单号：{{orderNo}}</span>
                <span class="detail-word">核销时间：{{endTime}}</span>
              </div>
              <div>
                <span class="text-negative" v-if="status === 0">审核中</span>
                <span class="text-orange" v-if="status === 1">已审核</span>
                <span class="text-green" v-if="status === 2">已付款</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <my-list :orderNo="orderNo"></my-list>
    </q-page-container>
  </q-layout>
</template>

<script>
// import urls from 'src/api/urls'
import myList from 'src/pages/settleDetail/list'
export default {
  name: "settleDetail",
  data () {
    return {
      dataList: []
    }
  },
  components: {
    myList
  },
  created() {
    // let vm = this
    // let params = {
    //   'order_no': this.$route.params.obj.order_no
    // }
    // this.$axios(urls.querySettlementDetail, params).then(res => {
    //   if (res.code === 'success') {
    //     vm.dataList = res.list
    //   }
    // }, () => {
    // })
  },
  computed: {
    orderNo () {
      return this.$route.params.obj.order_num
    },
    endTime () {
      return this.$route.params.obj.end_time
    },
    status () {
      return this.$route.params.obj.check_status
    }
  },
  methods: {
    goBack () {
      let vm = this
      this.$router.push({name: 'Settlement', params: {type: vm.$route.params.type}})
    }
  }
}
</script>

<style scoped>
  .index-header{
    width: 100%;
    position: relative;
    transition: all linear 1s;
    overflow: hidden;
  }
  .index-header-ball{
    position: absolute;
    width: 100vmin;
    height: 100vmin;
    border-radius: 50%;
    background: #2D35A3;
    z-index: 2001;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transition: all linear 1s;
  }
  .index-header-content{
    min-height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    z-index: 2002;
    padding: .2rem 1.6rem 1rem 1.6rem;
  }
  .index-cont-item{
    width: 100%;
    display: flex;
    /*justify-content: space-between;*/
    align-items: center;
  }
  .index-cont-1{
    margin-top: 1.8rem;
    justify-content: flex-start;
  }
  .index-cont-2{
    margin-top: 2rem;
    justify-content: space-between;
  }
  .cus-orange{
    color: #FD8631 !important;
    /*border-bottom: solid .3rem #FD8631;*/
  }
  .cus-orange:before{
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: .3rem;
    background: #FD8631;
  }
  .cus-tab{
    font-size: 1.4rem;
    padding: 0;
    color: #E6E6E6;
  }
  .index-tit{
    font-size: 2.3rem;
    color: #ffffff;
    font-weight: bold;
  }
  /*-------------------------头部统计信息---------------------*/
  .index-cont-3{
    margin-top: 3rem;
  }
  .info-ma{
    margin-left: 28vw;
  }
  .info-tit{
    font-size: 1.4rem;
    color: #ffffff;
  }
  .info-cont{
    margin-top: 1.2rem;
    font-size: 2.2rem;
    color: #ffffff;
  }
  .detail-word + .detail-word{
    margin-top: 1.7rem;
  }
</style>
