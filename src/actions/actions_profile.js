import { doGet } from "../utils/utils_api";
import { GET_PROFILE, GET_PROFILE_REQUEST, GET_PROFILE_FAILURE} from "./types";

export const fetchProfile = () => (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  doGet("/profile", (response, error) => {
    if (error || !response) {
      dispatch({ type: GET_PROFILE_FAILURE });
      return;
    }

    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  });
};
