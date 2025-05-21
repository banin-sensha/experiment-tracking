import { doGet } from '../utils/utils_api';
import {GET_EXPERIMENT_RESOURCE, GET_EXPERIMENT_RESOURCE_REQUEST} from './types'

export const fetchResourceUsage = (experimentId) => dispatch => {
    dispatch({ type: GET_EXPERIMENT_RESOURCE_REQUEST });
    doGet(`/experiments/${experimentId}/resource-usage`, (response) => {
      dispatch({ type: GET_EXPERIMENT_RESOURCE, payload: response.data });
    });
  };
