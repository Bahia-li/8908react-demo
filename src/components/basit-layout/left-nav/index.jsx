import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import munes from "$conf/menus";

const { SubMenu, Item } = Menu;

@withRouter
class LeftNav extends Component {
  crateMenus = munes => {
    return munes.map(mune => {
      //判断是否存在二级菜单
      if (mune.children) {
        return (
          <SubMenu
            key={mune.path}
            title={
              <span>
                <Icon type={mune.icon} />
                <span>
                  <FormattedMessage id={mune.title} />
                </span>
              </span>
            }
          >
            {mune.children.map(sMune => this.crateMenuItem(sMune))}
          </SubMenu>
        );
      } else {
        // 如果不存在二级菜单，则直接返回
        return this.crateMenuItem(mune);
      }
    });
  };

  /**
   * 创建导航列表
   */
  crateMenuItem = mune => {
    return (
      <Item key={mune.path}>
        <Link to={mune.path}>
          <span>
            <Icon type={mune.icon} />
            <span>
              <FormattedMessage id={mune.title} />
            </span>
          </span>
        </Link>
      </Item>
    );
  };

  findOpenKeys = (pathname, munes) => {
    const mune = munes.find(mune => {
      //判断如果存在子节点
      // if (mune.children) {
      //   return mune.children.find(cMune => cMune.path === pathname);
      // }

      //与运算 如果
      return (
        mune.children && mune.children.find(cMune => cMune.path === pathname)
      );
    });

    if (mune) {
      return mune.path;
    }
  };

  render() {
    //获取url 路径 这里需要用到withRouter
    //withRouter 给组件添加三大属性
    //获取pathname值
    let { pathname } = this.props.location;

    //pathname可能存在product/add 如果包含product 修改成product
    if (pathname.indexOf("/product") !== -1) {
      pathname = "/product";
    }

    //获取findOpenKeys返回来的对象
    const openKey = this.findOpenKeys(pathname, munes);

    return (
      /**
       * defaultSelectedKeys  初始选中的菜单项 key 数组
       * defaultOpenKeys      初始展开的 SubMenu 菜单项 key 数组
       */
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[openKey]}
        mode="inline"
      >
        {this.crateMenus(munes)}
      </Menu>
    );
  }
}

export default LeftNav;
