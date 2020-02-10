import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menus from "$conf/menus"; //国际化
import { FormattedMessage } from "react-intl";

const { Item } = Form;
const { TreeNode } = Tree;

@Form.create()
class RoleUpdateForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  };
  renderTreeNodes = menus => {
    return menus.map(item => {
      //判断是否存在子节点
      //如果存在子组件，在递归遍历
      if (item.children) {
        return (
          <TreeNode
            title={<FormattedMessage id={item.title} />}
            key={item.path}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      //没有子组件的
      return (
        <TreeNode
          title={<FormattedMessage id={item.title} />}
          key={item.path}
        />
      );
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
      role
    } = this.props;
    return (
      <Form>
        <Item label="角色名称">
          {getFieldDecorator("name", { initialValue: role.name })(
            <Input disabled />
          )}
        </Item>
        <Item>
          {getFieldDecorator("menus", {
            trigger: "onCheck",
            valuePropName: "checkedKeys",
            initialValue: role.menus
          })(
            <Tree checkable={true} defaultExpandAll>
              <TreeNode title="平台权限" key="0">
                {this.renderTreeNodes(menus)}
              </TreeNode>
            </Tree>
          )}
        </Item>
      </Form>
    );
  }
}
export default RoleUpdateForm;
