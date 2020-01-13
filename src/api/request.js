/**
 * 封装axios
 */

import axios from 'axios';
import errCode from '../config/error-code';
import {
  config
} from 'rxjs';

//创建axios实例
const axiosInstance = axios.create({
  baseURL: '/api', //公共请求资源路径
  timeout: 2000, //请求超时时间
  headers: {
    //公共请求头参数
  }
});

//请求拦截器
axiosInstance.interceptors.request.use(config => {
  //token
  let token = '';

  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  //判断是否是post 请求
  //处理JSON 格式数据
  if (config.method === 'post') {
    config.data = Object.keys(config.data)
      .reduce((prev, curr) => {
        prev += `&${curr}=${config.data[curr]}`
        return prev;
      }, '').slice(1);
    config.headers['content-type'] = 'application/x-www-form-urlencoded';
  }
  return config;
});

//响应拦截器
axiosInstance.interceptors.response.use(

  response => {
    /**
     * status判断响应是否成功
     * response.data.status === 0 成功
     * response.data.status === 1 失败
     */

    if (response.data.status === 0) {
      //成功返回成功的数据(状态为成功的状态)
      return response.data.data
    } else {
      //返回失败的状态并返回失败的提示
      Promise.reject(response.data.msg)
    }
  },
  err => {
    //错误原因
    let errMsg = '';

    if (err.response) {
      //接受到响应,但是接受回来的是失败的响应
      //根据响应状态码判断错误类型
      errMsg = errCode[err.response.status];
    } else {
      //没有接受到响应
      if (err.message.indexOf('Network Error')) {
        errMsg = '网络连接失败，请重新连接网络试试';
      } else if (err.message.indexOf('timeout') !== -1) {
        errMsg = '网络连接超时，请连上wifi试试';
      }
    }
    return Promise.reject(errMsg || '发生未知错误,请联系管理员！');
  });

export default axiosInstance;