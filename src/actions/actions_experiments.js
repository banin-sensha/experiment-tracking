import React from 'react';
import { doGet, doPost } from '../utils/utils_api';
import { GET_EXPERIMENTS, GET_EXPERIMENTS_REQUEST } from './types';


export const fetchExperiments = () => dispatch => {
    dispatch({ type: GET_EXPERIMENTS_REQUEST });
    doGet('/experiments', (response) => {
      // Dispatch using the data property from the response
      dispatch({ type: GET_EXPERIMENTS, payload: response.data });
    });
  };