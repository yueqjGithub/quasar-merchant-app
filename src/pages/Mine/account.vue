<template>
  <q-page>
    <q-header class="my-border">
      <div class="my-header text-black q-pa-sm bg-white">
        <div class="my-header-l">
          <q-btn flat round icon="img:statics/images/back-B.png" @click="goBack"></q-btn>
        </div>
        <div class="my-header-m text-center">账号管理</div>
        <div class="my-header-r">
<!--          <q-btn rounded unelevated flat label="新建菜品" text-color="primary" class="word-no-wrap"></q-btn>-->
        </div>
      </div>
    </q-header>
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <q-page class="q-pa-md bg-white flex-column accout-page">
        <div class="my-list-item flex-row flex-space-between flex-align-center q-pa-sm">
          <span>手机号</span>
          <span style="padding-right: 1.6rem">{{myAccount}}</span>
        </div>
        <div class="my-list-item flex-row flex-space-between flex-align-center q-pa-sm">
          <span>登录密码</span>
          <q-btn icon-right="fa fa-angle-right" label="修改密码" text-color="grey" flat class="text-right" @click="toEdit"></q-btn>
        </div>
        <div class="text-center log-out">
          <q-btn label="退出登录" text-color="negative" outline class="full-width" @click="logout"></q-btn>
        </div>
      </q-page>
    </transition>
  </q-page>
</template>

<script>
export default {
  name: "account",
  data () {
    return {
      myAccount: ''
    }
  },
  created () {
    this.myAccount = this.$q.localStorage.getItem('myAccount')
  },
  methods: {
    goBack () {
      this.$router.push({name: 'Mine'})
    },
    toEdit () {
      this.$router.push({name: 'ResetPassword', params: {type: 1}})
    },
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
    }
  }
}
</script>

<style scoped>
  .my-header{
    border-bottom: 1px solid #E6E6E6;
  }
  .my-list-item{
    border-bottom: 1px solid #E6E6E6;
    padding: 1.4rem 0;
  }
  .word-b{
    font-size: 1.6rem;
    color: #000000;
  }
  .word-g{
    font-size: 1.6rem;
    color: #8E8E93;
  }
  .accout-page{
    position: relative;
  }
  .log-out{
    width: 80%;
    position: absolute;
    bottom: 10rem;
    left: 10%;
  }
</style>
