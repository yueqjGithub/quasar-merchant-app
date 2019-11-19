<template>
  <q-page class="bgss">
    <div class="welcome fullscreen" v-if="sec!==0">

    </div>
    <div class="q-pa-md margins" v-else>
      <h3>欢迎登陆，知了贝</h3>
      <div class="q-gutter-md">
        <q-input color="green"
          placeholder="请输入手机号"
          ref="input"
          v-model.trim="form.username"
          :rules="[
            val => !!val || '请输入手机号',
            // val => val.length == 11 || '请输入11位手机号',
            // val => (/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(val)) || '请输入正确的手机号'
          ]"
          lazy-rules
        >
          <!-- <template v-slot:prepend>
            <q-icon name="person" />
          </template> -->
          <template v-slot:append v-if="form.username !== ''">
            <q-icon name="close" @click="form.username = ''" class="cursor-pointer" />
          </template>
        </q-input>

        <q-input color="green"
          placeholder="请输入密码"
          type="password"
          ref="input"
          v-model.trim="form.password"
          :rules="[
            val => !!val || '请输入密码',
            val => (/^[a-zA-Z0-9]{6,18}$/.test(val)) || '请输入6-18位密码'
          ]"
          lazy-rules
        >
          <!-- <template v-slot:prepend>
            <q-icon name="work" />
          </template> -->
          <template v-slot:append v-if="form.password !== ''">
            <q-icon name="close" @click="form.password = ''" class="cursor-pointer" />
          </template>
        </q-input>

        <div class="q-pa-xs">
          <q-btn unelevated color="green" class="full-width" :disable="loginbtn" @click="submitCheck" label="登录"></q-btn>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
  import {notify} from 'src/utils/popups'
  import {loginSubmit} from 'src/api/login'
  import {setSession,getSession} from 'src/utils/getToken'
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        sec: 0,
        loginbtn:false,
        form:{
          username: '',
          password: ''
        }
      }
    },
    created () {
      let local = this.$q.localStorage.getItem('token')
      let user = this.$q.localStorage.getItem('userInfo') || ''
      let vm = this
      if(user){
        if(user.roleCode == 'hq'){
          this.$router.push({name:'Index'})
        }else if(user.roleCode == 'cashier' || user.roleCode == 'shop'){
          this.$router.push({name:'Cashier'})
        }
      } else {
        vm.sec = 3
        let interval =setInterval(() => {
          if (vm.sec > 0) {
            vm.sec --
          } else {
            clearInterval(interval)
          }
        }, 1000)
      }
    },
    methods: {
      reset () {
         this.$refs.input.resetValidation()
      },
      submitCheck(){
        let that = this
        if(this.form.username == ''){
          notify('请输入登录账号')
        }
        // else if(!(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(this.form.username))){
        //   notify('请输入正确手机号码')
        // }
        else if(this.form.password == ''){
          notify('请输入登录密码')
        } else if(!(/^[a-zA-Z0-9]{6,18}$/.test(this.form.password))){
          notify('请输入6-18位密码')
        }else{
          that.loginbtn = true
          that.submit()
        }
      },
      submit(){
        let that = this
        let data = {loginid:this.form.username,password:md5(this.form.password)}
        loginSubmit(data).then(res=>{
          if(res.code == 'success'){
            setSession('islogin','login')
            setSession('user',res)
            this.$q.localStorage.set('userInfo', res)
            that.$store.commit('user/setToken', res.token)
            that.tolinks(res.roleCode)
          } else {
            notify(res.msg)
          }
          that.loginbtn = false
        }).catch(err=>{
          that.loginbtn = false
          console.log(err)
        })
      },
      tolinks(link){
        if(link == 'hq'){
          this.$router.push({path:'/user/index'})
        }else if(link == 'cashier' || link == 'shop'){
          this.$router.push({path:'/page/cashier'})
        }
      }
    }
  }
</script>

<style scoped>
  h3{font-size: 20px;}
  .bgss{background-color: #fff;}
  .margins{padding: 40px;}
  .welcome{
    background-image: url("../assets/B-indexBg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
