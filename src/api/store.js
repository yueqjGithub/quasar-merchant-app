import http from 'src/utils/http'

export function getAddress (data) {
  return http({
    method: 'post',
    url:'service/common/geo.vm',
    data: { ...data}
  })
}

export function createShop (data) {
  return http({
    method: 'post',
    url:'company/service/shop/create.vm',
    data: { ...data}
  })
}

export function uploadImg (data) {
  return http({
    method: 'post',
    url:'common/upload/upload.vm',
    data: { ...data}
  })
}

export function updateShop (data) {
  return http({
    method: 'post',
    url:'company/service/shop/update.vm',
    data: { ...data}
  })
}

// company/service/shop/list.vm
export function getShopList (data) {
  return http({
    method: 'post',
    url:'company/service/shop/list.vm',
    data: { ...data}
  })
}
// common/login/update_password.vm 修改商户密码
export function resetBusPWD (data) {
  return http({
    method: 'post',
    url:'common/login/update_password.vm',
    data: { ...data}
  })
}
// /common/login/change_password.vm  修改门店密码
export function resetShopPWD (data) {
  return http({
    method: 'post',
    url:'common/login/change_password.vm',
    data: { ...data}
  })
}
