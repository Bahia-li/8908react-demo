import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Icon, Modal } from "antd";
import screenfull from "screenfull";

import "./css/header-main.less";
import { removeItem } from "../../../utils/storage";
import { removeUser } from "$redux/actions";

@withRouter
@connect(state => ({ username: state.user.user && state.user.user.username }), {
  removeUser
})
class HeaderMain extends Component {
  state = {
    isFullscreen: false
  };
  //实现屏幕缩放方法
  handelScreenFull = () => {
    //实现屏幕缩放大小
    screenfull.toggle();
  };

  componentWillMount = () => {
    screenfull.on("change", this.handleScreenFullChange);
  };

  //定义方法修改放大和缩小的状态
  handleScreenFullChange = () => {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
  };

  //清除声明周期，防止内存泄漏
  componentWillUnmount = () => {
    screenfull.off("change", this.handleScreenFullChange);
  };

  logout = () => {
    //显示对话框
    Modal.confirm({
      title: "您确定退出？",
      onOk: () => {
        //清空数据
        removeItem("user");
        this.props.removeUser();
        //跳转到Login
        this.props.history.replace("/login");
      }
    });
  };

  render() {
    const { isFullscreen } = this.state;

    return (
      //头部导航
      <div className="header-mian">
        {/* 头部 */}
        <div className="header-mian-top">
          <Button size="small" onClick={this.handelScreenFull}>
            {/* 缩放图标 */}
            <Icon type={isFullscreen ? "fullscreen-exit" : "fullscreen"}></Icon>
          </Button>
          <Button className="header-main-lang" size="small">
            English
          </Button>
          <span>hello,{this.props.username}</span>
          <Button size="small" type="link" onClick={this.logout}>
            退出
          </Button>
        </div>
        {/* 脚部 */}
        <div className="header-main-bottom">
          <span className="header-main-left">商品管理</span>
          <span className="header-main-right">2020/01/14 15:58:37</span>
        </div>
      </div>
    );
  }
}

export default HeaderMain;
