<template>
    <q-page>
        <q-header bordered class="bg-green" style="position: relative">
            <q-toolbar>
                <span class="tit-right-place"></span>
                <q-toolbar-title class="text-center text-white">{{info.company_name}}数据统计</q-toolbar-title>
<!--                <q-btn around flat icon="img:statics/images/scan.png" class="text-white" @click="toScan"></q-btn>-->
            </q-toolbar>
        </q-header>

        <!-- <div class="h2">{{info.company_name}}</div> -->

        <div class="colom-title">
            <div class="lis row" @click="tolink('Balance')">
                <div  class="col-1 fl" ><q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/icon1@2x.png"/></div>
                <div class="col-10 center">知了贝：<span>{{info.dc_balance}}</span></div>
                <div class="col-1 fr"><q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/right@2x.png"/></div>
            </div>
            <div class="lis row" @click="tolink('Fans')">
                <div  class="col-1 fl" ><q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/icon2@2x.png"/></div>
                <div class="col-10 center">粉丝量：<span>{{info.fans_count}}</span></div>
                <div class="col-1 fr"><q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/right@2x.png"/></div>
            </div>
        </div>

        <div class="colom-title">
            <div class="lis row">
                <div class="col-12">账户余额：<span class="colors">{{info.balance}}</span>元</div>
            </div>
<!--            <div class="lis row" @click="tolink('Paysubmit')">-->
<!--                <div  class="col-1 fl" ><q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/icon3@2x.png"/></div>-->
<!--                <div class="col-10 center">充值<span></span></div>-->
<!--                <div class="col-1 fr"><q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/right@2x.png"/></div>-->
<!--            </div>-->
            <!-- <div class="lis row" @click="tolink('Fans')">
                <div  class="col-1 fl" ><q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/icon4@2x.png"/></div>
                <div class="col-10 center">提现<span></span></div>
                <div class="col-1 fr"><q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/right@2x.png"/></div>
            </div> -->
        </div>

        <div class="colom-title">
            <div class="lis row">
                <div class="col-12">统计数据</div>
            </div>

            <div class="row colom-list">
                <div class="col-6 li">
                    <div class="lis" @click="tolink('ReceiveRecord')">
                        <div class="h3">今日领取</div>
                        <span>{{info.today_buy_coupon_count}}份</span>
                    </div>
                </div>
                <div class="col-6 li">
                    <div class="lis"  @click="tolink('ReceiveRecord')">
                        <div class="h3">总领取</div>
                        <span>{{info.buy_coupon_count}}份</span>
                    </div>
                </div>
                <div class="col-6 li">
                    <div class="lis" @click="tolink('ReceiveCost')">
                        <div class="h3">今日核销</div>
                        <span>{{info.today_cost_coupon_count}}份</span>
                    </div>
                </div>
                <div class="col-6 li" @click="tolink('ReceiveCost')">
                    <div class="lis">
                        <div class="h3">总核销</div>
                        <span>{{info.cost_coupon_count}}份</span>
                    </div>
                </div>
                <div class="col-6 li" @click="tolink('ReceiveBalance')">
                    <div class="lis">
                        <div class="h3">今日核销费</div>
                        <span>{{info.today_cost_coupon_fee}}元</span>
                    </div>
                </div>
                <div class="col-6 li" @click="tolink('ReceiveBalance')">
                    <div class="lis">
                        <div class="h3">总核销费</div>
                        <span>{{info.cost_coupon_fee}}元</span>
                    </div>
                </div>
            </div>

        </div>
<!--        <div class="colom-title-cus">-->
<!--          <div class="row-cus colom-list">-->
<!--            <div class="li-cus">-->
<!--              <div class="lis">-->
<!--                <div class="h3 text-left">发行总量(张)</div>-->
<!--                <span class="text-right block">11</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="li-cus">-->
<!--              <div class="lis">-->
<!--                <div class="h3 text-left">剩余数量(张)</div>-->
<!--                <span class="text-right block">11</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--      <div class="colom-title">-->
<!--        <div class="lis row">-->
<!--          <div class="col-12">今日数据(张)</div>-->
<!--        </div>-->
<!--        <div class="row colom-list">-->
<!--          <div class="col-6 li">-->
<!--            <div class="lis" @click="tolink('ReceiveCost')">-->
<!--              <div class="h3">领取数</div>-->
<!--              <span>{{info.today_cost_coupon_count}}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-6 li">-->
<!--            <div class="lis" @click="tolink('ReceiveCost')">-->
<!--              <div class="h3">核销数</div>-->
<!--              <span>{{info.today_cost_coupon_count}}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </q-page>
</template>

<script>

    import {getIndexApi} from 'src/api/index'
    export default {
        data() {
            return {
               info:{}
            }
        },
        created () {
            this.getIndex()
        },
        mounted () {
          let vm = this
          let path = this.$route.name
          if (path === 'Index') {
            document.addEventListener("backbutton", vm.exit, false)
          }
        },
        beforeDestroy () {
            let vm = this
            document.removeEventListener("backbutton", vm.exit, false)
        },
        methods: {
            exit () {
              navigator.app.exitApp();
            },
            getIndex(){
                getIndexApi().then(res=>{
                    this.$q.localStorage.set('user', res)
                    this.info = res
                    this.$store.commit('user/setIndexStatistics', res)
                }).catch(err=>{
                    console.log(err)
                })
            },
            tolink(name){
                this.$router.push({name})
            }
        }
    }
</script>

<style scoped>
    .avatar{width: 40px;height: 40px;margin: 0 auto 20px;background-color: #f1f1f1;border-radius: 50%;overflow: hidden}
    .avatar img{width: 40px;height: 40px;border-radius: 50%;overflow: hidden}
    .h2{font-size: 20px;color: #333;text-align: center}
    .h3{text-align: center;font-size: 13px;color: #333;}
    .colom-title{background-color: #fff;margin: 10px;border-radius: 5px;}
    .colom-title .lis{padding: 15px 10px;border-bottom: 1px solid #f7f7f7;}
    .colom-title .lis .fr{text-align: right}
    .colom-title .lis .fr .q-icon{width: 8px !important;height: auto;}
    .colom-title span{color: #999;font-size: 16px;font-weight: bold;}
    .colom-title-cus .text-right{text-align: right}
    .colom-title span.colors{color: #ff7624}
    .balance{padding:8px 15px 5px;margin: 10px 0;border-top: 1px solid #f1f1f1;border-bottom: 1px solid #f1f1f1;line-height: 32px;}
    .balance .price{font-size: 20px;color: red}
    .balance .pay{height: 32px;background-color: #21BA45;color: #fff;text-align: center;line-height: 32px;border-radius: 5px;}
    .balance .submitpay span{border: 1px solid #ccc;color: #333;border-radius: 5px;text-align: center;height: 32px;line-height: 32px;width: 90%;float:right;}
    .title{padding: 0 10px;font-size: 16px;font-weight: bold}
    .colom-list .lis{margin: 5px 0 0;border-bottom: 0}
    .colom-list .li{border-bottom: 1px solid #f1f1f1;}
    .colom-list .li:nth-child(5),.colom-list .li:nth-child(6){border-bottom:0}
    .colom-list .li:nth-child(odd){border-right:1px solid #f1f1f1}
    .colom-list span{display: block;font-size: 21px;color: #aaaaaa;text-align: center;font-weight: 400}
    .q-icon{height: auto !important;width: 1.2em !important}
    .colom-title-cus{margin: 10px;}
    .row-cus{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .li-cus{
      width: 48%;
      padding: 15px 10px;
      background: #ffffff;
      border-radius: 5px;
    }
</style>
