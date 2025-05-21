import { combineReducers } from 'redux';
import LoginReducer from "./reducer_login";
import ExperimentsReducer from "./reducer_experiments";
import RegisterReducer from "./reducer_register";
import MetricsReducer from "./reducer_metrics"
import ProjectReducer from "./reducer_projects"
import ProfileReducer from "./reducer_profile"
import ResourceReducer from "./reducer_resource_usage"

const appReducers = combineReducers({
    login: LoginReducer,
    experiments: ExperimentsReducer,
    projects: ProjectReducer,
    register: RegisterReducer,
    metrics: MetricsReducer,
    profile: ProfileReducer,
    resourceUsage : ResourceReducer,
});


const initialState = appReducers({}, {});

const rootReducer = (state, action) => {
	return appReducers(state, action);
}

export default rootReducer;