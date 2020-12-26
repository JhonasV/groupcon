import {
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_ERROR,
  FETCH_GROUPS_PENDING,
  DELETE_GROUPS_SUCCESS,
  DELETE_GROUPS_ERROR,
  DELETE_GROUPS_PENDING,
  FETCH_USER_GROUPS_SUCCESS,
  FETCH_USER_GROUPS_PENDING,
  FETCH_USER_GROUPS_ERROR,
  CREATE_GROUPS_SUCCESS,
  CREATE_GROUPS_ERROR,
  CLEAR_CREATE_MESSAGES
} from "../actions/types";

const initState = {
  groups: [],
  userGroups: [],
  deleted: null,
  pending: true,
  error: false,
  message: "",
  latestGroups: [],
  createSuccessMessage: "",
  createErrorMessage: ""
};
export const groupReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_GROUPS_SUCCESS:
      return {
        ...state,
        groups: [ ...state.groups , action.payload ],
        latestGroups: [...state.latestGroups, action.payload ],
        createSuccessMessage: `Group '${ action.payload.name}' created succesfully!` 
      }
    case CREATE_GROUPS_ERROR:
      console.log('CREATE_GROUPS_ERROR', action.payload);
      let errorMessage = action.payload.data.error
            ? action.payload.data.error
            : action.payload.data;

   
      return {
        ...state,
        createErrorMessage: errorMessage
      }  

    case CLEAR_CREATE_MESSAGES:
    return {
      ...state,
      createErrorMessage: action.payload,
      createSuccessMessage: action.payload

    }
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
