import { FETCH_CURRENT_USER } from '../actions/types';

const initState = {
    currentUser: null,
    isAuthenticated: false
};


export const authReducer = (state = initState, action ) => {
    switch (action.type) {
        case FETCH_CURRENT_USER:
        {
            console.log(action.payload);
            console.log(action.payload !== false)
            return {
                ...state, 
                currentUser: action.payload,
                isAuthenticated: action.payload !== false
            }
        }
        default:
            return state;
    }
}