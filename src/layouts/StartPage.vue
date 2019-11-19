<template>
  <q-layout>
    <q-page class="fullscreen startBG">
    </q-page>
  </q-layout>
</template>

<script>
export default {
  name: "StartPage",
  data () {
    return {
      sec: 5
    }
  }
}
</script>

<style scoped>
.startBG{
  background-image: url("../assets/B-indexBg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
