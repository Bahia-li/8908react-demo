import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

@Form.create()
class AddCategotyFrom extends Component {
  static propTypes = {
    categoryName: PropTypes.string
  };
  render() {
    const {
      form: { getFieldDecorator },
      categoryName
    } = this.props;
    return (
      <Form>
        <Form.Item label="品类名称：">
          {/* 表单校验 */}
          {getFieldDecorator("categoryName", {
            rules: [
              {
                required: true,
                message: "请输入分类名称!"
              }
            ],
            initialValue: categoryName //设置表单初始值
          })(<Input placeholder="请输入分类名称" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default AddCategotyFrom;
