// 模拟获取用户信息请求接口
export function fetchUserInfo (token) {
    if (token === 'usertoken') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 200,
            msg: 'success',
            data: {
              id: 1,
              name: 'Johnson',
              email: 'love@joenlee.cn',
              menus: [
                {
                  title: '个人中心',
                  name: 'UserCenter'
                }
              ]
            }
          })
        }, 1500)
      })
    } else {
      return Promise.resolve({
        code: 100,
        msg: 'token失效'
      })
    }
}
  
  // 模拟登录请求
  export function login (account) {
if (account.username === 'johnson' && account.password === 'abc123') {
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve({
        code: 200,
        msg: 'success',
        data: {
            token: 'usertoken',
            userInfo: {
            id: 1,
            name: 'Johnson',
            email: 'love@joenlee.cn',
            menus: [
                {
                title: '个人中心',
                name: 'UserCenter'
                }
            ]
            }
        }
        })
    }, 1500)
    })
} else {
    return Promise.resolve({
    code: 100,
    msg: '用户名或密码错误'
    })
}
}

