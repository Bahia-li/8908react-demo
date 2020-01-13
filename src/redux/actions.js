/**
 * 定义工厂函数
 * 实现各种功能的模块
 * 同步请求 action
 * 一部请求 action
 */

import { reqLogin } from "../api/index";
import { setItem } from "../utils/storage";
import { SAVE_USER } from "./action-types";
import { dispatch } from "rxjs/internal/observable/range";

const saveUser = user => ({ type: SAVE_USER, data: user });

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
