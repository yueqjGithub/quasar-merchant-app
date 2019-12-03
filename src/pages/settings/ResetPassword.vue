<template>
  <q-page>
    <q-header class="my-border">
      <div class="my-header text-black q-pa-sm bg-white">
        <div class="my-header-l">
          <q-btn flat round icon="img:statics/images/back-B.png" @click="backToStoreInfo" v-if="!showOld"></q-btn>
          <q-btn flat round icon="img:statics/images/back-B.png" v-go-back="'/page/account'" v-if="showOld"></q-btn>
        </div>
        <div class="my-header-m text-center">修改密码</div>
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
      <q-page class="bg-white">
        <q-form ref="myForm">
          <div class="my-list-card flex-column flex-align-start flex-just-start">
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-baseline flex-just-start" v-if="showOld">
              <span class="my-label">旧密码</span>
              <div class="my-input">
                <q-input
                  borderless
                  dense
                  :bottom-slots="false"
                  :hide-bottom-space="true"
                  v-model="form.oldPWD"
                  placeholder="填写旧密码"
                  :rules="[
                  val => !!val || ''
                  ]"
                  lazy-rules
                />
              </div>
            </div>
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-baseline flex-just-start">
              <span class="my-label">新密码</span>
              <div class="my-input">
                <q-input
                  borderless
                  dense
                  :bottom-slots="false"
                  :hide-bottom-space="true"
                  v-model="form.newPWD"
                  placeholder="填写新密码"
                  :rules="[
                  val => !!val || ''
                  ]"
                  lazy-rules
                />
              </div>
            </div>
            <!-------------item------------------->
            <div class="my-list-item flex-row flex-align-baseline flex-just-start">
              <span class="my-label">确认密码</span>
              <div class="my-input">
                <q-input
                  borderless
                  dense
                  :bottom-slots="false"
                  :hide-bottom-space="true"
                  v-model="form.cPWD"
                  placeholder="再次填写新密码"
                  :rules="[
                    val => !!val || '请再次输入新密码',
                    val => val === form.newPWD || '与新密码输入不一致'
                  ]"
                  lazy-rules
                />
              </div>
            </div>
          </div>
          <div class="custom-form-btn">
            <q-btn color="positive custom-btn-80l" @click="submit" :loading="loadingBtn">确定</q-btn>
          </div>
        </q-form>
      </q-page>
    </transition>
  </q-page>
</template>

<script>
import urls from 'src/api/urls'
export default {
    name: "ResetPassword",
    data () {
        return {
            loadingBtn: false,
            showOld: true,
            mobile: '',
            form: {
              oldPWD: '',
              newPWD: '',
              cPWD: ''
            },
            saveInfo: {}
        }
    },
    created () {
      let vm = this
      let type = this.$route.params.type
      if (type === 2) {
          this.showOld = false
          this.mobile = this.$route.params.id.mobile
          Object.assign(vm.saveInfo, this.$route.params.id)
      }
    },
    methods: {
      backToStoreInfo () {
        // console.log(this.saveInfo)
        this.$router.push({ name: 'StoreInfo', params: {type: 2, obj: this.saveInfo}})
      },
      submit () {
        let vm = this
        this.$refs['myForm'].validate().then(suc => {
            if (suc) {
                vm.loadingBtn = true
                let params = {
                    password: vm.form.newPWD
                }
                if (vm.showOld) { // 显示旧密码时，即修改商户密码时
                    params['old_password'] = vm.form.oldPWD
                    vm.$axios(urls.resetMypwd, params).then(res => {
                        if (res.code === 'success') {
                          vm.$q.notify(res.msg)
                          vm.$router.push({name: 'Mine'})
                        } else {
                          vm.$q.notify(res.msg)
                        }
                        vm.loadingBtn = false
                    }, () => {
                        vm.loadingBtn = false
                    })
                } else { // 修改门店密码时
                    params['mobile'] = vm.mobile
                    vm.$axios(urls.resetShopPwd, params).then(res => {
                        if (res.code === 'success') {
                          vm.$q.notify(res.msg)
                          vm.$router.push({name: 'StoresList'})
                        } else {
                          vm.$q.notify(res.msg)
                        }
                        vm.loadingBtn = false
                    }, err => {
                        console.log(err)
                        vm.loadingBtn = false
                    })
                }
            } else {
                return false
            }
        })
      }
    }
}
</script>

<style scoped>
  .my-border{
    border-bottom: 1px solid #e6e6e6;
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
</style>
