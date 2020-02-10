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

//请求添加分类
export const reqAddCategory = (categoryName) => {
  return axiosInstance({
    url: '/category/add', //请求路径
    method: 'POST', //请求方式
    data: {
      categoryName
    }
  })
}

//请求删除分类
export const reqDeleteCategory = (categoryId) => {
  return axiosInstance({
    url: '/category/delete', //请求路径
    method: 'POST', //请求方式
    data: {
      categoryId
    }
  })
}

//定义修改分类数据
//请求删除分类
export const reqUpdateCategory = (categoryId, categoryName) => {
  return axiosInstance({
    url: '/category/update', //请求路径
    method: 'POST', //请求方式
    data: {
      categoryId,
      categoryName
    }
  })
}

//查询商品信息
export const reqSetProductList = (pageNum, pageSize) => {
  return axiosInstance({
    url: '/product/list', //请求路径
    method: 'GET', //请求方式
    params: {
      pageNum,
      pageSize
    }
  })
}

//搜索商品分页列表
//searchType 定义为参数的类型：productName || productDesc
//searchName 参数
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType
}) => {
  return axiosInstance({
    url: '/product/search', //请求路径
    method: 'GET', //请求方式
    params: {
      pageNum,
      pageSize,
      [searchType]: searchName
    }
  })
}

//添加商品/api/product/add
export const reqAddProducts = ({
  categoryId,
  name,
  price,
  desc,
  detail
}) => {
  return axiosInstance({
    url: '/product/add', //请求路径
    method: 'POST', //请求方式
    data: {
      categoryId,
      name,
      price,
      desc,
      detail
    }
  })
}

//修改商品的方法
export const reqUpdateProducts = ({
  productId,
  categoryId,
  name,
  price,
  desc,
  detail
}) => {
  return axiosInstance({
    url: '/product/update', //请求路径
    method: 'POST', //请求方式
    data: {
      productId,
      categoryId,
      name,
      price,
      desc,
      detail
    }
  })
}

//请求单个商品数据
export const reqGetProduct = (productId) => {
  return axiosInstance({
    url: '/product/get', //请求路径
    method: 'GET', //请求方式
    params: {
      productId
    }
  })
}

//更新商品状态
export const reqUpdateProductStatus = (productId, status) => {
  return axiosInstance({
    url: '/product/update/status', //请求路径
    method: 'POST', //请求方式
    data: {
      productId,
      status
    }
  })
}

//获取角色数据
export const reqGetRoleList = () => {
  return axiosInstance({
    url: '/role/get', //请求路径
    method: 'GET', //请求方式
    params: {}
  })
}

//添加角色
export const reqAddRole = (name) => {
  return axiosInstance({
    url: '/role/add', //请求路径
    method: 'POST', //请求方式
    data: {
      name
    }
  })
}

//更新角色
export const reqUpdateRole = ({
  roleId,
  authName,
  menus
}) => {
  return axiosInstance({
    url: '/role/update', //请求路径
    method: 'POST', //请求方式
    data: {
      roleId,
      authName,
      menus
    }
  })
}