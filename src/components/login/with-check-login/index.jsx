/**
 * 用来检测登录的高阶组件
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function wothCheckLogin(WrappedComponent) {
  @connect(state => ({ user: state.user }), null)
  class CheckLogin extends Component {
    //给组件定义名字
    static displayName = `checkLogin(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      Component})`;
    render() {
      const {
        user: { token },
        location: { pathname }
      } = this.props;

      //跳转网址方式
      // Redirect 用于render方法中
      // this.props.history.push/replace 用于非render方法中

      //判断是否存在token

      if (token) {
        //判断是否登录过
        if (pathname === "/login") {
          //跳转路径到主界面
          return <Redirect to="/" />;
        }
      } else {
        console.log("主页");
        //没有登录
        if (pathname === "/") {
          //跳转路径到登录界面
          return <Redirect to="/login" />;
        }
      }
      return <WrappedComponent {...this.props} />;
    }
  }
  return CheckLogin;
}
