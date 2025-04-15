import React from 'react';
import { doPostFormData } from '../utils/utils_api';
import { LOGIN_USER } from './types';
import { saveToLocalStorage } from '../utils/utils_storage';


export const loginUser = (values, callback) => dispatch => {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);

    doPostFormData('/token', formData, (response) => {
        if (callback) {
            callback();
        }
        saveToLocalStorage("access_token", response.data.access_token);
        saveToLocalStorage("token_type", response.data.token_type);
        dispatch({ type: LOGIN_USER, payload: response });
    });
  };