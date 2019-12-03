<template>
  <q-layout view="lHh lpr lff" class="my-grey-bg">
    <q-header class="bg-trans">
      <div class="my-header text-black q-pa-md">
        <div class="my-header-l">
          <!--          <q-btn flat round icon="img:statics/images/back-B.png" @click="back"></q-btn>-->
        </div>
        <div class="my-header-m text-center">应用</div>
        <div class="my-header-r"></div>
      </div>
    </q-header>
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <q-page-container>
        <q-page v-if="isHq">
          <div class="custom-list-item custom-section custom-mat-sm">
            <q-item clickable v-ripple @click="toLink('StoresList')">
              <q-item-section>
                <div class="my-list flex-row flex-space-between flex-align-center">
                  <span class="link-word">门店管理</span>
                  <q-btn flat round icon="fa fa-angle-right" size="sm" class="c-tips"></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </div>
          <div class="custom-list-item custom-section custom-mat-sm ma-tp">
            <q-item clickable v-ripple @click="toLink('Product')">
              <q-item-section>
                <div class="my-list flex-row flex-space-between flex-align-center">
                  <span class="link-word">菜品管理</span>
                  <q-btn flat round icon="fa fa-angle-right" size="sm" class="c-tips"></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </div>
        </q-page>
        <div class="text-center text-grey-14" v-else>当前暂无数据</div>
      </q-page-container>
    </transition>
    <q-footer class="bg-white text-primary fixed-bottom" bordered>
      <tab-bottom></tab-bottom>
    </q-footer>
  </q-layout>
</template>

<script>
import tabBottom from 'src/components/footer'
export default {
  name: "applicationIndex",
  components: {
    tabBottom
  },
  data () {
    return {
      isHq: true
    }
  },
  created () {
    let role = this.$q.localStorage.getItem('currentShop')
    if (role) {
      this.isHq = false
    }
  },
  methods: {
    toLink (name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style scoped>
.link-word{
  font-size: 1.7rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.ma-tp{
  margin-top: .5rem;
}
</style>
