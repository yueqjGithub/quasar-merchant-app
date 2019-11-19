import { getSession } from 'src/utils/getToken'
import {notify,} from 'src/utils/popups'
import {LocalStorage,Dialog} from 'quasar'

export default ({ router, store, Vue }) => {
    router.beforeEach((to, from, next) => {
        // console.log(store.state.user.auth)
      // console.log(router)
      //   if (to.matched.some(record => record.meta.requireAuth)) {
      //       if (!store.state.user.auth) {
      //           if (store.state.user.token) {
      //               try {
      //                   // const data = await store.dispatch('getUserInfo', store.state.user.token) 请求接口
      //                   //遗留bug 后续必须解决
      //                   if (getSession('token')) {
      //                       next()
      //                   } else {
      //                       notify('请先登录')
      //                       store.user.commit('clearToken')
      //                       next({ name: 'Login' })
      //                   }
      //               } catch (err) {
      //
      //                   notify('请先登录')
      //                   store.user.commit('clearToken')
      //                   next({ name: 'Login' })
      //               }
      //           } else {
      //               next({ name: 'Login' })
      //           }
      //       }else {
      //           next()
      //       }
      //   }else {
      //       next()
      //   }
      if (to.name === 'Login') { // 登录页直接next
        return next()
      } else { // 判断是否有token，有则进入，没有则返回登录页
        let tok = LocalStorage.getItem('token')
        if (tok) {
          return next()
        } else {
          Dialog.create({
            title: '请登录',
            message: '请您先登录',
            cancel: false,
            persistent: true,
            ok: { 'label': '确定', 'flat': true }
          }).onOk(() => {
            return next({ name: 'Login' })
          })
        }
      }
    })
}
