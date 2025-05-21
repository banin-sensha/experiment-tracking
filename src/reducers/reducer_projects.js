import {
    GET_PROJECTS_REQUEST,
    GET_PROJECTS,
    GET_PROJECTS_FAILURE,
    DOWNLOAD_REPORT_REQUEST,
    DOWNLOAD_REPORT_SUCCESS,
    DOWNLOAD_REPORT_FAILURE,
  } from "../actions/types";
  
  const initialState = {
    projects: [],
    fetchingProjects: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_PROJECTS_REQUEST:
        return { ...state, fetchProjects: true };
      case GET_PROJECTS:
        return { ...state, projects: action.payload, fetchProjects: false };
      case GET_PROJECTS_FAILURE:
        return { ...state, fetchProjects: false };
      case DOWNLOAD_REPORT_REQUEST: 
        return { ...state, downloadModel: true };
      case DOWNLOAD_REPORT_SUCCESS: 
        return { ...state, downloadModel: false };
      case DOWNLOAD_REPORT_FAILURE: 
        return { ...state, downloadModel: false };
      default:
        return state;
    }
  }
  