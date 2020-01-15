import Home from "../components/home";
import Category from "../components/category";

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
  }
];

export default routes;
