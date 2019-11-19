<template>
  <div class="q-pa-md margins">
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">提示</div>
        </q-card-section>
        <q-card-section class="textadling">
         {{message}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="确定" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-gutter-md">

      <q-input color="green-10" 
        placeholder="请输入手机号"
        ref="input"
        v-model="form.phone"
        :rules="[
          val => !!val || '请输入手机号',
          val => val.length == 11 || '请输入规范的手机号',
          val => (/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(val)) || '请输入正确的手机号'
        ]"
        lazy-rules
      >

        <template v-slot:prepend>
          <q-icon name="flight_takeoff" />
        </template>
        <template v-slot:append v-if="form.phone !== ''">
          <q-icon name="close" @click="form.phone = ''" class="cursor-pointer" />
        </template>
      </q-input>

      <q-input color="green-10" 
        placeholder="请输入验证码"
        v-model="form.phoneCode"
        :rules="[
          val => !!val || '请输入验证码',
          val => val.length == 6 || '请输入正确的手机验证码'
        ]"
        lazy-rules
      >
        <template v-slot:prepend>
          <q-icon name="flight_takeoff" />
        </template>
        <template v-slot:append v-if="form.phoneCode !== ''">
          <q-icon name="close" @click="form.phoneCode = ''" class="cursor-pointer" />
        </template>
        <template v-slot:after>
          <q-btn color="green-10" class="btn-w"  @click="sendCode" :disable="!sendAuthCode">
            <span v-show="sendAuthCode" @click="sendCode">获取验证码</span>
            <span v-show="!sendAuthCode"><span>{{auth_time}} </span> 秒之重新发送验证码</span>
          </q-btn>
        </template>
      </q-input>
     
      <div class="q-pa-xs">
        <q-btn color="green-10" class="full-width" @click="submitCheck" label="登录" />
      </div>
      
    </div> 
  </div>
</template>

<script>
  import {notify} from 'src/utils/popups'
  import {sendSms,loginSubmit} from 'src/api/login'
  import {setSession} from 'src/utils/getToken'
  export default {
    data() {
      return {
        alert:false,
        message:'',
        codemsg:'获取验证码',
        sendAuthCode:true,
        auth_time: 0,
        form:{
          phone: '',
          phoneCode: ''
        }
      }
    },
    methods: {
      reset () {
         this.$refs.input.resetValidation()
      },
      sendCode(){
        let that = this
        if(this.form.phone == ''){
          notify('请输入手机号码')
        }else if(!(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(this.form.phone))){
           notify('请输入正确手机号码')
        }else{
          let data = {mobile:that.form.phone}
          sendSms(data).then(res=>{
            if(res.msg == 'ok'){
              that.getCode()
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      submitCheck(){
        if(this.form.phone == ''){
          notify('请输入手机号码')
        }else if(!(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(this.form.phone))){
          notify('请输入正确手机号码')
        }else if(this.form.phoneCode == ''){
          notify('请输入手机验证码')
        } else if(!(/[0-9]{6,6}/.test(this.form.phoneCode))){
          notify('请输入正确手机验证码')
        }else{
          this.submit()
        }
      },
      getCode() {
        this.sendAuthCode = false;
        this.auth_time = 60;
        var auth_timetimer =  setInterval(()=>{
          this.auth_time--;
          if(this.auth_time<=0){
            this.sendAuthCode = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);
      },
      submit(){
        let that = this
        let data = {
          mobile:this.form.phone,
          code:this.form.phoneCode
        }
        loginSubmit(data).then(res=>{
          if(res.code == "validation_code_wrong"){
            notify(res.msg)
          }else if(res.code=='user_not_exist'){
            notify('用户不存在')
          }else if(res.code=='success'){
            
            that.$store.commit('user/updateUser',res.token)
            notify('登录成功')
            setSession('token',res.token)
            this.$router.push({  //核心语句
              path:'/index',   //跳转的路径
            })
        }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .margins{padding: 40px;}
  .textadling{text-align: center}
</style>