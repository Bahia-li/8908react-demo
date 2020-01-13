import { combineReducers } from "redux";
import { SAVE_USER } from "./action-types";
import { getItem } from "../utils/storage";

const initUser = getItem("user") || {};
function user(prevState = initUser, action) {
  switch (action.typ) {
    case SAVE_USER:
      return action.data;
    default:
      return prevState;
  }
}
export default combineReducers({
  user
});
