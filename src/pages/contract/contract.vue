<template>
  <q-page>
    <q-header class="my-border">
      <div class="my-header text-black q-pa-sm bg-white">
        <div class="my-header-l">
          <q-btn flat round icon="img:statics/images/back-B.png" @click="goBack"></q-btn>
        </div>
        <div class="my-header-m text-center">合同管理</div>
        <div class="my-header-r">
          <!--          <q-btn rounded unelevated flat label="新建菜品" text-color="primary" class="word-no-wrap"></q-btn>-->
        </div>
      </div>
    </q-header>
    <div class="contract-tit q-pa-sm">
      <span>合同名称：{{contract.tit}}</span>
      <span>合同编号：{{contract.code}}</span>
    </div>
    <q-scroll-area class="q-pa-sm constract-cont word-break" :horizontal="false">
      <div class="text-black" v-html="contract.content"></div>
    </q-scroll-area>
    <img :src="contractImg" alt="" v-if="!showCanvas">
    <div id="customCanvas" v-if="showCanvas"></div>
    <div class="btn-group" v-if="showCanvas">
      <q-btn ref="save" id="saveName" color="primary">保存</q-btn>
      <q-btn ref="clear" id="clearName" color="primary">重置</q-btn>
    </div>
  </q-page>
</template>

<script>
import urls from 'src/api/urls'
export default {
  name: "contract",
  data () {
    return {
      showCanvas: false,
      contract: { // 电子合同
        content: '',
        tit: '',
        code: ''
      },
      contractImg: ''
    }
  },
  created () {
    this.queryContract()
  },
  destroyed () {
    document.removeEventListener('touchmove', this.prevent, false)
    document.removeEventListener('touchmove', this.prevent, true)
  },
  methods: {
    goBack () {
      this.$router.push({name: 'Mine'})
    },
    // getContract
    queryContract () {
      let param = {
        'type': 1
      }
      this.$axios(urls.getContract, param).then(res => {
        let code = res.code
        if (code === 'success') {
          this.contract.content = res.data.content
          this.contract.tit = res.data.name
          this.contract.code = res.data.contract_code
          if (!res.data.e_contract) {
            this.showCanvas = true
            this.init_lineCanvas()
          }
        } else {
          this.$q.notify(res.msg)
        }
      }, () => {
        // this.$q.dialog('获取合同内容失败，请稍后再试')
        this.$q.notify( '获取合同内容失败')
      })
    },
    // 签名版关联
    prevent (event) {
      event.preventDefault()
    },
    init_lineCanvas () { // 生成签字板
      document.addEventListener(
        'touchmove',
        this.prevent,
        { passive: false }
      )
      /* eslint-disable */
      new this.lineCanvas({
        // el: document.getElementById("customCanvas"), // 绘制canvas的父级div
        that: this,
        linewidth: 3, // 线条粗细，选填
        color: '#000000', // 线条颜色，选填
        background: '#ffffff' // 背景，选填
      })
      /* eslint-disable */
    },
    lineCanvas (obj) { // canvas设置
      /* eslint-disable */
      let vm = this
      let setting = {}
      for (let i in obj) {
        setting[i] = obj[i]
      }
      this.canvas = document.createElement('canvas');
      let el
      setTimeout(() => {
        el = document.getElementById('customCanvas')
        el.appendChild(this.canvas);
        vm.cxt = vm.canvas.getContext('2d');
        vm.canvas.width = 333;
        vm.canvas.height = 147;
        vm.cxt.fillStyle = setting.background;
        vm.cxt.fillRect(0, 0, vm.canvas.width, vm.canvas.height);
        vm.cxt.strokeStyle = setting.color;
        vm.cxt.lineWidth = setting.linewidth;
        vm.cxt.lineCap = 'round';
        // 开始绘制
        // 获取offset
        let offsetT = el.offsetTop
        let offsetL = el.offsetLeft
        vm.canvas.addEventListener(
          'touchstart',
          function (e) {
            vm.cxt.beginPath();
            vm.cxt.moveTo(e.changedTouches[0].pageX - offsetL, e.changedTouches[0].pageY - offsetT - 58);
          },
          false
        );
        // 绘制中
        vm.canvas.addEventListener(
          'touchmove',
          function (e) {
            console.log(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
            vm.cxt.lineTo(e.changedTouches[0].pageX - offsetL, e.changedTouches[0].pageY - offsetT - 58);
            vm.cxt.stroke();
          },
          false
        );
        // 结束绘制
        vm.canvas.addEventListener(
          'touchend',
          function () {
            vm.cxt.closePath()
          },
          false
        )
        // 清除画布
        let clear = document.getElementById('clearName')
        clear.addEventListener(
          'click',
          function () {
            // console.log('清除画布')
            // console.log(this)
            this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
          }.bind(this),
          false
        )
        // 保存图片
        let save = document.getElementById('saveName')
        save.addEventListener(
          'click',
          function () {
            let imgBase64 = this.canvas.toDataURL()
            let contractInfo = {
              fileName: `${Math.random()}contract`,
              fileData: imgBase64
            }
            obj.that.checkContract(contractInfo)
          }.bind(this),
          false
        )
      }, 1500)
      /* eslint-disable */
    },
    async checkContract (params) {
      // let check = await
      let vm = this
      let a = await vm.check1(params)
      if (a) {
        vm.subContract(params)
      }
    },
    check1 (params) {
      let vm = this
      let host = 'https://8696022.iidingyun.com'
      let opt = {
        "img_base": params.fileData
      }
      let p = new Promise ((resolve, reject) => {
        vm.$axios(`${host}/api/service/ai/ocr.vm`, opt).then(res => {
          if (res.code === 'success' && res.word.length > 0) {
            resolve('success')
          } else {
            vm.$q.notify('无法识别，请用正楷书写')
            reject(new Error({ 'error': res.msg }))
          }
        }).catch(err => {
          reject(JSON.stringify(err))
        })
      })
      return p
    },
    subContract (param) {
      let vm = this
      this.$axios(urls.uploadImg, param).then(res => {
        if (res.code === 'success') {
          let opt = {
            'id': vm.$q.localStorage.getItem('userInfo').companyid,
            'e_contract_address': res.url
          }
          vm.$axios(urls.saveContract, opt).then(res => {
            if (res.code === 'success') {
              vm.$q.notify('已签署合同')
            } else {
              vm.$q.notify(res.msg)
            }
          }, err => {
            vm.$q.notify(JSON.stringify(err))
          })
        } else {
          vm.$q.notify(res.msg)
        }
      }).catch(err => {
        vm.$q.notify(JSON.stringify(err))
      })
    }
  }
}
</script>

<style scoped>
  canvas{
    border: 1px solid black;
  }
  .home{
    width: calc(100vw - 16px);
    height: 100vh;
    padding: 8px 8px 0 8px;
  }
  .contract-tit{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
  .constract-cont{
    /*background: red;*/
    width: 100%;
    height: 42vh;
    margin: 12px auto;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #customCanvas{
    width: 333px;
    height: 149px;
    margin: 1vmax auto;
  }
  .btn-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
