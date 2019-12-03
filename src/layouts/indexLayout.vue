<template>
  <q-layout view="lHh lpr lFf" class="cus-bg-grey">
    <q-header elevated>
      <div class="bg-primary index-header">
        <div class="index-header-ball"></div>
        <div class="index-header-content">
          <!---------------CompanyName----------------------->
          <div class="index-cont-1 index-cont-item" v-if="!showBack">
            <q-btn flat class="text-white" :label="userName" :icon-right="arrowIcon" style="padding-left: 0" v-if="showList" @click="changeRole">
<!--              <q-menu max-height="30vh" auto-close>-->
<!--                <q-list dense>-->
<!--                  <q-item clickable v-for="k in shopList" :key="k.id" @click="changeRole(k)">-->
<!--                    <q-item-section>{{k.shop_name}}</q-item-section>-->
<!--                  </q-item>-->
<!--                </q-list>-->
<!--              </q-menu>-->
            </q-btn>
            <span v-else>{{userName}}</span>
          </div>
          <div v-if="showBack" class="index-cont-1 index-cont-item">
            <q-btn flat round icon="img:statics/images/back.png" class="text-white" @click="goBack"></q-btn>
          </div>
          <!---------------tit----------------------->
          <div class="index-cont-2 index-cont-item">
            <span class="index-tit">{{tit}}</span>
            <q-tabs
              @input="changeDay"
            >
              <q-tab :name="1" :class="status === 1 ? 'cus-orange' : ''" class="cus-tab">今天</q-tab>
              <div class="cus-split-sm"></div>
              <q-tab :name="0" :class="status === 0 ? 'cus-orange' : ''" class="cus-tab">昨天</q-tab>
              <div class="cus-split-sm"></div>
              <q-tab :name="2" :class="status === 2 ? 'cus-orange' : ''" class="cus-tab">累计</q-tab>
            </q-tabs>
          </div>
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div class="index-cont-3 index-cont-item" v-if="tit !== '经营状况'">
              <div class="flex-row" v-if="tit === '核销订单'">
                <div class="flex-column">
                  <span class="info-tit">订单数</span>
                  <span class="info-cont">{{information.order_num}}</span>
                </div>
                <div class="flex-column info-ma">
                  <span class="info-tit">订单金额</span>
                  <span class="info-cont">￥{{information.total}}</span>
                </div>
              </div>
              <div class="flex-row" v-if="tit === '消费顾客'">
                <div class="flex-column">
                  <span class="info-tit">顾客数</span>
                  <span class="info-cont">{{information.customer}}</span>
                </div>
              </div>
              <div class="flex-row" v-if="tit === '结算详情'">
                <div class="flex-column">
                  <span class="info-tit">累计结算</span>
                  <span class="info-cont">￥{{information.cost_total}}</span>
                </div>
                <div class="flex-column info-ma">
                  <span class="info-tit">累计到账</span>
                  <span class="info-cont">￥{{information.account_total}}</span>
                </div>
              </div>
            </div>
          </transition>
          <!---------------total--------------------------->
        </div>
      </div>
      <div class="q-pa-sm flex-row flex-align-center my-notice" v-if="openNotice"  @click="toAna">
        <div class="notice-icon">
          <div class="notice-wrapper">
            <img src="statics/images/notice.png" alt="">
          </div>
        </div>
        <transition
          appear
          enter-active-class="animated slideInUp"
          leave-active-class="animated slideOutDown"
        >
          <span v-if="showNotice">{{productName}}使用成功</span>
        </transition>
      </div>
    </q-header>
    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft"
      >
        <router-view></router-view>
      </transition>
    </q-page-container>
    <q-footer class="bg-white text-primary fixed-bottom" bordered v-if="tit === '经营状况'">
      <tab-foot></tab-foot>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import urls from 'src/api/urls'
