//请求头
import axiosInstance from './request';

//请求登录
export const reqLogin = (username, password) => {
  return axiosInstance({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password
    }
  });
};

//请求获取分类数据
export const reqGetCategoryList = () => {
  return axiosInstance({
    url: '/category/get', //请求路径
    method: 'GET' //请求方式
  })
}
