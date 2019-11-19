import http from 'src/utils/http'

//获取验证码
export function getReceiveRecordApi(data) {
    return http({
        method: 'GET',
        url:'company/service/report/coupon/buy_coupon.vm',
        params: { ...data}
    })
}

export function getReceiveCostApi(data) {
    return http({
        method: 'GET',
        url:'company/service/report/shop/cost_coupon.vm',
        params: { ...data}
    })
}

export function getBalanceApi(data) {
    return http({
        method: 'GET',
        url:'company/service/report/company/dc_history_list.vm',
        params: { ...data}
    })
}

export function getBalanceHistoryApi(data) {
    return http({
        method: 'GET',
        url:'company/service/report/company/balance_history_list.vm',
        params: { ...data}
    })
}



export function getFansApi(data) {
    return http({
        method: 'GET',
        url:'company/service/report/company/fans_list.vm',
        params: { ...data}
    })
}

export function getPayOrderApi(data) {
    return http({
        method: 'GET',
        url:'company/service/report/company/balance_history_list.vm',
        params: { ...data}
    })
}


export function getCostCouponApi(data) {
    return http({
        method: 'GET',
        url:'company/service/report/shop/cost_coupon.vm',
        params: { ...data}
    })
}

