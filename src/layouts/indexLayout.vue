<template>
  <q-layout view="lHh lpr lFf" class="cus-bg-grey">
    <q-header elevated>
      <div class="bg-primary index-header">
        <div class="index-header-ball"></div>
        <div class="index-header-content">
          <!---------------CompanyName----------------------->
          <div class="index-cont-1 index-cont-item">
            <q-btn flat class="text-white" :label="userName" :icon-right="arrowIcon" style="padding-left: 0" v-if="showList">
              <q-menu max-height="30vh" auto-close>
                <q-list dense>
                  <q-item clickable v-for="k in shopList" :key="k.id" @click="changeRole(k)">
                    <q-item-section>{{k.shop_name}}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <span v-else>{{userName}}</span>
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
        </div>
      </div>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <q-footer class="bg-white text-primary fixed-bottom" bordered>
      <q-tabs no-caps  align="left" active-color="black" indicator-color="transparent" class="text-grey indexFooter" shrink>
        <q-route-tab to="" label="首页" icon="app:iconhome" class="index-footer-icon"></q-route-tab>
        <!--          <q-route-tab to="/page/paysubmit" label="工作台" />-->
        <q-route-tab to="" label="应用" icon="app:iconyingyong" class="index-footer-icon"/>
        <q-route-tab to="" label="我的" icon="app:iconwode1" class="index-footer-icon"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import urls from 'src/api/urls'
export default {
  name: "indexLayout",
  data () {
    return {
      arrowIcon: 'app:iconarrow_bottom', // 下拉图标控制
      showList: false, // 是否显示下拉选择门店菜单
      userName: '',
      shopList: []
    }
  },
  created () {
    let vm = this
    // console.log(vm.$route.path) // 根据url
    let opt = vm.$route.query
    if (opt.role === 'hq') { // 当登录角色为商户时
      vm.showList = true
      vm.$store.commit('common/setSearchOptions', 0)
      vm.queryShopList()
    } else if (opt.role === 'shop') {
      vm.showList = false
      vm.$store.commit('common/setSearchOptions', 1)
    }
  },
  computed: {
    ...mapState({
      status: (state) => state.common.searchOptions.time_status,
      tit: (state) => state.common.titleName
    })
  },
  methods: {
    changeRole (obj) {
      this.$q.localStorage.set('currentRole', 'shop') // 设置当前角色为门店
      this.$q.localStorage.set('currentShop', obj.id) // 存储当前选择的门店
      this.userName = obj.shop_name
      this.showList = false
      this.$store.commit('common/setSearchOptions', 1)
      // ... 跳转路由到门店或商户首页
      this.$router.push({name: 'ShopIndex', query: {role: 'shop'}})
    },
    changeDay (val) {
      // console.log(val)
      this.$store.commit('common/setSearchOptions', val)
    },
    queryShopList () {
      let vm = this
      vm.$axios(urls.getShopList, {}).then(res => {
        // console.log(res)
        this.showList = true // 显示下拉门店
        this.userName = res.companys.company_name
        this.shopList = [...res.shops]
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.index-header{
  width: 100%;
  position: relative;
  transition: all linear .5s;
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
  transition: all linear .5s;
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
  margin-top: 3rem;
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
</style>
