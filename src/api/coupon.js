import http from 'src/utils/http'

export function getCouponApi(data) {
    return http({
        method: 'GET',
        url:'company/service/coupon/list.vm',
        params: { ...data}
    })
}

export function getCouponShopApi(data) {
    return http({
        method: 'GET',
        url:'company/service/company/get_company_shop.vm',
        params: { ...data}
    })
}

export function getShopApi(data) {
    return http({
        method: 'GET',
        url:'service/shop/get_coupon_shop.vm',
        params: { ...data}
    })
}

export function submitCouponApi(data) {
    return http({
        method: 'POST',
        url:'company/service/coupon/create.vm',
        data: { ...data}
    })
}

export function updataCouponApi(data) {
    return http({
        method: 'POST',
        url:'company/service/coupon/update_status.vm',
        data: { ...data}
    })
}


export function submitUpdataCouponApi(data) {
    return http({
        method: 'POST',
        url:'company/service/coupon/update.vm',
        data: { ...data}
    })
}

// 扫描二维码核销
export function scanQrcode (data) {
  return http({
    method: 'POST',
    url:'service/coupon/region_coupon/cost_by_order.vm',
    data: { ...data}
  })
}


