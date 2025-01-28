import { useState, useEffect } from 'react';
type ValidationFunction<T> = (values: T) => Record<keyof T, string>;

const FormManager = (initialValues: Record<string, any> ) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validate = (validationRules: (inputs:any) => Record<string, any>) => {
    const validationErrors = validationRules(inputs);
    const isValid = !Object.values(validationErrors).some((error) => error.trim() !== "");
    setErrors(validationErrors); 
    return isValid;
};
const resetForm = (newInitialValues: any) => {
    setInputs(newInitialValues);
    setErrors({});
  };


  return { inputs, errors, handleChange, validate, resetForm, setInputs };
};

export default FormManager;
