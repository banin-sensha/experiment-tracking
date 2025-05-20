import { doGet } from '../utils/utils_api';
import {
  GET_PROJECTS,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_FAILURE,
} from './types';

// Fetch all projects
export const fetchProjects = () => (dispatch) => {
  dispatch({ type: GET_PROJECTS_REQUEST });

  doGet('/projects', (response, error) => {
    if (error || !response) {
      dispatch({ type: GET_PROJECTS_FAILURE });
      return;
    }

    dispatch({
      type: GET_PROJECTS,
      payload: response.data
    });
  });
};
