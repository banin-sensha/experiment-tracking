import React from 'react'
import FormInput from '../components/FormInput';

export const renderFormInput = (field) => {
    return (
        <FormInput
            name={field.name}
            type={field.type}
            readOnly={field.readOnly}
            {...field.input}
            placeholder={field.label}
            error={field.meta.touched ? field.meta.error : ''}
        />
    );
}

export const generateRandomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};