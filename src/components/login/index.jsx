import React, { Component } from "react";
import { Form, Input, Button, Icon } from "antd";

import logo from "./img/logo.png";
import "./css/login.less";

@Form.create()
class Login extends Component {
  //正则
  /**
   * rule 获取表当key
   * value 表单数据
   * callback 验证成功 不传参数 验证失败：传验证失败信息
   */
  validator = (rule, value, callback) => {
    //获取表单名 判断是否是username或者值password
    const name = rule.field === "username" ? "用户名" : "密码";
    //正则规则
    const reg = /^\w+$/;
    //验证规则
    if (!value) {
      callback(`${name}不能为空`);
    } else if (value.length < 4) {
      callback(`${name}必须大于4位`);
    } else if (value.length > 15) {
      callback(`${name}必须小于15位`);
    } else if (!reg.test(value)) {
      //test 正则验证方法
      callback(`${name}只能包含英文、数字、下划线`);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：111111后台管理系统</h1>
        </header>
        <section className="login-section">
          <h3>用户登录</h3>
          <Form className="login-form">
            <Form.Item className="login-username">
              {getFieldDecorator("username", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item className="login-btn">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default Login;
