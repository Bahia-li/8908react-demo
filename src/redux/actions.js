/**
 * 定义工厂函数
 * 实现各种功能的模块
 * 同步请求 action
 * 一部请求 action
 */

import {
  reqLogin,
  reqGetCategoryList,
  reqAddCategory,
  reqDeleteCategory,
  reqUpdateCategory,
  reqSetProductList,
  reqSearchProducts
} from "../api/index";
import {
  setItem
} from "../utils/storage";
import {
  SAVE_USER,
  REMOVE_USET,
  CHANGE_ANGUAGE,
  GET_CATEGOR_YLIST,
  ADD_CATEGOR_CATEGOTY,
  DELETE_CATEGOR_CATEGOTY,
  UPDAYE_CATEGOR_CATEGOTY,
  SET_PRODUCT,
  SET_SEARCH_PRODUCT
} from "./action-types";

export const changeLanguage = lang => ({
  type: CHANGE_ANGUAGE,
  data: lang
})

const saveUser = user => ({
  type: SAVE_USER,
  data: user
});

export const removeUser = () => ({
  type: REMOVE_USET
})

export const saveUserAsync = (username, password) => {
  return dispatch => {
    return reqLogin(username, password).then(response => {
      //存储数据:loaclStorage 和 redux
      setItem("user", response);
      //触发更新
      dispatch(saveUser(response));
    });
  };
};

const getCategoryList = categories => ({
  type: GET_CATEGOR_YLIST,
  data: categories
});

//请求获取分类数据
export const getCategoryListAsync = () => {
  return dispatch => {
    //调用请求方法发送请求
    reqGetCategoryList().then(response => {
      //触发更新
      dispatch(getCategoryList(response))
    })
  }
}

const addCategoty = categotys => ({
  type: ADD_CATEGOR_CATEGOTY,
  data: categotys
});

export const addCategotyAsync = (categoryName) => {
  return dispatch => {
    //调用请求方法发送请求
    return reqAddCategory(categoryName).then(response => {
      //触发更新
      dispatch(addCategoty(response))
    })
  }
}
const deleteCategoty = categotys => ({
  type: DELETE_CATEGOR_CATEGOTY,
  data: categotys
});

//删除分类方法
export const deleteCategotyAsync = (categoryId) => {

  return dispatch => {
    //调用请求方法发送请求
    return reqDeleteCategory(categoryId).then(response => {
      //触发更新
      dispatch(deleteCategoty(response))
    })
  }
}

//定义本地更新状态
const updateCategoty = categotys => ({
  type: UPDAYE_CATEGOR_CATEGOTY,
  data: categotys
});


//更新分类方法发送请求
export const updateCategoryAsync = (categoryId, categoryName) => {
  return dispatch => {
    //调用请求方法发送请求
    return reqUpdateCategory(categoryId, categoryName).then(response => {
      //触发更新
      dispatch(updateCategoty(response))
    });
  }
}

const setProduct = product => ({
  type: SET_PRODUCT,
  data: product
});

//查询商品列表
export const setProductAsync = (pageNum, pageSize) => {
  return dispatch => {
    //调用请求方法发送请求
    return reqSetProductList(pageNum, pageSize).then(response => {
      //触发更新
      dispatch(setProduct(response))
    })
  }
}

const setSearchProduct = product => ({
  type: SET_SEARCH_PRODUCT,
  data: product
});

//搜索商品分页列表
export const setSearchProducts = (pageNum, pageSize, searchName, searchType) => {

  return dispatch => {
    //调用请求方法发送请求
    return reqSearchProducts(pageNum, pageSize, searchName, searchType).then(response => {
      //触发更新
      dispatch(setSearchProduct(response))
    })
  }
}