import tabFoot from 'src/components/footer'
export default {
  name: "indexLayout",
  components: {
    tabFoot
  },
  data () {
    return {
      arrowIcon: 'app:iconarrow_bottom', // 下拉图标控制
      showList: false, // 是否显示下拉选择门店菜单
      userName: '', // 头部tit文字显示
      company: {
        company_name: '',
        companyid: ''
      },
      shopList: [], // 存放下拉门店列表
      infoType: '', // 头部最后一栏显示内容控制
      // 以下为socket
      openNotice: false,
      showNotice: false,
      productName: '招牌牛肉面',
      websock: null,
      reconnectData:null,
      lockReconnect:false, // 避免重复连接，因为onerror之后会立即触发 onclose
      timeout:10000, // 10s一次心跳检测
      timeoutObj:null,
      serverTimeoutObj:null,
    }
  },
  created () {
    let vm = this
    // console.log(vm.$route.path) // 根据url
    let opt = vm.$route.query
    if (opt.role === 'hq') { // 当登录角色为商户时
      vm.showList = true
      vm.$store.commit('common/setSearchOptions', 0)
      // vm.queryShopList()
    } else if (opt.role === 'shop') { // 登录角色为门店时
      vm.openNotice = true
      this.initWebSocket()
      vm.showList = false
      vm.$store.commit('common/setSearchOptions', 1)
    } else if (opt.role === 'sx') { // 商户切换为门店后进入
      vm.showList = true
      vm.$store.commit('common/setSearchOptions', 1)
      // vm.queryShopList()
    }
    this.queryShopList()
  },
  destroyed() {
    let opt = this.$route.query
    if (opt.role === 'shop') {
      this.lockReconnect = true;
      this.websock.close()                   //离开路由之后断开websocket连接
      clearTimeout(this.reconnectData);      //离开清除 timeout
      clearTimeout(this.timeoutObj);         //离开清除 timeout
      clearTimeout(this.serverTimeoutObj);   //离开清除 timeout
    }
  },
  computed: {
    ...mapState({
      status: (state) => state.common.searchOptions.time_status,
      tit: (state) => state.common.titleName,
      showBack: (state) => state.common.showBack,
      information: (state) => state.common.information
    })
  },
  methods: {
    toAna () { // 跳转核销详情
      this.$store.commit('common/isShowBack', true)
      this.$router.push({name: 'Analysis', params: {type: 2}}) // type 1- 商户进入，2-门店进入
    },
    goBack () {
      this.$store.commit('common/isShowBack', false)
      if (this.tit !== '结算详情') {
        this.$router.go(-1)
      } else {
        let role = this.$store.state.common.cRole
        // === 'hq' ? '/index/companyindex' : '/index/shopindex'
        let path
        if (role === 'hq') { // 当前标识为商户
          path = '/index/companyindex'
          this.showList = true
          this.$store.commit('common/setSearchOptions', 0)
          // this.queryShopList()
        } else if (role === 'shop') { // 当前标识为门店
          this.openNotice = true
          this.initWebSocket()
          path = '/index/shopindex'
          this.$store.commit('common/setSearchOptions', 1)
          this.showList = false
          // this.queryShopList()
        } else if (role === 'sx') { // 当前标识为商户转门店
          path = '/index/shopindex'
          this.showList = true
          this.$store.commit('common/setSearchOptions', 1)
          // this.queryShopList()
        }
        this.queryShopList()
        this.$router.push({path: path, query: {role: role}})
      }
    },
    changeRole () {
      let cur = this.$q.localStorage.getItem('currentShop') || this.company.companyid
      this.$router.push({name: 'ChangeRole', params: {shops: this.shopList, company: this.company, cur: cur}})
    },
    changeDay (val) {
      // console.log(val)
      this.$store.commit('common/setSearchOptions', val)
    },
    queryShopList () {
      let vm = this
      vm.$axios(urls.getShopList, {}).then(res => {
        // console.log(res)
        Object.assign(vm.company, res.companys)
        this.shopList = [...res.shops]
        let role = vm.$route.query.role
        if (role === 'hq') {
          vm.userName = res.companys.company_name
        } else {
          vm.userName = res.shops.find(item => item.id === vm.$q.localStorage.getItem('currentShop')).shop_name
        }
      }, err => {
        console.log(err)
      })
    },
    // 以下为websocket相关
    initWebSocket(){
      // console.log('启动中')
      let wsurl = this.$q.localStorage.getItem('socketUrl')
      // let wsurl = 'ws://121.40.165.18:8800'
      this.websock = new WebSocket(wsurl);
      this.websock.onopen = this.websocketonopen;          //连接成功
      this.websock.onmessage = this.websocketonmessage;    //广播成功
      this.websock.onerror = this.websocketonerror;        //连接断开，失败
      this.websock.onclose = this.websocketclose;          //连接关闭
    },
    websocketonopen () {
      console.log('连接成功')
    },
    websocketonerror (err) {
      console.log(err)
      this.reconnect();
    },
    websocketclose () {
      console.log('断开连接');
      this.reconnect();
    },
    websocketonmessage (data) {
      // this.heatBeat();      //收到消息会刷新心跳检测，如果一直收到消息，就推迟心跳发送
      this.showNotice = false
      // ... data赋值炒作
      console.log(data)
      this.showNotice = true
    },    //数据接收
    // websocketsend(data){
    //     this.websock.send(JSON.stringify(data));
    // },         //数据发送
    reconnect(){
      if(this.lockReconnect){       //这里很关键，因为连接失败之后之后会相继触发 连接关闭，不然会连接上两个 WebSocket
        return
      }
      this.lockReconnect = true;
      this.reconnectData && clearTimeout(this.reconnectData);
      this.reconnectData = setTimeout(()=>{
        this.initWebSocket();
        this.lockReconnect = false;
      }, 5000)
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
/*---------------------------socket-----------------*/
.my-notice{
  background: #FF6A00;
  color: #ffffff;
}
.notice-icon{
  margin-left: 3vmin;
  margin-right: 2vmin;
  width: 1.3rem;
  height: 1.3rem;
  overflow: hidden;
  /*animation: notice 1s infinite;*/
}
.notice-wrapper{
  width: 1.3rem;
  height: 1.3rem;
  overflow: hidden;
  animation: notice 1s infinite;
}
.notice-icon img {
  width: 1.3rem
}
@keyframes notice {
  0%   {width: 0.7rem}
  25%  {width: 0.8rem}
  50%  {width: 0.9rem}
  75%  {width: 1.1rem}
  100% {width: 1.3rem}
}
</style>
