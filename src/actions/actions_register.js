import React from 'react';
import { doPost, doPostFormData } from '../utils/utils_api';
import { REGISTER_USER } from './types';
import { saveToLocalStorage } from '../utils/utils_storage';


export const registerUser = (values) => dispatch => {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);

    doPostFormData('/register', formData, (response) => {
        dispatch({ type: REGISTER_USER, payload: response });
    });
  };