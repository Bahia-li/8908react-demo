import Home from "../components/home";
import Category from "../components/category";
import Product from "../components/product";
import AddProduct from "../components/product/add-product";

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
    component: AddProduct, //添加商品
    exact: true
  }
];

export default routes;
