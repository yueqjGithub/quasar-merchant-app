<template>
  <q-page>
    <q-header class="my-border">
      <div class="my-header text-black q-pa-sm bg-white">
        <div class="my-header-l">
          <q-btn flat round icon="img:statics/images/back-B.png" v-go-back="'/login'"></q-btn>
        </div>
        <div class="my-header-m text-center">商家入驻</div>
        <div class="my-header-r">
          <!--          <q-btn rounded unelevated flat label="新建菜品" text-color="primary" class="word-no-wrap"></q-btn>-->
        </div>
      </div>
    </q-header>
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <q-page class="my-grey-bg">
        <q-form ref="myForm">
          <div class="my-list-card flex-column flex-align-start flex-just-start">
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-baseline flex-just-start">
              <span class="my-label">账号</span>
              <div class="my-input">
                <q-input
                  borderless
                  dense
                  :bottom-slots="false"
                  :hide-bottom-space="true"
                  v-model="company.mobile"
                  placeholder="建议使用手机号作为登录账号"
                  :rules="[
                  val => !!val || ''
                ]"
                />
              </div>
            </div>
            <!-------------item------------------->
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-baseline flex-just-start">
              <span class="my-label">密码</span>
              <div class="my-input">
                <q-input
                  borderless
                  dense
                  type="password"
                  :bottom-slots="false"
                  :hide-bottom-space="true"
                  v-model="company.password"
                  placeholder="6~16位"
                  :rules="[
                  val => !!val || '',
                  val => val.length > 5,
                  val => val.length < 16,
                ]"
                />
              </div>
            </div>
            <!-------------item------------------->
          </div>
          <div class="my-list-card flex-column flex-align-start flex-just-start">
            <!-------------item------------------->
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-baseline flex-just-start">
              <span class="my-label">商家名称</span>
              <div class="my-input">
                <q-input
                  borderless
                  dense
                  :bottom-slots="false"
                  :hide-bottom-space="true"
                  v-model="company.company_name"
                  placeholder="输入商家名称"
                  :rules="[
                  val => !!val || ''
                ]"
                />
              </div>
            </div>
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-baseline flex-just-start">
              <span class="my-label">法人姓名</span>
              <div class="my-input">
                <q-input
                  borderless
                  dense
                  :bottom-slots="false"
                  :hide-bottom-space="true"
                  v-model="company.legal_person"
                  placeholder="输入法人姓名"
                  :rules="[
                  val => !!val || ''
                ]"
                />
              </div>
            </div>
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-baseline flex-just-start">
              <span class="my-label">身份证号</span>
              <div class="my-input">
                <q-input
                  borderless
                  dense
                  :bottom-slots="false"
                  :hide-bottom-space="true"
                  v-model="company.idcard_no"
                  placeholder="输入法人身份证号"
                  :rules="[
                  val => !!val || ''
                ]"
                />
              </div>
            </div>
            <!-------------item------------------->
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-center flex-space-between">
              <span class="my-label">营业执照</span>
              <!---------隐藏上传触发input--------->
              <div style="display: none">
                <input type="file" accept="image/*"  capture="camera" ref="myInput" @change="updateByInput($event)"/>
              </div>
              <div @click="chooseUpload">
                <span class="text-primary" :class="company.business_license ? '' : 'text-grey'">{{company.business_license ? '已上传' : '未上传'}}</span>
                <q-btn flat rounded text-color="grey" icon-right="fa fa-angle-right"></q-btn>
              </div>
            </div>
            <!-------------item------------------->
            <div class="my-list-item-last flex-row flex-align-center flex-just-start">
              <q-checkbox v-model="company.checked" color="primary" size="sm"/>
              <span class="check-word">已阅读并同意
                <a href="" class="check-a">《知了贝使用协议及相关授权》</a>
              </span>
            </div>
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-center flex-just-start">
              <q-btn label="注册" color="primary" unelevated class="full-width" @click="register"></q-btn>
            </div>
          </div>
        </q-form>
      </q-page>
    </transition>
  </q-page>
