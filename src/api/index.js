import http from 'src/utils/http'

//获取验证码
export function getIndexApi() {
    return http({
        method: 'get',
        url:'company/service/report/company_summary.vm'
    })
}
