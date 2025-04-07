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