</template>

<script>
  import urls from 'src/api/urls'
  export default {
    name: "register",
    data () {
      return {
        company: {
          legal_person: '',  //法人名称
          business_license: '', // 营业执照
          company_name: '',//商户名称
          mobile: '',//登录手机号
          password: '',//密码
          idcard_no: '',//法人身份证号
          checked: false
        }
      }
    },
    methods: {
      register () {
        let vm = this
        this.$refs['myForm'].validate().then(suc => {
          if (suc) {
            if (vm.company.checked = false) {
              vm.$q.notify('同意协议方可进行注册')
              return false
            }
            let param = {}
            Object.assign(param, vm.company)
            param['checked'] = undefined
            vm.$axios(urls.register, param).then(res => {
              if (res.code === 'success') {
                vm.$q.notify('恭喜您入驻成功')
                setTimeout(() => {
                  vm.$router.push({name: 'Login'})
                }, 1500)
              } else {
                vm.$q.notify(res.msg)
              }
            }, () => {})
          }
        })
      },
      // -----------照片
      chooseUpload () { // 选择是相册还是相机上传
        let vm = this
        // this.$refs['myInput'].click()
        this.$q.bottomSheet({
          message: '',
          actions: [
            {
              label: '相机',
              id: 'camera'
            },
            {
              label: '从相册中选择',
              id: 'photo'
            }
          ]
        }).onOk(action => {
          // this.$q.notify(action.id)
          if (action.id === 'photo') {
            this.$refs['myInput'].click()
          } else if (action.id === 'camera') {
            // this.$q.notify(action.id)
            /* eslint-disable */
            navigator.camera.getPicture(
              data => { // on success
                let params = {
                  fileName: `${Math.random()}pic`,
                  fileData: `data:image/jpeg;base64,${data}`
                }
                vm.$axios(urls.uploadImg, params).then(res => {
                  if (res.code === 'success') {
                    vm.company.business_license = res.url
                  } else {
                    vm.$q.notify(res.message)
                  }
                }, () => {
                  this.$q.notify('上传出错，请检查网络是否通畅')
                })
              },
              () => { // on fail
                // this.$q.notify('Could not access device camera.')
              },
              {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL, // 返回Base64编码字符串
              }
            )
            /* eslint-disable */
          }
        }).onCancel(() => {

        })
      },
      updateByInput (e) { // 通过input上传---相册上传
        let vm = this
        let file = e.target.files[0]
        let params = {}
        let reader = new FileReader()
        reader.readAsDataURL(file)
        // 一定要在文件读取 成功完成时 再进行相应的操作：上传使用formdata上传
        reader.onload = function () {
          // vm.storeInfo.photo = reader.result
          params = {
            fileName: file.name,
            fileData: reader.result
          }
          vm.$axios(urls.uploadImg, params).then(res => {
            if (res.code === 'success') {
              vm.company.business_license = res.url
            } else {
              vm.$q.notify(res.message)
            }
          }, () => {
            // console.log(err)
          })
        }
      },
    }
  }
</script>

<style scoped>
  .my-border{
    border-bottom: 1px solid #e6e6e6;
  }
  .card-tit{
    margin-top: 1rem;
    font-size: 2rem;
    color: #000000;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  .my-tips{
    font-size: 1.5rem;
    color: #999999;
  }
  .my-list-item{
    width: 100%;
    padding: 1rem 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .my-list-item-last{
    width: 100%;
    padding: 1rem 0;
  }
  .my-label{
    width: 9rem;
    font-size: 1.6rem;
    color: #000000;
    margin-right: 1rem;
  }
  .my-input{
    flex: 2;
  }
  .check-word{
    font-size: 1.1rem;
    color: #9b9b9b;
  }
  .check-a{
    text-decoration: none;
    color: #0d47a1;
  }
</style>
