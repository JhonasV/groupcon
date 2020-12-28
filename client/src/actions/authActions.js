
import { FETCH_CURRENT_USER } from './types';

import { getCurrentUser } from '../Helpers/auth-helper';

export const fetchCurrentUser = () => async dispatch => {
    var response = await getCurrentUser();
    console.log('authActions.js fetchCurrentUser', response);
    dispatch({ type: FETCH_CURRENT_USER, payload: response });
}