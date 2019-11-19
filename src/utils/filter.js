export function toMoney(money = 0){
  var m = parseFloat(money) || 0
  return m.toFixed(2)
}

export function toTime(timeData){
  if(timeData !== ''){
    var newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(timeData)
    return newDate
  }
}
