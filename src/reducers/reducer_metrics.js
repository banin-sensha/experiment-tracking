import { GET_EXPERIMENT_METRICS_REQUEST, GET_EXPERIMENT_METRICS,
     GET_LAST_EXPERIMENT_METRIC_REQUEST, GET_LAST_EXPERIMENT_METRIC } from "../actions/types";


const initialState = {
    metrics: [],
    lastEpoch: {},
    fetchingMetrics: false,
    fetchLastEpoch: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EXPERIMENT_METRICS_REQUEST:
            return {...state, fetchingMetrics: true};
        case GET_EXPERIMENT_METRICS:
            return { ...state, metrics: action.payload, fetchingMetrics:false };
        case GET_LAST_EXPERIMENT_METRIC_REQUEST:
            return {...state, fetchLastEpoch: true};
        case GET_LAST_EXPERIMENT_METRIC:
            return { ...state, lastEpoch: action.payload, fetchLastEpoch:false };
        default:
            return state;
    }
}