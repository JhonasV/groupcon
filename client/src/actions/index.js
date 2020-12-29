import {
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_PENDING,
  FETCH_GROUPS_ERROR,
  DELETE_GROUPS_SUCCESS,
  DELETE_GROUPS_PENDING,
  DELETE_GROUPS_ERROR,
  FETCH_USER_GROUPS_SUCCESS,
  FETCH_USER_GROUPS_PENDING,
  FETCH_USER_GROUPS_ERROR,
  CREATE_GROUPS_SUCCESS,
  CREATE_GROUPS_PENDING,
  CREATE_GROUPS_ERROR,
  CLEAR_CREATE_MESSAGES
} from "./types";

import Axios from "axios";

export const createGroup = (values) => async dispatch => {
  try {
    let response = await Axios.post("/api/v1/group", values);
    if(response.status === 200){

    
    dispatch({type: CREATE_GROUPS_SUCCESS, payload: response.data});
    dispatch({type: CREATE_GROUPS_PENDING, payload: false});
  }else{
    dispatch({type: CREATE_GROUPS_ERROR, payload: response.data.error});
  }
  } catch (error) {
    dispatch({type: CREATE_GROUPS_ERROR, payload: error.response});
  }


 
}

export const clearCreateMessages = () => async dispatch => {
  dispatch({ type: CLEAR_CREATE_MESSAGES, payload: "" })
}

export const fetchGroups = () => async dispatch => {
  try {
    const response = await Axios.get("/api/v1/group");
    dispatch({ type: FETCH_GROUPS_SUCCESS, payload: response.data });
    dispatch({ type: FETCH_GROUPS_PENDING, payload: false });
  } catch (error) {
    dispatch({ type: FETCH_GROUPS_ERROR, payload: error });
  }
};

export const deleteGroup = id => async dispatch => {
  dispatch({ type: DELETE_GROUPS_PENDING, payload: true });
  try {
    const response = await Axios.delete(`/api/v1/group/${id}`);
    if (response.status === 200)
      dispatch({ type: DELETE_GROUPS_SUCCESS, payload: {isDeleted: response.data, id} });
  } catch (error) {
    dispatch({ type: DELETE_GROUPS_ERROR, payload: error });
  }
  dispatch({ type: DELETE_GROUPS_PENDING, payload: false });
};

export const getUserGroups = currentUserId => async dispatch => {
  //   dispatch({ type: FETCH_USER_GROUPS_PENDING, payload: true });
  if (currentUserId === null) return;
  try {
    let response = await Axios(`/api/v1/${currentUserId}/groups`);
    if (response.status === 200)
      dispatch({ type: FETCH_USER_GROUPS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_GROUPS_ERROR, payload: error });
  }
  dispatch({ type: FETCH_USER_GROUPS_PENDING, payload: false });
};
