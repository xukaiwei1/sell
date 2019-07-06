import axios from 'axios'
import qs from 'qs'
/**
 * 响应拦截器, 将网络异常的情况也做resolve处理
 */
axios.interceptors.response.use(response => {
  return response;
}, error => {
  let response;
  if(error.response){
    response = error.response;
  }else if(error.request){
    response = {status : 'NO_RESPONSE_RETURN', statusText : 'no response return', config : error.config};
  }else{
    response = {status : 'REQUEST_NOT_SEND', statusText : 'request not send', config : error.config};
  }
  return Promise.resolve(response);
});

/**
 * 处理http状态, 200之外的响应, 重写数据内容, code值为-99999
 * @param response
 * @returns {*}
 */
function handleHttpStatus(response) {
  if(response.status === 200){
    return response.data;
  }

  let message = 'request url: "' + response.config.url + '", http status: ' + response.status + ', status text: "' + response.statusText + '"';
  message += response.data ? (', response data: "' + response.data + '"') : ''
  return {
    code : -99999,
    message : message
  };
}

/**
 * 处理系统异常code状态
 * @param data
 * @returns {*}
 */
function handleErrorCode(data) {
  if(data.code<0 || data._code > 0){
   // this.$utilDialog.likeAlert(data.message)
    alert(data.errorMessage);
    console.log("系统错误, code: [" + data.code + "], message: [" + data.message +"]");
    return;
  }
  return data;
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      url: url,

      data: qs.stringify(data),
      timeout: 2100000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(handleHttpStatus).then(handleErrorCode);
  },
  get(url, data) {
    return axios({
      method: 'get',
      url: url,
      params: data,
      timeout: 2100000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(handleHttpStatus).then(handleErrorCode);
  }
}
