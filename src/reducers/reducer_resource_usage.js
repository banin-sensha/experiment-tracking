import {GET_EXPERIMENT_RESOURCE, GET_EXPERIMENT_RESOURCE_REQUEST} from "../actions/types";


const initialState = {
    resources: [],
    fetchResourceUsage: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EXPERIMENT_RESOURCE_REQUEST:
            return {...state, fetchResourceUsage: true};
        case GET_EXPERIMENT_RESOURCE:
            return { ...state, resources: action.payload, fetchResourceUsage:false };
        default:
            return state;
    }
}