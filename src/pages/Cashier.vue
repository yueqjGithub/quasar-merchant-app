<template>
  <q-page padding>

     <q-header bordered class="bg-green header-fix">
        <q-toolbar>
          <q-btn around flat icon="img:statics/images/scan.png" class="text-white" @click="toScan"></q-btn>
          <q-toolbar-title class="text-center text-white">核销明细</q-toolbar-title>
          <q-btn flat class="text-white" @click="logout">退出登录</q-btn>
        </q-toolbar>
      </q-header>


     <div class="headers">
      <div class="h2">商户名称:{{shop_name}}</div>
     </div>
     <div class="notis" v-if="stats">
       <div class="infos">
         消息：{{msgData.userName}}用户核销成功 {{msgData.use_time}}
       </div>
     </div>
     <!-- <div class="title">统计数据</div> -->
      <div class="order-list" ref="scrollTargetRef">
       <q-pull-to-refresh @refresh="refresh" color="positive" icon="lightbulb">
          <!-- <q-infinite-scroll  @load="onLoadRef" :offset="300" :scroll-target="$refs.scrollTargetRef"> -->
            <div v-if="items.length > 0">
              <div class="row li" v-for="(item, index) in items" :key="index">
                <div class="col-8 fl">
                  <div class="h3" v-if="item.coupon_type===50">{{item.user_name}}用户霸王餐券核销</div>
                  <div class="h3" v-else>{{item.user_name}}用户核销</div>
                </div>
                <div class="col-4 fr">{{item.use_time}}</div>
              </div>
            </div>
            <div class="no-data-div" v-else>
              <q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/bar3@2x.png" class="no-data-icon"></q-icon>
              <p>当前暂无数据</p>
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
  </q-page>
</template>

<script>
import {setSession,getSession} from 'src/utils/getToken'
import {notify} from 'src/utils/popups'
import {getCostCouponApi} from 'src/api/order'
import { debounce } from 'quasar'
export default {
  //门店报表
  name: 'Cashier',
    mensagem: 'Mensagem enviada do vue!',
    data() {
      return {
        items: [],
        page:1,
        pageCount:20,
        shop_name:'',

        siteid:'',
        shopid:'',

        msgData:{},
        stats:false,

        websock: null,
        reconnectData:null,
        lockReconnect:false,    //避免重复连接，因为onerror之后会立即触发 onclose
        timeout:10000,          //10s一次心跳检测
        timeoutObj:null,
        serverTimeoutObj:null,
      }
    },
    created () {
      this.siteid = this.$q.localStorage.getItem('userInfo').siteid
      this.shopid = this.$q.localStorage.getItem('userInfo').shopid
      this.onLoadRef();
      this.initWebSocket();

    },
    mounted () {
      let vm = this
      let path = this.$route.name
      if (path === 'Cashier') {
        document.addEventListener("backbutton", vm.exit, false)
      }
    },
    methods: {
      logout () {
        let vm = this
        this.$q.dialog({
          title: '',
          message: '退出当前账号',
          cancel: true,
          persistent: true
        }).onOk(() => {
          vm.$q.sessionStorage.clear()
          vm.$q.localStorage.clear()
          vm.$router.push({ name: 'Login' })
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        })
      },
      exit () {
        navigator.app.exitApp();
      },
      toScan () {
        this.$router.push({path: '/scan'})
      },
      onLoadRef(){
        // setTimeout(() => {
          let data = {"thisPage":1,"pageCount":this.pageCount}
          getCostCouponApi(data).then(res=>{
            if (res.code === 'success') {
              this.items = [...this.items,...res.list]
              this.shop_name = res.shop_name
              // alert(this.shop_name)
              // done()
            } else {
              console.log(res.msg)
            }
          }).catch(err=>{
            console.log(JSON.stringify(err))
          })

        // }, 2000)
      },
      refresh (done) {
        setTimeout(() => {
          this.items = []
          let data = {"thisPage":1,"pageCount":this.pageCount}
          getCostCouponApi(data).then(res=>{
            this.items = [...res.list]
            done()
          }).catch(err=>{
            console.log(err)
          })
        }, 1000)
      },
      initWebSocket(){
        // console.log('启动中')
        let siteid = this.siteid
        let shopid = this.shopid

        let wsurl = "wss://ws.iidingyun.com/websocket?siteid="+siteid+"&groupid="+shopid+"&msg=1";
        this.websock = new WebSocket(wsurl);
        this.websock.onopen = this.websocketonopen;          //连接成功
        this.websock.onmessage = this.websocketonmessage;    //广播成功
        this.websock.onerror = this.websocketonerror;        //连接断开，失败
        this.websock.onclose = this.websocketclose;          //连接关闭
      },             //初始化weosocket
      websocketonopen(){
          console.log('连接成功')
      },           //连接成功
      websocketonerror(){
          console.log('连接失败')
          this.reconnect();
      },          //连接失败
      websocketclose(){
          console.log('断开连接');
          this.reconnect();
      },            //各种问题导致的 连接关闭
      websocketonmessage(data){
          // this.heatBeat();      //收到消息会刷新心跳检测，如果一直收到消息，就推迟心跳发送
          this.stats = true
          console.log(JSON.parse(data.data))
          this.msgData = {}
          this.msgData = JSON.parse(data.data)

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
          },5000)
      },                 //socket重连
      heatBeat(){
          this.timeoutObj && clearTimeout(this.timeoutObj);
          this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
          this.timeoutObj = setTimeout(()=>{
              // this.websocketsend({type:'心跳检测'})   //根据后台要求发送
              this.serverTimeoutObj = setTimeout(()=> {
                  this.websock.close();       //如果  5秒之后我们没有收到 后台返回的心跳检测数据 断开socket，断开后会启动重连机制
              }, 5000);
          }, this.timeout)
      }                  //心跳检测
    },
    destroyed() {
      this.lockReconnect = true;
      this.websock.close()                   //离开路由之后断开websocket连接
      clearTimeout(this.reconnectData);      //离开清除 timeout
      clearTimeout(this.timeoutObj);         //离开清除 timeout
      clearTimeout(this.serverTimeoutObj);   //离开清除 timeout
    }
}
</script>

<style scoped>
  .order-list .li{line-height: 40px;}
  .order-list .li:last-child{border-bottom: 0}
  .order-list .fl .h3{height: 40px;line-height: 40px;}
  .headers{padding: 10px;background-color: #f9f9f9}
  .avatar{width: 40px;height: 40px;background-color: #f1f1f1;border-radius: 50%;overflow: hidden;margin: 0 10px}
  .avatar img{width: 40px;height: 40px;border-radius: 50%;overflow: hidden}
  .h2{font-size: 14px;color: #333;text-align:left;font-weight: bold;}
  .title{padding: 0 10px;font-size: 16px;font-weight: bold;margin: 10px 0}
  .notis{padding: 10px;background-color: #f5f4f9;}
  .notis .infos{color: #fc6701}
  .no-data-icon{
    font-size: 5rem;
  }
  .no-data-div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    height: 40vh;
  }
</style>
