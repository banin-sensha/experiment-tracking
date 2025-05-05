import axios from "axios";
import _ from "lodash";
// import { getFromLocalStorage } from "./utils_storage";
// import { reportErrorToServer } from "./errorReporter";
import { ROOT_URL } from "../constants";
import { getFromLocalStorage } from "./utils_storage";
/**
 *
 * @param {*} act which act to call
 * @param {*} values params object
 * @param {*} callBack callback after success
 */
export const doPost = (act, values, callBack) => {
//   const sessionid = getFromLocalStorage(SESSION_ID_STORE);
//   const token = getFromLocalStorage(TOKEN);
  // if(!sessionid) {return;};
  let dataToSend = { ...values};

  let params = new URLSearchParams();
  _.forEach(dataToSend, (value, key) => {
    params.append(key, value);
  });

  const request = axios.post(ROOT_URL + act, params,{
    headers: {
        "Content-Type": "application/json",
      },
  });
  request
    .then((response) => {
      if (callBack) {
        callBack(response);
      }
    })
    .catch(function(error) {
        console.log("error");
      
    });
};

export const doPostToSecondaryURL = (url, values, callBack) => {
  const request = axios.post(ROOT_URL_SECONDARY + url, values, {
    headers: {
      "Content-Type": "application/json",
      token: getFromLocalStorage(TOKEN),
    },
  });

  request
    .then((response) => {
      if (callBack) {
        callBack(response);
      }
    })
    .catch(function(error) {
      if (error.response.status == 403) {
        // invalid session
        reportErrorToServer(
          "UNAUTHORIZED ACCESS [Invalid Session]: ",
          sessionid
        );
      } else {
        const errorInfo = {
          act: url,
          error: error.response.data,
        };
        reportErrorToServer("API ERROR ", errorInfo);
        if (callBack) {
          callBack(error.response);
        }
      }
    });
};

export const doGetFromSecondaryURL = (url, callBack) => {
  const request = axios.get(ROOT_URL_SECONDARY + url, {
    headers: {
      token: getFromLocalStorage(TOKEN),
    },
  });
  request
    .then((response) => {
      if (callBack) {
        callBack(response);
      }
    })
    .catch(function(error) {
      if (error.response.status == 403) {
        // invalid session
        reportErrorToServer(
          "UNAUTHORIZED ACCESS [Invalid Session]: ",
          sessionid
        );
      } else {
        const errorInfo = {
          act: url,
          error: error.response.data,
        };
        reportErrorToServer("API ERROR ", errorInfo);
        if (callBack) {
          callBack(error.response);
        }
      }
    });
};

export const doGet = (url, callBack) => {
    const accessToken = getFromLocalStorage("access_token");
    axios.get(ROOT_URL + url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    })
    .then((response) => {
      // response.data is already a JS object; pass it to the callback
      if (callBack) {
        callBack(response);
      }
    })
    .catch((error) => {
      console.error("error", error);
    });
  };

export const doPostFormData1 = (url, values, callBack) => {
  const request = axios.post(ROOT_URL_SECONDARY + url, values, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: getFromLocalStorage(TOKEN),
    },
  });

  request
    .then((response) => {
      if (callBack) {
        callBack(response);
      }
    })
    .catch(function(error) {
      if (error.response.status == 403) {
        // invalid session
        reportErrorToServer(
          "UNAUTHORIZED ACCESS [Invalid Session]: ",
          sessionid
        );
      } else {
        const errorInfo = {
          act: url,
          error: error.response.data,
        };
        reportErrorToServer("API ERROR ", errorInfo);
        if (callBack) {
          callBack(error.response);
        }
      }
    });
};

export const doPostFormData = (url, values, callBack) => {
    const request = axios.post(ROOT_URL + url, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    request
      .then((response) => {
        if (callBack) {
          callBack(response);
        }
      })
      .catch(function(error) {
        console.log('error', error);
    });
};
