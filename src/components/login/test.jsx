import React from "react";
import axios from "axios";
import { message } from "antd";

export default function Test() {
  //配置axios拦截器

  const axiosInstance = axios.create({
    baseURL: "/api", //公共路径
    timeout: 20000, //请求超时时间
    headers: {
      //公共的请求头
      //参数必须写死
    }
  });

  //设置拦截器
  //请求拦截器(在发送请求前调用)
  axiosInstance.interceptors.request.use(config => {
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    //看接口是否有必须使用application/x-www-form-urlencoded'发送请求
    if (config.method === "post") {
      const keys = Object.keys(config.data);
      const data = keys
        .reduce((prev, curr) => {
          prev += `&${curr}=${config.data[curr]}`;
          return prev;
        }, "")
        .slice(1);
      config.data = data;
      config.headers["content-type"] = "application/x-www-form-urlencoded";
    }
    return config;
  });

  //响应拦截器
  //统一处理错误
  axiosInstance.interceptors.response.use(
    //请求响应成功
    response => {
      if (response.data.status === 0) {
        //功能成功
        return response.data.data;
      } else {
        // 功能失败,返回失败的promise状态
        return Promise.reject(response.data.msg);
      }
    },
    //请求响应失败
    err => {
      //定义不同的错误提示
      const errCode = {
        401: "没有权限访问当前接口",
        403: "禁止访问当前接口",
        404: "当前资源未找到",
        500: "服务器发生未知错误，请联系管理员"
      };

      let errMessage = "";

      if (err.response) {
        //根据响应的状态码判断错误
        errMessage = errCode[err.response.status];
      } else {
        //没有接受到响应，请求失败

        if (err.message.indexOf("Network Error") !== -1) {
          errMessage = "网络连接失败，请重连网络试试~";
        } else if (err.message.indexOf("timeout") !== -1) {
          errMessage = "网络超时，请连上wifi重试~";
        }
      }
      return Promise.reject(errMessage || "发生未知错误，请联系管理员");
    }
  );

  let token = '';
  let id = '';

  const handleClick1 =() =>{
    axiosInstance({
      method:'POST',
      url:'/login',
      data:{
        username:'admin',
        password:'admin'
      }
    }).then((response)=>{
        
    })
  }

  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  );
}
