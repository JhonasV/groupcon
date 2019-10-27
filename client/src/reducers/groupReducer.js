import {
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_ERROR,
  FETCH_GROUPS_PENDING,
  DELETE_GROUPS_SUCCESS,
  DELETE_GROUPS_ERROR,
  DELETE_GROUPS_PENDING,
  FETCH_USER_GROUPS_SUCCESS,
  FETCH_USER_GROUPS_PENDING,
  FETCH_USER_GROUPS_ERROR
} from "../actions/types";

const initState = {
  groups: [],
  userGroups: [],
  deleted: null,
  pending: true,
  error: false,
  message: ""
};
export const groupReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload.groups,
        latestGroups: action.payload.latestGroups
      };
    case FETCH_GROUPS_PENDING:
      return {
        ...state,
        pending: action.payload
      };
    case FETCH_GROUPS_ERROR:
      return {
        ...state,
        error: !state.error,
        message: action.payload
      };
    case DELETE_GROUPS_SUCCESS:
      return {
        ...state,
        deleted: action.payload,
        pending: false
      };

    case DELETE_GROUPS_PENDING:
      return {
        ...state,
        pending: action.payload
      };

    case DELETE_GROUPS_ERROR:
      return {
        ...state,
        error: !state.error,
        message: action.payload
      };
    case FETCH_USER_GROUPS_SUCCESS:
      return {
        ...state,
        userGroups: action.payload
      };
    case FETCH_USER_GROUPS_PENDING:
      return {
        ...state,
        pending: action.payload
      };
    case FETCH_USER_GROUPS_ERROR:
      return {
        ...state,
        error: !state.error,
        message: action.payload
      };

    default:
      return state;
  }
};
