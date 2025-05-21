import { doGet } from '../utils/utils_api';
import { GET_EXPERIMENT_METRICS, GET_EXPERIMENT_METRICS_REQUEST,
   GET_LAST_EXPERIMENT_METRIC_REQUEST, GET_LAST_EXPERIMENT_METRIC  } from './types';


export const fetchMetrics = (experimentId) => dispatch => {
    dispatch({ type: GET_EXPERIMENT_METRICS_REQUEST });
    doGet(`/experiments/${experimentId}/metrics`, (response) => {
      dispatch({ type: GET_EXPERIMENT_METRICS, payload: response.data });
    });
  };


  export const fetchLastEpoch = (experimentId) => dispatch => {
    dispatch({ type: GET_LAST_EXPERIMENT_METRIC_REQUEST });
    return new Promise((resolve, reject) => {
        doGet(`/experiments/${experimentId}/metrics/last`, (response) => {
            dispatch({ type: GET_LAST_EXPERIMENT_METRIC, payload: response.data });
            resolve(response.data);
        }, (error) => {
            reject(error);
        });
    });
};