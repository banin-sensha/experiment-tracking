import { GET_EXPERIMENTS, GET_EXPERIMENTS_REQUEST,
    DOWNLOAD_MODEL_REQUEST, DOWNLOAD_MODEL_SUCCESS, DOWNLOAD_MODEL_FAILURE  } from "../actions/types";


const initialState = {
    experiments: [],
    fetchingExperiments:false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EXPERIMENTS_REQUEST:
          return { ...state, fetchExperiments: true };
        case GET_EXPERIMENTS:
          return { ...state, experiments: action.payload, fetchExperiments: false };
        case DOWNLOAD_MODEL_REQUEST: // New action for the download request
          return { ...state, downloadModel: true };
        case DOWNLOAD_MODEL_SUCCESS: // Action for a successful download
          return { ...state, downloadModel: false };
        case DOWNLOAD_MODEL_FAILURE: // Action for failed download
          return { ...state, downloadModel: false };
        default:
          return state;
        }
}