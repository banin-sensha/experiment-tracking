import { combineReducers } from 'redux';

const appReducers = combineReducers({
    login: LoginReducer,

});


const initialState = appReducers({}, {});

const rootReducer = (state, action) => {
	if (action.type === LOGOUT) {
		state = initialState; // Clear all state on logout
	}
	return appReducers(state, action);
}

export default rootReducer;