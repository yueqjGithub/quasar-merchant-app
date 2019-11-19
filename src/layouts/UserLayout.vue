<template>
  <q-layout class="height bgs " view="lhh lPr lFf">
    <q-page-container style="padding-top: 0;">
      <router-view></router-view>
    </q-page-container>
    <q-footer class="bg-white text-primary fixed-bottom" bordered>
      <q-tabs no-caps  align="left" active-color="black" indicator-color="transparent" class="text-grey indexFooter" v-model="tab" shrink>
          <q-route-tab to="/user/index" label="首页" icon="app:iconhome" class="index-footer-icon"></q-route-tab>
<!--          <q-route-tab to="/page/paysubmit" label="工作台" />-->
          <q-route-tab to="/user/application" label="应用" icon="app:iconyingyong" class="index-footer-icon"/>
          <q-route-tab to="/user/mine" label="我的" icon="app:iconwode1" class="index-footer-icon"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'UserLayout',

  data () {
    return {
      tab:''
    }
  }
}
</script>
<style scoped>
</style>
