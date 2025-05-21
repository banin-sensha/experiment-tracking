import { doGet, doGetBlob } from '../utils/utils_api';
import {
  GET_PROJECTS,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_FAILURE,
  DOWNLOAD_REPORT_REQUEST,
  DOWNLOAD_REPORT_FAILURE,
  DOWNLOAD_REPORT_SUCCESS,
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

export const downloadReport = (projectId) => (dispatch) => {
  dispatch({ type: DOWNLOAD_REPORT_REQUEST });

  return new Promise((resolve, reject) => {
    doGetBlob(`/projects/${projectId}/report`, (response, error) => {
      if (error || !response) {
        alert("Failed to download the report");
        dispatch({ type: DOWNLOAD_REPORT_FAILURE });
        reject(error || new Error("No response received"));
        return;
      }

      // Default filename fallback
      let filename = `model_${projectId}`;

      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename\s*=\s*["']?([^"';]+)["']?/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);

      dispatch({ type: DOWNLOAD_REPORT_SUCCESS });
      resolve(); // <-- Resolving the promise here
    });
  });
};
