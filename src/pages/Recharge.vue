<template>
  <q-page>
    <q-header bordered class="bg-green text-white  header-fix">
      <q-toolbar>
        <q-btn flat round dense class="text-white" v-go-back="'paysubmit'" icon="keyboard_arrow_left" />
        <q-toolbar-title class="text-center text-white">充值</q-toolbar-title>
        <span class="tit-right-place"></span>
      </q-toolbar>
    </q-header>

    <div class="pay-price q-pa-sm">
      <q-input
        color="green"
        placeholder="请输入充值金额"
        ref="input"
        v-model="money"
        prefix="￥"
        :rules="[
          val => !!val || '请输入充值金额',
          val => (/(^[1-9]\d*$)/.test(val)) || '请输入正确金额',
          val => val < 100000 || '单笔充值不能大于十万'
        ]"
        lazy-rules>
          <template v-slot:append v-if="money !== ''">
            <q-icon name="close" @click="money = ''" class="cursor-pointer" />
          </template>

        </q-input>

    </div>

    <div class="btns">
      <div class="wx-pay">
        <q-icon name="img:statics/images/wx.png" style="font-size: 2rem;"></q-icon>
        微信支付
      </div>
      <div class="alipay-pay">
        <q-icon name="img:statics/images/alipay.png" style="font-size: 2rem;"></q-icon>
        支付宝支付
      </div>
    </div>
    <!-- content -->
  </q-page>
</template>

<script>
export default {
  name: 'Recharge',
  data() {
    return {
      money: ''
    }
  },
}
</script>
<style scoped>
  .relative-position{background-color: #fff !important}
  .btns{margin: 30px 20px 0;}
  .btns div{width: 100%;height: 50px;line-height: 50px;text-align: center;border-radius: 5px;margin-bottom: 10px;color: #fff}
  .btns .wx-pay{background-color: #00c23d}
  .btns .alipay-pay{background-color: #02a7f6}
  /* .pay-price input{} */
</style>
