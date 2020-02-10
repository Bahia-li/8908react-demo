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
import { reqAddProducts, reqUpdateProducts } from "$api";

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
class productForm extends Component {
  componentDidMount() {
    //判断是否存在数据再去发送请求
    if (!this.props.categories.length) {
      this.props.getCategoryListAsync();
    }
  }

  //定义一个状态，判断是添加界面还是修改界面
  isAddProduct = () => {
    //判断路径是否update
    return this.props.location.pathname.indexOf("/update") === -1;
  };

  //显示分类列表信息默认值方法
  handleCategoryId = isAddProduct => {
    if (isAddProduct) {
      return "0";
    }

    const {
      categories,
      location: {
        state: { categoryId }
      }
    } = this.props;

    //判断分类id是否存在，存在这返回
    const category = categories.find(categor => {
      return categor._id === categoryId;
    });

    if (category) {
      return categoryId;
    } else {
      return "0";
    }
  };

  //表单提交事件
  submit = e => {
    //表单重置
    e.preventDefault();

    //接受返回的状态是修改的状态还是添加的状态
    const isAddProduct = this.isAddProduct();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { name, desc, categoryId, price, detail } = values;
        let primase = "";
        if (isAddProduct) {
          //添加状态
          primase = reqAddProducts({
            categoryId,
            name,
            desc,
            price,
            detail: detail.toHTML()
          });
        } else {
          //获取product的id
          const productId = this.props.match.params.id;
          //修改的状态
          primase = reqUpdateProducts({
            productId,
            categoryId,
            name,
            desc,
            price,
            detail: detail.toHTML()
          });
        }

        primase
          .then(() => {
            message.success(isAddProduct ? "添加" : "修改" + "商品成功!");
            //跳转界面
            this.props.history.push("/product");
          })
          .catch(err => {
            message.error(err);
          });
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
      categories,
      location: { state } //获取product的值
    } = this.props;

    const isAddProduct = this.isAddProduct();

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
            {isAddProduct ? "添加" : "修改"}
            商品
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
              ],
              initialValue: isAddProduct ? "" : state.name
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述"
                }
              ],
              initialValue: isAddProduct ? "" : state.desc
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("categoryId", {
              rules: [
                {
                  required: true,
                  message: "请输入商品分类"
                }
              ],
              //handleCategoryId
              initialValue: this.handleCategoryId(isAddProduct)
            })(
              <Select placeholder="请输入商品分类">
                <Option key="0" value="0">
                  暂无分类
                </Option>
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
              ],
              initialValue: isAddProduct ? "" : state.price
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
              ],
              /* 
                BraftEditor组件添加默认值
                BraftEditor.createEditorState(state.detail)
               */
              initialValue: isAddProduct
                ? ""
                : BraftEditor.createEditorState(state.detail)
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

export default productForm;
