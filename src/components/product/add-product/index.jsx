import React, { Component } from "react";
import {
  Card,
  Icon,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  message
} from "antd";
import BraftEditor from "braft-editor";
import { connect } from "react-redux";
import { getCategoryListAsync } from "$redux/actions";

import "braft-editor/dist/index.css";
import "./index.less";

const { Item } = Form;
const { Option } = Select;
@connect(
  state => ({
    categories: state.categories
  }),
  { getCategoryListAsync }
)
@Form.create()
class addProduct extends Component {
  componentDidMount() {
    //判断是否存在数据再去发送请求
    if (!this.props.categories.length) {
      this.props.getCategoryListAsync();
    }
  }

  //表单提交事件
  submit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  //回退
  showProduct = () => {
    console.log(this.props);
    this.props.history.push("/product");
  };

  render() {
    const {
      form: { getFieldDecorator },
      categories
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };

    return (
      <Card
        title={
          <div>
            <Icon
              type="arrow-left"
              className="go-back"
              onClick={this.showProduct}
            />
            添加商品
          </div>
        }
      >
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label="商品名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入商品名称"
                }
              ]
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述"
                }
              ]
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("categoryId", {
              rules: [
                {
                  required: true,
                  message: "请输入商品分类"
                }
              ]
            })(
              <Select placeholder="请输入商品分类">
                {categories.map(categor => {
                  return (
                    <Option key={categor._id} value={categor._id}>
                      {categor.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price", {
              rules: [
                {
                  required: true,
                  message: "请输入商品价格"
                }
              ]
            })(
              <InputNumber
                // defaultValue={1000}
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/￥\s?|(,*)/g, "")}
                className="product-price"
              />
            )}
          </Item>
          <Item label="商品详情" wrapperCol={{ span: 22 }}>
            {getFieldDecorator("detail", {
              rules: [
                {
                  required: true,
                  message: "请输入商品详情"
                }
              ]
            })(<BraftEditor className="product-detail" />)}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default addProduct;
