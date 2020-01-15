import React, { Component } from "react";
import { Layout, Breadcrumb } from "antd";
import { FormattedMessage } from "react-intl";

import logo from "../../assets/imgs/logo.png";
import "./css/layout.less";
import LeftNav from "./left-nav";
import HeaderMian from "./header-main";
import WithCheckCogin from "$conw/with-check-login";

const { Header, Content, Footer, Sider } = Layout;
@WithCheckCogin
class BasitLayout extends Component {
  state = {
    collapsed: false,
    isDisplay: true //定义标题文字缩进状态
  };

  onCollapse = collapsed => {
    const { isDisplay } = this.state;
    this.setState({
      collapsed,
      isDisplay: !isDisplay
    });
  };

  render() {
    const { isDisplay, collapsed } = this.state;
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            <h3 style={{ display: isDisplay ? "block" : "none" }}>
              <FormattedMessage id="title" />
            </h3>
          </div>

          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0, height: 80 }}>
            <HeaderMian />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "30px 0" }}></Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasitLayout;
