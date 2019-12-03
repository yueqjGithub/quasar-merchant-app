export const setSearchOptions = (state, opt) => { // 设置查询是今日昨日累计
  state.searchOptions['time_status'] = opt
}

export const setCurrentRole = (state, opt) => {
  state.cRole = opt
}

export const isShowBack = (state, opt) => {
  state.showBack = opt
}

export const setTit = (state, opt) => {
  state.titleName = opt
}

export const setInfo = (state, obj) => {
  state.information[obj.key] = obj.value
}
