import { useState, useEffect } from 'react';

type ValidationFunction<T> = (values: T) => Record<keyof T, string>;

const FormManager = <T extends Record<string, any>>(initialValues: T ) => {
  const [inputs, setInputs] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  //Reset inputs when initialValues changes


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (validationRules: ValidationFunction<T>): boolean => {
    const validationErrors = validationRules(inputs);
    const isValid = !Object.values(validationErrors).some((error) => error.trim() !== "");
    setErrors(validationErrors); 
    return isValid;
};
const resetForm = (newInitialValues: T) => {
    setInputs(newInitialValues);
    setErrors({});
  };


  return { inputs, errors, handleChange, validate, resetForm };
};

export default FormManager;
