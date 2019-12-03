<template>
  <q-tabs no-caps  align="left" active-color="black" indicator-color="transparent" class="text-grey indexFooter" shrink>
    <q-route-tab :to="indexUrl" label="首页" icon="app:iconhome" class="index-footer-icon"></q-route-tab>
    <!--          <q-route-tab to="/page/paysubmit" label="工作台" />-->
    <q-route-tab to="/app" exact label="应用" icon="app:iconyingyong" class="index-footer-icon"/>
    <q-route-tab to="/mine" exact label="我的" icon="app:iconwode1" class="index-footer-icon"/>
  </q-tabs>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "footer",
  data () {
    return {
      indexUrl: ''
    }
  },
  mounted () {
    if (this.cRole === 'hq') {
      this.indexUrl = '/index/companyindex?role=hq'
    } else if (this.cRole === 'shop') {
      this.indexUrl = '/index/shopindex?role=shop'
    } else if (this.cRole === 'sx') {
      this.indexUrl = '/index/shopindex?role=sx'
    }
  },
  computed: {
    ...mapState({
      cRole: (state) => state.common.cRole
    })
  },
  watch: {
    cRole (val) {
      if (val === 'hq') {
        this.indexUrl = '/index/companyindex?role=hq'
      } else if (val === 'shop') {
        this.indexUrl = '/index/shopindex?role=shop'
      } else if (val === 'sx') {
        this.indexUrl = '/index/shopindex?role=sx'
      }
    }
  }
}
</script>

<style scoped>

</style>
