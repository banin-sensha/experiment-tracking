import { combineReducers } from 'redux';
import LoginReducer from "./reducer_login";
import ExperimentsReducer from "./reducer_experiments";
import RegisterReducer from "./reducer_register";
import MetricsReducer from "./reducer_metrics"

const appReducers = combineReducers({
    login: LoginReducer,
    experiments: ExperimentsReducer,
    register: RegisterReducer,
    metrics: MetricsReducer
});


const initialState = appReducers({}, {});

const rootReducer = (state, action) => {
	return appReducers(state, action);
}

export default rootReducer;