import { combineReducers } from "redux";
import { SAVE_USER,REMOVE_USET } from "./action-types";
import { getItem } from "../utils/storage";

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
export default combineReducers({
  user
});
