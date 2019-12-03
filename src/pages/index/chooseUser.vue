<template>
  <q-layout view="lHh lpr lff">
    <q-header>
      <div class="my-header bg-white text-black q-pa-sm">
        <div class="my-header-l">
          <q-btn flat round icon="img:statics/images/back-B.png" @click="back"></q-btn>
        </div>
        <div class="my-header-m text-center">切换门店</div>
        <div class="my-header-r"></div>
      </div>
    </q-header>
    <q-page-container>
      <q-page>
        <div v-for="k in list" :key="k.value" class="my-list flex-row flex-space-between q-pa-sm flex-align-center"
          @click="changeCur(k)"
        >
          <span class="my-label">{{k.label}}</span>
          <q-radio v-model="cur" :val="k.value" color="primary" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "chooseUser",
  data () {
    return {
      company: {},
      shops: [],
      list: [],
      cur: ''
    }
  },
  created () {
    let vm = this
    let param = this.$route.params
    vm.company = param.company
    vm.shops = param.shops
    vm.cur = param.cur
    vm.list.push({label: param.company.company_name, value: param.company.companyid})
    for (let k in param.shops) {
      vm.list.push({label: param.shops[k].shop_name, value: param.shops[k].id})
    }
    // console.log(vm.list)
  },
  methods: {
    changeCur (k) {
      this.cur = k.value
    },
    back () {
      let vm = this
      if (vm.cur === vm.company.companyid) { // 如果选择的是商户
        vm.$store.commit('common/setCurrentRole', 'hq')
        vm.$q.localStorage.remove('currentShop') // 删除保存的shopid，仅门店切回商户时有用
        vm.$router.push({path: '/index/companyindex', query: {role: 'hq'}})
      } else {
        vm.$q.localStorage.set('currentShop', vm.cur) // 将当前选择的门店id保存在local中
        vm.$store.commit('common/setCurrentRole', 'sx') // 将store中的role设置为sx，以便foot中使用
        vm.$router.push({path: '/index/shopindex', query: {role: 'sx'}}) // 进入门店首页，role设置为sx
      }
    }
  }
}
</script>

<style scoped>
.my-label{
  font-size: 1.6rem;
}
.my-list{
  border-bottom: 1px solid #e6e6e6;
}
</style>
