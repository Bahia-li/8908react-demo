import React, { Component } from "react";
import { Table, Button, Icon, Card, Modal, message } from "antd";
import { connect } from "react-redux";

import AddCategotyFrom from "./add-categoty-from";

import {
  getCategoryListAsync,
  addCategotyAsync,
  deleteCategotyAsync,
  updateCategoryAsync
} from "$redux/actions";

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync,
  addCategotyAsync,
  deleteCategotyAsync,
  updateCategoryAsync
})
class Category extends Component {
  //生命周期函数(执行一次)
  componentDidMount() {
    //调用请求数据的方法
    this.props.getCategoryListAsync();
  }

  //定义展示对话款状态
  state = {
    isShowAddCategory: false, //对话框显示状态
    categoryName: "",
    categorys: {} //_id,name 给修改分类列表或者删除分类列表提供参数
  };
  //取消对话款方法
  handleHideCancel = () => {
    //清空表单数据
    this.addCategotyFrom.props.form.resetFields();
    this.setState({
      isShowAddCategory: false
    });
  };

  //定义table表头信息
  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      // dataIndex: "operation",
      render: categorys => {
        return (
          <div>
            {/* <Button type="like" onClick={this.updateAddCategoty(categorys)}> */}
            <Button type="like" onClick={this.showCategoryModel(categorys)}>
              修改分类
            </Button>
            <Button type="like" onClick={this.deleAddCategoty(categorys)}>
              删除分类
            </Button>
          </div>
        );
      }
    }
  ];

  /*   //展开对话框
  handleAddCategory = () => {
    this.setState({
      isShowAddCategory: true
    });
  }; */

  //定义公共方法管理添加分类数据和修改数据
  showCategoryModel = (categorys = {}) => {
    return () => {
      this.setState({
        isShowAddCategory: true,
        categorys
      });
    };
  };

  //删除列表单方法
  deleAddCategoty = categorys => {
    // deleteCategotyAsync();
    return () => {
      Modal.confirm({
        title: `您确定要删除${categorys.name}分类数据吗？`,
        onOk: () => {
          this.props
            .deleteCategotyAsync(categorys._id)
            .then(() => {
              message.success("删除成功！");
            })
            .catch(err => {
              message.error(err);
            });
        },
        okText: "确认",
        cancelText: "取消"
      });
    };
  };

  //puppeteer
  //添加列表单方法
  //1.表单验证
  //2.获取表单数据 通过from获取
  //3.发送请求
  //4.请求成功或者失败给出响应的提示 并更新页面状态
  setCategory = () => {
    const { validateFields, resetFields } = this.addCategotyFrom.props.form;
    const {
      categorys: { name, _id }
    } = this.state;
    //校验并获取一组输入域的值与Error
    validateFields((err, values) => {
      if (!err) {
        const { categoryName } = values;
        let promise = null;

        if (!name) {
          //添加分类数据
          promise = this.props.addCategotyAsync(categoryName);
        } else {
          //更新分类数据
          promise = this.props.updateCategoryAsync(_id, categoryName);
        }

        promise
          .then(() => {
            //显示添加状态
            message.success(`${name ? "修改" : "添加"}成功！`);
            //清除表单
            resetFields();
            //隐藏对话框
            this.handleHideCancel();
          })
          .catch(err => {
            message.errot(err);
          });
      }

      /*  //成功
      if (!err) {
        const { categoryName } = values;
        console.log(categoryName);

        //实行添加方法
        this.props
          .addCategotyAsync(categoryName) //发送请求 添加数据 categoryName:分类名称
          .then(() => {
            //显示添加状态
            message.success("添加成功！");
            //清除表单
            resetFields();
            //隐藏对话框
            this.handleHideCancel();
          })
          .catch(err => {
            message.errot(err);
          });
      } */
    });
  };

  render() {
    //获取请求的数据
    const { categories } = this.props;
    const { isShowAddCategory, categorys } = this.state;
    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary" onClick={this.showCategoryModel()}>
            <Icon type="plus" />
            分类列表
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          rowKey="_id"
          pagination={{
            //分页
            defaultPageSize: 3,
            pageSizeOptions: ["3", "6", "9"],
            showQuickJumper: true,
            showSizeChanger: true
          }}
        />

        <Modal
          title={categorys.name ? "修改分类" : "添加分类"}
          visible={isShowAddCategory}
          onOk={this.setCategory}
          onCancel={this.handleHideCancel}
          width={300}
        >
          <AddCategotyFrom
            categoryName={categorys.name}
            wrappedComponentRef={form => (this.addCategotyFrom = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;
