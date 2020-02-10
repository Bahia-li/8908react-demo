import Home from "../components/home";
import Category from "../components/category";
import Product from "../components/product";
import productForm from "../components/product/product-form";
import productDetail from "../components/product/product-detail";
import Role from "../components/role";

//把页面功能组件封装在一起

const routes = [
  {
    path: "/",
    component: Home, //首页
    exact: true
  },
  {
    path: "/category",
    component: Category, //分类管理
    exact: true
  },
  {
    path: "/product",
    component: Product, //商品管理
    exact: true
  },
  {
    path: "/product/add",
    component: productForm, //添加商品
    exact: true
  },
  {
    path: "/product/update/:id",
    component: productForm, //添加商品
    exact: true
  },
  {
    path: "/product/:id",
    component: productDetail, //商品详情
    exact: true
  },
  {
    path: "/role",
    component: Role, //权限管理
    exact: true
  }
];

export default routes;
