import React, { Component } from "react";
import { Table, Button, Icon, Card, message, Select, Input } from "antd";
import { setProductAsync, setSearchProducts } from "$redux/actions";
import { connect } from "react-redux";

@connect(state => ({ products: state.products }), {
  setProductAsync,
  setSearchProducts
})
class Product extends Component {
  state = {
    productList: [],
    total: 0, //总数
    loading: false,
    searchName: "",
    searchType: "productName"
  };
  categories = [
    {
      name: 1111,
      desc: 2222,
      price: 99,
      category: 1
    }
  ];

  columns = [
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "商品描述",
      dataIndex: "desc"
    },
    {
      title: "商品价格",
      dataIndex: "price"
    },
    {
      title: "商品状态",
      dataIndex: "category",
      render: () => {
        return (
          <div>
            <Button type="primary">上架</Button>
            <span>已下架</span>
          </div>
        );
      }
    },
    {
      title: "操作",
      render: () => {
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
          </div>
        );
      }
    }
  ];
  getProductList = (pageNum, pageSize) => {
    const { searchName, searchType } = this.state;

    this.setState({
      loading: true
    });
    //判断分页是列表分页还是查询分页
    if (searchName) {
      this.props
        .setSearchProducts(pageNum, pageSize, searchName, searchType)
        .then(response => {
          this.setState({
            productList: this.props.products.list,
            total: this.props.products.total
          });
          message.success("获取商品列表数据成功！");
          this.setState({
            loading: false
          });
        })
        .catch(err => {
          message.error(err);
        });
    } else {
      this.props
        .setProductAsync(pageNum, pageSize)
        .then(response => {
          this.setState({
            productList: this.props.products.list,
            total: this.props.products.total
          });
          message.success("获取商品列表数据成功！");
          this.setState({
            loading: false
          });
        })
        .catch(err => {
          message.error(err);
        });
    }
  };

  addProduct = () => {
    this.props.history.push("/product/add");
  };

  componentDidMount() {
    this.getProductList(1, 3);
  }
  render() {
    const { productList, total, loading, searchName, searchType } = this.state;
    return (
      <Card
        title={
          <div>
            <Select
              defaultValue={searchType}
              onChange={value =>
                this.setState({
                  searchType: value
                })
              }
            >
              <Select.Option value="productName">根据商品名称</Select.Option>
              <Select.Option value="productDesc">根据商品描述</Select.Option>
            </Select>
            <Input
              placeholder="关键字"
              style={{ width: 200, margin: "0 10px" }}
              value={searchName}
              onChange={event =>
                this.setState({
                  searchName: event.target.value
                })
              }
            />
            <Button type="primary" onClick={() => this.getProductList(1, 3)}>
              搜索
            </Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.addProduct}>
            <Icon type="plus" />
            添加商品
          </Button>
        }
      >
        <Table
          loading={loading}
          columns={this.columns}
          dataSource={productList}
          bordered
          rowKey="_id"
          pagination={{
            //分页
            defaultPageSize: 3,
            pageSizeOptions: ["3", "6", "9"],
            showQuickJumper: true,
            showSizeChanger: true,
            total,
            onChange: this.getProductList,
            onShowSizeChange: this.getProductList
          }}
        />
      </Card>
    );
  }
}

export default Product;
