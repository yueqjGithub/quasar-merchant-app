<template>
  <q-layout view="lHh lpr lff" class="my-grey-bg">
    <q-header class="bg-trans">
      <div class="my-header text-black q-pa-md">
        <div class="my-header-l">
          <!--          <q-btn flat round icon="img:statics/images/back-B.png" @click="back"></q-btn>-->
        </div>
        <div class="my-header-m text-center">我的</div>
        <div class="my-header-r"></div>
      </div>
    </q-header>
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <q-page-container>
        <q-page>
          <div class="custom-list-item custom-section custom-mat-sm">
            <q-item clickable v-ripple @click="toLink('Account')">
              <q-item-section>
                <div class="my-list flex-row flex-space-between flex-align-center">
                  <span class="link-word">账号管理</span>
                  <q-btn flat round icon="fa fa-angle-right" size="sm" class="c-tips"></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </div>
          <div class="custom-list-item custom-section custom-mat-sm ma-tp">
            <q-item clickable v-ripple @click="toLink('Contract')">
              <q-item-section>
                <div class="my-list flex-row flex-space-between flex-align-center">
                  <span class="link-word">我的合同</span>
                  <q-btn flat round icon="fa fa-angle-right" size="sm" class="c-tips"></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </div>
        </q-page>
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
    name: "MineIndex",
    components: {
      tabBottom
    },
    data () {
      return {
        isHq: true
      }
    },
    created () {
      // let role = this.$q.localStorage.getItem('currentShop')
      // if (role) {
      //   this.isHq = false
      // }
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
