<template>
  <q-page>
    <q-header class="bg-green text-white  header-fix">
      <q-toolbar>
        <q-btn flat round dense class="text-white" v-go-back="'/user/mine'" icon="keyboard_arrow_left" />
        <q-toolbar-title class="text-center text-white">设置</q-toolbar-title>
        <span class="tit-right-place"></span>
      </q-toolbar>
    </q-header>
    <div class="custom-list-item custom-section custom-mat-sm">
      <q-item clickable v-ripple @click="toLink('ResetPassword')">
        <q-item-section side>
          <q-icon name="fa fa-unlock-alt" :size="iconSize"></q-icon>
        </q-item-section>
        <q-item-section>
          <span class="mine-list-tit">修改密码</span>
        </q-item-section>
        <q-item-section side>
          <q-icon name="fa fa-chevron-right" :size="iconSize"></q-icon>
        </q-item-section>
      </q-item>
    </div>
    <div class="set-login-out">
      <q-btn color="positive" class="custom-btn-80l" @click="logout">退出</q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Setting",
  data () {
    return {
        iconSize: '1rem'
    }
  },
  methods: {
    toLink (name) {
      this.$router.push({ name: name })
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
.set-login-out{
  margin-top: 70vh;
  text-align: center;
}
</style>
