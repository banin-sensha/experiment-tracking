import { combineReducers } from 'redux';
import LoginReducer from "./reducer_login";
import ProjectReducer from "./reducer_project";
import RegisterReducer from "./reducer_register";

const appReducers = combineReducers({
    login: LoginReducer,
    project: ProjectReducer,
    register: RegisterReducer

});


const initialState = appReducers({}, {});

const rootReducer = (state, action) => {
	return appReducers(state, action);
}

export default rootReducer;