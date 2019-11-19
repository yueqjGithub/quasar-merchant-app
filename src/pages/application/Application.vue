<template>
  <q-page>
    <q-header class="bg-green text-white  header-fix">
      <q-toolbar>
<!--        <q-btn flat round dense class="text-white" v-go-back="'/user/mine'" icon="keyboard_arrow_left" />-->
        <q-toolbar-title class="text-center text-white">应用</q-toolbar-title>
<!--        <span class="tit-right-place"></span>-->
      </q-toolbar>
    </q-header>
    <div class="custom-list-item custom-section custom-mat-sm">
      <q-item clickable v-ripple @click="toLink('StoresList')">
        <q-item-section side>
          <q-icon name="fa fa-map-marker" :size="iconSize"></q-icon>
        </q-item-section>
        <q-item-section>
          <span class="mine-list-tit">门店</span>
        </q-item-section>
        <q-item-section side>
          <q-icon name="fa fa-chevron-right" :size="iconSize"></q-icon>
        </q-item-section>
      </q-item>
    </div>
    <div class="custom-list-item custom-section custom-mat-sm">
      <q-item clickable v-ripple @click="toLink('Coupon')">
        <q-item-section side>
          <q-icon name="img:https://pic.iidingyun.com/8696022/upload/merchantapp/icon1@2x.png" :size="iconSize"></q-icon>
        </q-item-section>
        <q-item-section>
          <span class="mine-list-tit">优惠券</span>
        </q-item-section>
        <q-item-section side>
          <q-icon name="fa fa-chevron-right" :size="iconSize"></q-icon>
        </q-item-section>
      </q-item>
    </div>
  </q-page>
</template>

<script>
export default {
    name: "Application",
    data () {
        return {
          iconSize: '1rem'
        }
    },
    methods: {
        toLink (name) {
            this.$router.push({ name: name })
        }
    },
}
</script>

<style scoped>

</style>
