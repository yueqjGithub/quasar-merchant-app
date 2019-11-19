/*
export function someAction (context) {
}
*/
export const getUserInfo = async (ctx, token)=> {
    return fetchUserInfo(token).then(response => {
        if (response.code === 200) {
        ctx.commit('setUserInfo', response.data)
        }
        return response
    })
}
export const login = async (ctx, account)=>{
    return login(account).then(response => {
      if (response.code === 200) {
        ctx.commit('setUserInfo', response.data.userInfo)
        ctx.commit('setToken', response.data.token)
      }
    })
}