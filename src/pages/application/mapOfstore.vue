<template>
  <div>
    <div class="q-pa-sm" id="mapSec"></div>
    <div>经度：{{lng}}</div>
    <div>纬度：{{lat}}</div>
    <div class="custom-form-btn">
      <q-btn class="custom-btn-80l" color="positive" @click="sub">确定</q-btn>
    </div>
  </div>
</template>

<script>
function TMap(){
    return new Promise(function(resolve, reject) {
        window.init = function() {
            resolve(qq)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://map.qq.com/api/js?v=2.exp&callback=init&key=TGSBZ-3P6WI-GG2GB-5SJBC-SQR5V-OLB6K'
        script.onerror = reject
        document.head.appendChild(script)
    })
}
import { getAddress } from 'src/api/store'
export default {
    name: "mapOfstore",
    props: ['lat1', 'lng1'],
    data () {
        return {
          lat: 30.65618,
          lng: 104.08329,
          map: undefined,
          marker: undefined
        }
    },
    created () {
      // let param = {
      //   location: [30.65618,104.08329]
      // }
      // getAddress(param).then(res => {
      //   console.log(res)
      // },err => {
      //   console.log(err)
      // })
      if (this.lat1) {
          this.lat = this.lat1
      }
      if (this.lng1) {
          this.lng = this.lng1
      }
      this.mapTX(this.lat, this.lng)
    },
    methods: {
        sub () { // 上交经纬度
            let params = {
                lng: this.lng,
                lat: this.lat
            }
            this.$emit('sub', params)
        },
        mapTX (lat=30.65618,lng=104.08329) {
            let _this = this
            TMap().then(qq => {
                _this.map = new qq.maps.Map(document.getElementById('mapSec'), {
                    //这里经纬度代理表进入地图显示的中心区域
                    center: new qq.maps.LatLng(_this.lat, _this.lng),
                    zoom: 13
                })

                _this.marker = new qq.maps.Marker({
                    position: new qq.maps.LatLng(_this.lat, _this.lng), // 纬度，经度,定位地址
                    map: _this.map
                });
                //绑定单击事件添加参数
                qq.maps.event.addListener(_this.map, 'click', function(event) {
                    _this.marker.setMap(null);
                    let lat = event.latLng.getLat()
                    let lng = event.latLng.getLng()
                    _this.lng=lng
                    _this.lat=lat

                    _this.marker = new qq.maps.Marker({
                        position: new qq.maps.LatLng(lat,lng), // 纬度，经度,定位地址
                        map: _this.map
                    });

                    // qq.maps.event.addListener(map,'click',function(event) {
                    //
                    // });

                })
            })
        },
    }
}
</script>

<style scoped>
#mapSec{
  width: 100%;
  height: 40vh;
  margin-top: 5rem;
}
</style>
