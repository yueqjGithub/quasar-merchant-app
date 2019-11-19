import {getSession} from 'src/utils/getToken'
export default {
  token:getSession('token') ,
  auth: false,
  indexStatistics:{},
  userInfo: {}
}
