<template>
  <q-layout>
    <q-page-container class="bgs">
      <router-view></router-view>
    </q-page-container>
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
