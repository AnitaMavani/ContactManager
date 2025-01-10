interface ValidationRule {
  required?: boolean;
  minLength?: number;
  regex?: RegExp;
  customValidation?: (value: string, inputs:Record<string, string>) => string | undefined;
}

export const fieldValidationRules: Record<string, ValidationRule> = {
  name: { required: true },
  email: { required: true, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { required: true, minLength: 6 },
  confirmPassword: { required: true, minLength: 6,
    customValidation: (value, inputs) => {
      if (value !== inputs.password) {
        return "Passwords do not match";
      }
      return undefined;
    }},
  message: { required: true, minLength: 10 }
};