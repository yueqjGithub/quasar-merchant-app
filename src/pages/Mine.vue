<template>
  <q-page>
    <div class="mine-top">
      <div class="mine-head mine-section">
<!--        <q-item clickable v-ripple @click="toLink('UserInfo')">-->
        <q-item clickable v-ripple>
          <q-item-section side>
            <q-avatar size="5rem" color="positive">
              <span style="color: white;">{{user.userName ? user.userName.split('')[0] : '未命名'}}</span>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <span class="mine-u-name">{{user.userName}}</span>
          </q-item-section>
          <q-item-section side>
<!--            <q-icon name="fa fa-chevron-right" :size="iconSize"></q-icon>-->
          </q-item-section>
        </q-item>
      </div>
      <div class="mine-list">
<!--        <div class="mine-list-item mine-section">-->
<!--          <q-item clickable v-ripple @click="toLink('Paysubmit')">-->
<!--            <q-item-section side>-->
<!--              <q-icon name="fa fa-credit-card" :size="iconSize"></q-icon>-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <span class="mine-list-tit">充值</span>-->
<!--            </q-item-section>-->
<!--            <q-item-section side>-->
<!--              <q-icon name="fa fa-chevron-right" :size="iconSize"></q-icon>-->
<!--            </q-item-section>-->
<!--          </q-item>-->
<!--        </div>-->
        <div class="mine-list-item mine-section">
          <q-item clickable v-ripple @click="toLink('Setting')">
            <q-item-section side>
              <q-icon name="fa fa-wrench" :size="iconSize"></q-icon>
            </q-item-section>
            <q-item-section>
              <span class="mine-list-tit">设置</span>
            </q-item-section>
            <q-item-section side>
              <q-icon name="fa fa-chevron-right" :size="iconSize"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Mine",
  data () {
      return {
          iconSize: '1rem',
          user: {
            avatarUrl: '',
            userName: ''
          },
      }
  },
  created () {
    let obj = this.$q.localStorage.getItem('user')
    // console.log(obj)
    this.user.userName = obj.company_name
  },
  methods: {
      toLink(name){
          this.$router.push({ name: name })
      }
  }
}
</script>

<style scoped>
.mine-top{
  /*display: flex;*/
  /*justify-content: space-around;*/
  /*align-items: center;*/
}
.mine-section{
  background-color: #ffffff;
}
.mine-list-item + .mine-list-item {
  margin-top: .8rem;
}
.mine-u-name {
  font-size: 1.3rem;
}
.mine-list {
  margin-top: .5rem;
}
.mine-list-tit{
  font-size: 1rem;
}
</style>
