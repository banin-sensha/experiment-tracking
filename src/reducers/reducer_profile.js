
import {
    GET_PROFILE_REQUEST,
    GET_PROFILE,
    GET_PROFILE_FAILURE,
  } from "../actions/types";
  
  const initialState = {
    loading: false,
    error: null,
    profile: null,
  };
  
  export default function profileReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_PROFILE:
        return { ...state, loading: false, profile: action.payload };
      case GET_PROFILE_FAILURE:
        return { ...state, loading: false, error: "Failed to load profile" };
      default:
        return state;
    }
  }
  