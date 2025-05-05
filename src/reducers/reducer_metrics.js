import { GET_EXPERIMENT_METRICS_REQUEST, GET_EXPERIMENT_METRICS } from "../actions/types";


const initialState = {
    metrics: [],
    fetchingMetrics: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EXPERIMENT_METRICS_REQUEST:
            return {...state, fetchingMetrics: true};
        case GET_EXPERIMENT_METRICS:
            return { ...state, metrics: action.payload, fetchingMetrics:false };
        default:
            return state;
    }
}