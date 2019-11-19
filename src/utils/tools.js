import md5 from 'js-md5'
/**
 * 获取地址栏参数
 * @param name
 * @returns {*}
 */
export function getUrlStr (name){
    let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
    if(reg.test(window.location.href)){
        return unescape(RegExp.$2.replace(/\+/g," "))
    }
    return undefined
}

/**
 * 日期格式化成2018-11-11
 * @param year
 * @param month
 * @param day
 * @returns {string}
 */
export function formatDate (year, month, day) {
    const y = year
    let m = month
    if (m < 10) m = `0${m}`
    let d = day
    if (d < 10) d = `0${d}`
    return `${y}-${m}-${d}`
}

/**
 * 获取当前时间戳
 * @returns {number}
 */
export  function getTime() {
    var timestamp = parseInt((new Date()).valueOf()/1000)
    return timestamp
}

/**
 * json格式按照字典方式排序
 * @param dic
 * @returns {string}的json
 */
function orderJson(dic) {
    var json = {}
    var sdic=Object.keys(dic).sort();
    for(var ki in sdic){
        json[sdic[ki]] =dic[sdic[ki]]
    }
    return json
}

function setKey() {
    var key = '237de26b308e861e'
    return key
}

/**
 * json转换成标准url地址格式
 * @param json
 * @returns {string}
 */
function jsonToUrl(json) {
    var params = Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    }).join("&");
    return params
}

export function urlData(d,t) {
    if (d){
        var json = {}
        var data = {}
        var u = orderJson(d)
        json = u
        json['timestamp'] = t
        json['key'] = setKey()
        data = jsonToUrl(json)
        return md5(data)
    } else {
        var json = {}
        var data = {}
        json['timestamp'] = t
        json['key'] = setKey()
        data = jsonToUrl(json)
        return md5(data)
    }
}

export function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
export function uniqueArray(obj){
    var uniques=[];
    var stringify = {};
    for(var i=0; i<obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
            return (Number(a) - Number(b));
        });
        var str='';
        for(var j=0; j < keys.length; j ++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
        }
        if(!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str]=true;
        }
    }
    return uniques;
}