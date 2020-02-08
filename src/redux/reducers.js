import {
  combineReducers
} from "redux";
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
import {
  getItem
} from "../utils/storage";

const initUser = getItem("user") || {};

function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVE_USER:
      return action.data;
    case REMOVE_USET:
      return {};
    default:
      return prevState;
  }
}

//设置默认值
const initLanguage = navigator.language || navigator.languages[0] || 'zh-CN'
//返回登录数据
function language(prevState = initLanguage, action) {
  switch (action.type) {
    case CHANGE_ANGUAGE:
      return action.data;
    default:
      return prevState;
  }
}

//设置请求列表初始值
const initCategories = [];

//返回请求列表的数据
function categories(prevState = initCategories, action) {
  switch (action.type) {
    case GET_CATEGOR_YLIST:
      return action.data;
    case ADD_CATEGOR_CATEGOTY:
      return [...prevState, action.data]; //拼接旧的数据和新的数据 不改变原来的数组
    case DELETE_CATEGOR_CATEGOTY: //返回删除分类的数据
      return prevState.filter(categors => categors._id !== action.data);
    case UPDAYE_CATEGOR_CATEGOTY:
      return prevState.map(categors => {
        if (categors._id === action.data._id) {
          return action.data
        }
        return categors
      })
    default:
      return prevState;
  }
}

const initPriducts = [];

function products(prevState = initPriducts, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.data
    case SET_SEARCH_PRODUCT:
      return action.data
    default:
      return prevState
  }
}

//向外暴露
export default combineReducers({
  user,
  language,
  categories,
  products
});