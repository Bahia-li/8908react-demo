import React, { Component } from "react";
import { Table, Button, Icon, Card, Pagination } from "antd";
import { connect } from "react-redux";

import { getCategoryListAsync } from "$redux/actions";

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync
})
class Category extends Component {
  componentDidMount() {
    //调用请求数据的方法
    this.props.getCategoryListAsync();
  }

  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      dataIndex: "operation",
      render() {
        return (
          <div>
            <Button type="like">修改分类</Button>
            <Button type="like">删除分类</Button>
          </div>
        );
      }
    }
  ];

  render() {
    //获取请求的数据
    const { categories } = this.props;
    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary">
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
      </Card>
    );
  }
}

export default Category;
