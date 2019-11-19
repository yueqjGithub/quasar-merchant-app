import state from "./state";
import {setSession} from 'src/utils/getToken'
import { LocalStorage } from 'quasar'
export const setToken =  (state, token)=> {
    state.token = token
    setSession('token', token)
    LocalStorage.set('token', token)
}
export const clearToken = (state)=>{
    state.token = ''
    setSession('token', '')
}
export const setUserInfo = (state, userInfo)=>{
    state.userInfo = userInfo
    state.auth = true // 获取到用户信息的同时将auth标记为true，当然也可以直接判断userInfo
    // 生成用户路由表
    state.userRoutes = dynamicRoutes.filter(route => {
    return userInfo.menus.some(menu => menu.name === route.name)
    })
    router.addRoutes(state.userRoutes) // 注册路由
    // 获取到用户信息的同时将auth标记为true，当然也可以直接判断userInfo
}


export const setIndexStatistics =  (state, info)=> {
    console.log(info)
    state.indexStatistics = info
}
