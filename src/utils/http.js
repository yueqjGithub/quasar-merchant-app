import Axios from 'axios'
import QS from 'qs'
import { Loading, QSpinnerGears, Notify, LocalStorage } from 'quasar'
import { getSession,clearSession } from 'src/utils/getToken'

// 创建Axios实例
const http = Axios.create({
  // 开发22，正式20
  baseURL: 'https://8696022.iidingyun.com/api/', // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
http.interceptors.request.use(config => {

  config.headers = {'Content-Type':'application/json;charset=UTF-8'}

  let token = LocalStorage.getItem('token')
  if (token !== '') {
    config.headers['Authorization'] =  token  // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }

  Loading.show({
    delay: 300, // 毫秒
    message: '加载中...',
  })

  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
http.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.data.code == 'jwt_token_expired'){
      clearSession()
      LocalStorage.clear()
      Loading.hide()
      let u = navigator.userAgent
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      let hash = window.location.hash
      let path = window.location.href
      let arr = path.split(hash)
      if (isiOS) {
        window.location.href = arr[0]
      } else {
        window.location.href='/'
      }
    }else if(response.status == 200){
      Loading.hide()
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
