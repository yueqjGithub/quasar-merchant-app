<template>
  <q-layout>
    <q-page-container>
      <q-header bordered class="header-fix bg-green">
        <q-toolbar>
          <q-btn flat round dense class="text-white" @click="goBack" icon="keyboard_arrow_left" />
          <q-toolbar-title class="text-center text-white">扫描核销码</q-toolbar-title>
          <span class="tit-right-place"></span>
        </q-toolbar>
      </q-header>
      <q-page class="fullscreen scan-div">
        <div class="qrscanner">
          <div class="qrscanner-area"></div>
          <div class="scan-border"></div>
          <div class="through-line"></div>
          <div class="button-bottom">
            <q-btn icon="fa fa-bolt" round class="text-positive bg-white" id="light" v-if="light" @click="openLight"></q-btn>
            <q-btn icon="fa fa-bolt" round class="text-black bg-white" v-if="!light" @click="openLight"></q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { scanQrcode } from 'src/api/coupon.js'
export default {
  name: "scan",
  data () {
    return {
      light: false
    }
  },
  created () {
    // console.log(JSON.parse(this.$q.sessionStorage.getItem('user')))
    // this.$q.notify('1111111111111')
  },
  mounted() {
    document.addEventListener('deviceready', this.scan, false)
  },
  methods: {
    goBack () {
      QRScanner.destroy(function(status){
        // console.log(status)
      })
      this.$router.go(-1)
    },
    openLight () {
      let vm = this
      if (!vm.light) {
        QRScanner.enableLight(function(err, status){
          err && console.error(err);
          console.log(status);
          vm.light = true
        })
      } else {
        QRScanner.disableLight(function(err, status){
          err && console.error(err);
          console.log(status);
          vm.light = false
        });
      }
    },
    scan () {
      let vm = this
      if (typeof (QRScanner) != 'undefined') {
        function onDone(err, status) {
          if (err) {
            alert(JSON.stringify(err));
          }
          if (status.authorized) {
            //绑定扫描监听
            // `QRScanner.cancelScan()` is called.
            QRScanner.scan(displayContents);
            function displayContents(err, text) {
              if (err) {
                // an error occurred, or the scan was canceled (error code `6`)
                alert('启动扫描出错：' + JSON.stringify(err));
              } else {
                // alert(text)
                // The scan completed, display the contents of the QR code:
                let usr = vm.$q.localStorage.getItem('userInfo')
                // /api/service/coupon/region_coupon/cost_by_order.vm
                // alert(usr)
                let params = {
                  'shopid': usr.shopid,
                  'orderid': text
                }
                scanQrcode(params).then(res => {
                  // alert(JSON.stringify(res))
                  if (res.code === 'success') {
                    vm.$q.notify('核销成功')
                  } else {
                    vm.$q.notify(res.msg)
                  }
                  setTimeout(() => {
                    vm.$router.push({name: 'Cashier'})
                  }, 1000)
                }).catch(err => {
                  alert('false')
                })
              }
            }
            //开始扫描，需要将页面的背景设置成透明
            QRScanner.show();
            // let lightBtn = document.getElementById('light')
            // lightBtn.addEventListener('click', () => {
            //
            // }, false)
          } else if (status.denied) {
            // The video preview will remain black, and scanning is disabled. We can
            // try to ask the user to change their mind, but we'll have to send them
            // to their device settings with `QRScanner.openSettings()`.
            alert('用户拒绝访问摄像头');
          } else {
            // we didn't get permission, but we didn't get permanently denied. (On
            // Android, a denial isn't permanent unless the user checks the "Don't
            // ask again" box.) We can ask again at the next relevant opportunity.
          }
        }
        QRScanner.prepare(onDone); // show the prompt
      } else {
        alert('插件加载失败');
      }
    }
  }
}
</script>

<style scoped>
.scan-div{
  background: transparent;
}
/*很做作的做了一个上下移动的横线，也不知道是受了谁家二维码扫描的影响*/
.qrscanner {
  width: 100%;
  height: 100%;
}
body,html{
  width:100%;
  height:100%;
}

.qrscanner-area {
  width: 100%;
  height: 85%;
  /*background: url(../images/scanner.svg) no-repeat center center;*/
  /*background-size: contain;*/
}

.through-line {
  left: 22.5%;
  width: 55%;
  height: 2px;
  background: #707070;
  position: absolute;
  top: 180px;
  animation: myfirst 5s linear infinite alternate;
}

@keyframes myfirst {
  0% {
    /*background: red;*/
    top: 180px;
  }

  25% {
    /*background: yellow;*/
    top: calc(180px + 15vw);
  }

  50% {
    /*background: blue;*/
    top: calc(180px + 30vw);
  }

  75% {
    /*background: green;*/
    top: calc(180px + 45vw);
  }

  100% {
    /*background: red;*/
    top: calc(180px + 60vw);
  }
}

.button-bottom {
  width: 128px;
  position: absolute;
  left: 50%;
  bottom: 80px;
  margin-left: -64px;
  display: flex;
  justify-content: center;
  text-align: center;
}
.scan-border{
  width: 60vw;
  height: 60vw;
  /*background: black;*/
  background-image: url("../../statics/images/scan_def.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 180px;
  left: 20vw;
}
.icon-camera {
  float: left;
}
</style>
