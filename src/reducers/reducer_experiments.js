import { GET_EXPERIMENTS, GET_EXPERIMENTS_REQUEST } from "../actions/types";


const initialState = {
    experiments: [],
    fetchingExperiments:false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EXPERIMENTS_REQUEST:
            return {...state, fetchExperiments: true};
        case GET_EXPERIMENTS:
            return { ...state, experiments: action.payload, fetchExperiments:false };
        default:
            return state;
    }
}