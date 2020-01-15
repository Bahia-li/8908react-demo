/**
 * 定义工厂函数
 * 实现各种功能的模块
 * 同步请求 action
 * 一部请求 action
 */

import {
  reqLogin,
  reqGetCategoryList
} from "../api/index";
import {
  setItem
} from "../utils/storage";
import {
  SAVE_USER,
  REMOVE_USET,
  CHANGE_ANGUAGE,
  GET_CATEGOR_YLIST
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