import React, { Component } from "react";
import { Table, Button, Icon, Card, message, Select, Input } from "antd";
import { getProductAsync, getSearchProducts } from "$redux/actions";
import { connect } from "react-redux";
import { reqUpdateProductStatus } from "$api";

@connect(state => ({ products: state.products }), {
  getProductAsync,
  getSearchProducts
})
class Product extends Component {
  state = {
    productList: [],
    total: 0, //总数
    loading: false,
    searchName: "",
    searchType: "productName",
    current: 1
  };

  //判断实例对象的属性
  isSearchValue = "";

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
      dataIndex: "price",
      render: price => {
        return `￥${price}`;
      }
    },
    {
      title: "商品状态",
      // dataIndex: "category",
      render: ({ _id, status }) => {
        /* 
          status 1：已下架
          status 2：已上架
        */
        if (status === 1) {
          return (
            <div>
              <Button
                type="primary"
                onClick={this.UpdateProductStatus(_id, status)}
              >
                上架
              </Button>
              <span>已下架</span>
            </div>
          );
        } else {
          return (
            <div>
              <Button
                type="primary"
                onClick={this.UpdateProductStatus(_id, status)}
              >
                下架
              </Button>
              <span>已上架</span>
            </div>
          );
        }
      }
    },
    {
      title: "操作",
      render: product => {
        return (
          <div>
            <Button type="link" onClick={this.showProduct(product)}>
              详情
            </Button>
            <Button type="link" onClick={this.showProduct(product, "update/")}>
              修改
            </Button>
          </div>
        );
      }
    }
  ];

  //更新商品状态方法
  UpdateProductStatus = (productId, status) => {
    return () => {
      const newStatus = 3 - status;
      reqUpdateProductStatus(productId, status).then(res => {
        //请求成功
        //更新状态数据
        this.setState({
          productList: this.state.productList.map(product => {
            if (product._id === productId) {
              return {
                // 展开对象：包含对象的所有属性
                ...product,
                //添加一个新的属性，覆盖旧的属性
                status: newStatus
              };
            }
            return product;
          })
        });
        message.success("更新状态数据成功！");
      });
    };
  };

  /*  //商品修改
  showUpdateProduct = product => {
    return () => {
      const id = product._id;
      //push 第二个参数是为了传参数给所跳转到的路径 product
      this.props.history.push("/product/update/" + id, product);
    };
  };

  //商品详情
  showProductDetail = product => {
    return () => {
      const id = product._id;
      //push 第二个参数是为了传参数给所跳转到的路径 product
      this.props.history.push("/product/detail/" + id, product);
    };
  }; */

  //封装商品详情和商品修改方法
  showProduct = (product, path = "") => {
    return () => {
      const id = product._id;
      //push 第二个参数是为了传参数给所跳转到的路径 product
      this.props.history.push("/product/" + path + id, product);
    };
  };

  //查询数据  普通查询和搜索查询
  getProductList = (pageNum, pageSize) => {
    //设置搜索状态为true
    this.setState({
      loading: true
    });

    const { isSearchValue } = this;
    const { searchType } = this.state;
    let promise = null;
    //判断isSearchValue是否有值，如果有值就是搜索查询，如果没有值就是普通查询
    if (isSearchValue) {
      promise = this.props.getSearchProducts({
        pageNum,
        pageSize,
        searchName: isSearchValue,
        searchType
      });
    } else {
      //普通查询
      promise = this.props.getProductAsync(pageNum, pageSize);
    }

    promise
      .then(res => {
        const products = this.props.products;
        this.setState({
          productList: products.list,
          total: products.total,
          searchName: isSearchValue,
          current: pageNum
        });
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };

  /*   getProductList = (pageNum, pageSize) => {
    const { searchName, searchType } = this.state;

    this.setState({
      loading: true
    });
    //判断分页是列表分页还是查询分页
    if (searchName) {
      this.props
        .getSearchProducts(pageNum, pageSize, searchName, searchType)
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
        .getProductAsync(pageNum, pageSize)
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
  }; */

  addProduct = () => {
    this.props.history.push("/product/add");
  };

  componentDidMount() {
    this.getProductList(1, 3);
  }

  //点击搜索按钮
  search = () => {
    const { searchName } = this.state;
    //点击搜索按钮 才给isSearchValue赋值
    this.isSearchValue = searchName;

    this.getProductList(1, 3);
  };
  render() {
    const {
      productList,
      total,
      loading,
      searchName,
      searchType,
      current
    } = this.state;
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
            <Button type="primary" onClick={this.search}>
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
            current,
            onChange: this.getProductList,
            onShowSizeChange: this.getProductList
          }}
        />
      </Card>
    );
  }
}

export default Product;
