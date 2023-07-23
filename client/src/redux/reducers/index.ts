import auth from "./auth";
import cart from "./cart";
import notification from "./notification";
import { combineReducers } from "redux";

export default combineReducers({
  auth,
  cart,
  notification
});
