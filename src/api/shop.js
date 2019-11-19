import http from 'src/utils/http'

//获取验证码
export function submitApi(data) {
    return http({
        method: 'POST',
        url:'company/service/company/withdraw_request/create.vm',
        data: { ...data}
    })
}



