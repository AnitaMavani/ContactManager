import {fieldValidationRules} from './ValidationRules';

type ValidationFunction<T> = (inputs: T) => Record<keyof T, string>;

const Validation = (inputs:Record<string, any> ) => {
  
  const errors = Object.keys(inputs).reduce((acc, key) => {
    const value = inputs[key];
    const rules = fieldValidationRules[key];
    const keyName = key.charAt(0).toUpperCase()+ key.slice(1);
    if (!rules) {
      // Skip validation if no rules are defined for the key
      console.log("skip the validation");
      return acc;
    }

    if (rules.required && !value.trim()) {
      acc[key] = `${keyName} is required`;
    } else if (rules.minLength && value.length < rules.minLength) {
      acc[key] = `${keyName} must be at least ${rules.minLength} characters long`;
    } else if (rules.regex && !rules.regex.test(value)) {
      acc[key] = "Invalid format";
    } else if (rules.customValidation) {
      const customError = rules.customValidation(value, inputs);
      if (customError) {
        acc[key] = customError;
      }
    }
    return acc;
  }, {} as Record<string, string>);
  return errors;
};

export default Validation;
