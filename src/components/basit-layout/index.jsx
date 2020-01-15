import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";

import logo from "../../assets/imgs/logo.png";
import "./css/layout.less";
import LeftNav from "./left-nav";
import HeaderMian from "./header-main";

const { Header, Content, Footer, Sider } = Layout;

export default class BasitLayout extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            <h3>硅谷管理</h3>
          </div>

          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0, height: 80 }}>
            <HeaderMian />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              Bill is a cat.
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
