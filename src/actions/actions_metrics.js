import { doGet } from '../utils/utils_api';
import { GET_EXPERIMENT_METRICS, GET_EXPERIMENT_METRICS_REQUEST } from './types';


export const fetchMetrics = (experimentId) => dispatch => {
    dispatch({ type: GET_EXPERIMENT_METRICS_REQUEST });
    doGet(`/experiments/${experimentId}/metrics`, (response) => {
      // Dispatch using the data property from the response
      dispatch({ type: GET_EXPERIMENT_METRICS, payload: response.data });
    });
  };