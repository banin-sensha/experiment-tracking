import React from 'react';
import { doGet, doPost } from '../utils/utils_api';
import { GET_PROJECTS, GET_PROJECTS_REQUEST } from './types';


export const fetchProjects = () => dispatch => {
    dispatch({ type: GET_PROJECTS_REQUEST });
    doGet('/experiments', (response) => {
      // Dispatch using the data property from the response
      dispatch({ type: GET_PROJECTS, payload: response.data });
    });
  };