import React from 'react';
import { doGet, doGetBlob } from '../utils/utils_api';
import { GET_EXPERIMENTS, GET_EXPERIMENTS_REQUEST,
   DOWNLOAD_MODEL_REQUEST, DOWNLOAD_MODEL_FAILURE, DOWNLOAD_MODEL_SUCCESS } from './types';


export const fetchExperiments = (project_id) => dispatch => {
    dispatch({ type: GET_EXPERIMENTS_REQUEST });
    doGet(`/projects/${project_id}/experiments`, (response) => {
      // Dispatch using the data property from the response
      dispatch({ type: GET_EXPERIMENTS, payload: response.data });
    });
  };

  
  export const downloadModel = (experimentId) => (dispatch) => {
    dispatch({ type: DOWNLOAD_MODEL_REQUEST });
  
    doGetBlob(`/experiments/${experimentId}/model`, (response, error) => {
      if (error || !response) {
        alert("Failed to download the model");
        dispatch({ type: DOWNLOAD_MODEL_FAILURE });
        return;
      }
  
      // Default filename fallback
      let filename = `model_${experimentId}`;

      const contentDisposition = response.headers['content-disposition'];
      console.log('contentDisposition', response.headers['content-disposition'])

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
  
      dispatch({ type: DOWNLOAD_MODEL_SUCCESS });
    });
  };
  