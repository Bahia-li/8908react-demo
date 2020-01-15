import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Icon, Modal } from "antd";
import screenfull from "screenfull";

import { injectIntl, FormattedMessage } from "react-intl";
import HeaderData from "./header-data";

import "./css/header-main.less";
import { removeItem } from "../../../utils/storage";
import { removeUser, changeLanguage } from "$redux/actions";
import menus from "$conf/menus";

@injectIntl
@withRouter
@connect(
  state => ({
    username: state.user.user && state.user.user.username,
    language: state.language
  }),
  {
    removeUser,
    changeLanguage
  }
)
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
    //清除定时器  防止内存泄漏
  };

  //清除声明周期，防止内存泄漏
  componentWillUnmount = () => {
    screenfull.off("change", this.handleScreenFullChange);
    clearInterval(this.interid);
  };

  logout = () => {
    const { intl } = this.props;
    //显示对话框
    Modal.confirm({
      title: intl.formatMessage({ id: "logout" }),
      onOk: () => {
        //清空数据
        removeItem("user");
        this.props.removeUser();
        //跳转到Login
        this.props.history.replace("/login");
      }
    });
  };

  changeLanguage = () => {
    const language = this.props.language === "en" ? "zh-CN" : "en";
    this.props.changeLanguage(language);
  };

  findTitle = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      //判断是否存在二级菜单
      if (menu.children) {
        for (let index = 0; index < menu.children.length; index++) {
          const cMune = menu.children[index];
          if (cMune.path === pathname) {
            return cMune.title;
          }
        }
      } else {
        //一级菜单
        if (menu.path === pathname) {
          return menu.title;
        }
      }
    }
  };

  render() {
    const { isFullscreen } = this.state;

    const {
      username,
      language,
      location: { pathname }
    } = this.props;

    const title = this.findTitle(menus, pathname);

    return (
      //头部导航
      <div className="header-mian">
        {/* 头部 */}
        <div className="header-mian-top">
          <Button size="small" onClick={this.handelScreenFull}>
            {/* 缩放图标 */}
            <Icon type={isFullscreen ? "fullscreen-exit" : "fullscreen"}></Icon>
          </Button>
          <Button
            className="header-main-lang"
            size="small"
            onClick={this.changeLanguage}
          >
            {language === "en" ? "中文" : "English"}
          </Button>
          <span>hello,{username}</span>
          <Button size="small" type="link" onClick={this.logout}>
            退出
          </Button>
        </div>
        {/* 脚部 */}
        <div className="header-main-bottom">
          <span className="header-main-left">
            <FormattedMessage id={title} />
          </span>
          <HeaderData />
        </div>
      </div>
    );
  }
}

export default HeaderMain;
