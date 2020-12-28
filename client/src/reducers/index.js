import { combineReducers } from "redux";
// Reducers
import { groupReducer } from "./groupReducer";
import { authReducer } from './authReducer';
export default combineReducers({
  groupReducer,
  authReducer
});
