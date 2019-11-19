<template>
  <q-page>
    <q-header bordered class="bg-green text-white  header-fix">
      <q-toolbar>
        <q-btn flat round dense class="text-white" v-go-back="'/'" icon="keyboard_arrow_left" />
        <q-toolbar-title class="text-center text-white">提现</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-form ref="myForm">
      <div class="pay-price">
        <q-input
          color="green"
          q-gutter-y-md
          placeholder="请输入银行卡账号"
          ref="input"
          v-model="bank_account"
          :rules="[
          val => !!val || '请输入银行卡账号',
          val => val.toString().length > 15 || '必须大于15位',
          val => val.toString().length < 22 || '不能大于22位',
        ]"
          lazy-rules>
          <template v-slot:append v-if="bank_account !== ''">
            <q-icon name="close" @click="bank_account = ''" class="cursor-pointer" />
          </template>

        </q-input>
        <q-input
          color="green"
          placeholder="请输入开户银行支行信息"
          ref="input"
          v-model="bank_name"
          :rules="[
          val => !!val || '请输入开户银行支行信息'
        ]"
          lazy-rules>
          <template v-slot:append v-if="bank_name !== ''">
            <q-icon name="close" @click="bank_name = ''" class="cursor-pointer" />
          </template>

        </q-input>
      </div>
      <div class="subpay">当前可提现：<span>{{money || 0}}</span>元</div>

      <div class="pay-price">
        <q-input
          color="green"
          placeholder="请输入提现金额"
          ref="input"
          v-model="amount"
          prefix="￥"
          :rules="[
          val => !!val || '请输入提现金额',
          val => (/(^[1-9]\d*$)/.test(val)) || '请输入正确金额',
          val => val <= 20000 || '单笔金额不能超过20000',
          val => val >= 100 || '最低提现额度为100元',
          val => val <= money || '超出当前可提现金额',
        ]"
          lazy-rules>
          <template v-slot:append v-if="amount !== ''">
            <q-icon name="close" @click="amount = ''" class="cursor-pointer" />
          </template>

        </q-input>

      </div>
    </q-form>

    <!-- content -->
    <q-footer class="footer" @click="topays">申请提现</q-footer>
  </q-page>
</template>

<script>
import {notify} from 'src/utils/popups'
import {submitApi} from 'src/api/shop'
export default {
  name: 'Withdrawal',
  data() {
    return {
      bank_account:'',
      bank_name:'',
      amount:'',
      nums:0
    }
  },
  created () {

  },
  computed: {
    money() {
      this.nums == this.$store.state.user.indexStatistics.balance
      return this.$store.state.user.indexStatistics.balance
    }
  },
  methods: {
    topays() {
      // if(this.bank_account == ''){
      //   notify('请输入银行卡卡号')
      // }else if (this.bank_name == '') {
      //   notify('请输入银行卡名称')
      // }else if (this.amount <= this.nums) {
      //   notify('金额超出提现金额')
      // }else if (this.amount == '') {
      //   notify('提现金额不能为空')
      // }else{
      //   this.submit()
      // }
      let vm = this
      vm.$refs['myForm'].validate().then(suc => {
          if (suc) {
              vm.submit()
          } else {
          }
      })
    },
    submit(){
      let data = {amount:this.amount,bank_account:this.bank_account,bank_name:this.bank_name}
      submitApi(data).then(res=>{
        if (res.code == 'success') {
          notify('提现成功')
          let userInfo = this.$q.localStorage.getItem('user')
          // console.log(userInfo)
          userInfo.balance -= this.amount
          this.$q.localStorage.set('user', userInfo)
          this.$store.commit('user/setIndexStatistics', userInfo)
          setTimeout(() => {
            this.$router.push({name:'Paysubmit'})
          }, 1500);
        }
      }).catch(err=>{
      })
    }
  },
}
</script>
<style scoped>
.pay-price{padding: 0 10px;}
  .subpay{margin: 20px 10px;font-size: 14px;color: #333}
  .subpay span{color: #ff6633}
  .footer{height: 50px;line-height: 50px;background-color: #8dc550;text-align: center;position: fixed;bottom: 0;font-size: 16px;}
</style>
