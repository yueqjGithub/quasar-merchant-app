<template>
    <q-page>
      <q-header class="bg-green text-white  header-fix">
        <q-toolbar>
          <q-btn flat round dense class="text-white" v-go-back="'/user/mine'" icon="keyboard_arrow_left" />
          <q-toolbar-title class="text-center text-white">个人资料</q-toolbar-title>
          <span class="tit-right-place"></span>
        </q-toolbar>
      </q-header>
      <div class="custom-list-item custom-section">
        <q-item>
          <q-item-section side>
          </q-item-section>
          <q-item-section>
            <span>头像</span>
          </q-item-section>
          <q-item-section side>
            <q-avatar size="4rem" color="positive">
              <span style="color: white;">{{user.name.split('')[0]}}</span>
            </q-avatar>
          </q-item-section>
        </q-item>
      </div>
      <div class="custom-list-item custom-section">
        <q-item>
          <q-item-section side>
          </q-item-section>
          <q-item-section>
            <span>商户名称</span>
          </q-item-section>
          <q-item-section side class="us-name">
<!--            <span v-if="">{{user.name}}</span>-->
            <q-input borderless v-model="user.name" disable/>
          </q-item-section>
        </q-item>
      </div>
      <div class="custom-form-btn">
        <q-btn color="positive" class="custom-btn-80l" :loading="loadingBtn">保存</q-btn>
      </div>
      <div style="display: none">
        <input type="file" accept="image/*" multiple="multiple" ref="myInput" @change="changeAvator"/>
      </div>
    </q-page>
</template>

<script>
export default {
  name: "UserInfo",
  data () {
    return {
      iconSize: '1rem',
      loadingBtn: false,
      imgSrc: '',
      user: {
        avatarUrl: 'https://cdn.quasar.dev/img/avatar.png',
        // trueName: '大牛先生',
        name: '大牛先生',
      }
    }
  },
  methods: {
      updateAvatar () {
          this.$refs['myInput'].click()
      },
      changeAvator (e) {
          let vm = this
          let file = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(file)
          // 一定要在文件读取 成功完成时 再进行相应的操作：上传使用formdata上传
          reader.onload = function () {
              vm.user.avatarUrl = reader.result
              // console.log(reader.result)
          }
      }
  }
}
</script>

<style scoped>
.us-name{
  width: 5rem;
}
</style>
