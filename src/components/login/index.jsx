import React, { Component } from "react";
import { Form, Input, Button, Icon, message } from "antd";
import { connect } from "react-redux";

import { saveUserAsync } from "../../redux/actions.js";
import withCheckLogin from "./with-check-login";

import logo from "./img/logo.png";
import "./css/login.less";

@withCheckLogin
@connect(null, { saveUserAsync })
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
    } else {
      //验证成功 什么都不传 表示表单验证成功！
      callback();
    }
  };

  //定义提交方法
  handleSubmit = event => {
    //阻止默认行为
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;

        this.props
          .saveUserAsync(username, password)
          .then(() => {
            this.props.history.push("/");
          })
          .catch(msg => {
            message.error(msg);
            //清空密码数据
            this.props.form.resetFields(["password"]);
          });
        //axios请求登录 返回promise对象
        /*  axios
          //开启了代理服务proxy:'http://47.103.203.152'
          .post("/api/login", { username, password })
          .then(response => {
            console.log(response);
            //请求成功response.data.status === 0
            //请求失败 response.data.status === 1
            if (response.data.status === 0) {
              //请求成功 登陆成功 跳转到home界面
              this.props.history.push("/");
            } else {
              //请求成功 登录失败 给用户相应的提示(全局提示)
              message.error(response.data.msg);
              //清空密码
              this.props.form.resetFields(["password"]);
            }
          })
          .catch(err => {
            //请求失败 给出友好的提示
            message.error("网络错误");
            //清空密码
            this.props.form.resetFields(["password"]);
          }); */
      }
    });
    // const values = this.props.form.getFieldsValue();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div id="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目:后台管理系统</h1>
        </header>
        <section className="login-section">
          <h3>用户登录</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item className="login-username">
              {getFieldDecorator("username", {
                rules: [
                  {
                    validator: this.validator
                  }
                ],
                initialValue: "admin"
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
