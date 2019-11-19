import http from 'src/utils/http'

//获取验证码
export function sendSms(data) {
    return http({
        method: 'post',
        url:'common/send_sms.vm',
        data: { ...data}
    })
}

//会员登录
export function loginSubmit(data) {
    return http({
        method: 'post',
        url:'common/login/login.vm',
        data: { ...data}
    })
}