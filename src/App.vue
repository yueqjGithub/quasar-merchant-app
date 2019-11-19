<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
      return {
        statusBarcolorPath:{
           black:['/']//设置黑色背景的路由
      }
    }
  },
  created () {
    this.$q.iconMapFn = (iconName) => {
      // iconName is the content of QIcon "name" prop

      // your custom approach, the following
      // is just an example:
      if (iconName.startsWith('app:') === true) {
        // we strip the "app:" part
        const name = iconName.substring(4)

        return {
          cls: 'iconfont ' + name
        }
      }
    }
  },
  watch:{
    $route:function (val) {
      if(this.statusBarcolorPath.black.indexOf(val.path)!=-1){
        StatusBar.backgroundColorByHexString("#333");//设置状态栏颜色
      }else {
        StatusBar.backgroundColorByHexString("#8dc550");
      }
    }
  }
}
</script>
