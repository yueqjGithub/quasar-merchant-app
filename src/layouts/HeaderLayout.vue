<template>
  <q-layout view="lHh lpr lFf">
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </transition>
  </q-layout>
</template>

<script>
export default {
  name: 'HeaderLayout',

  data () {
    return {
      header:''
    }
  }
}
</script>
<style scoped>
  .q-layout-padding{padding: 0}
</style>
