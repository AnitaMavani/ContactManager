import {useState} from 'react';
interface FormState {
    name: string;
    email: string;
    message:string;
  }
type ValidateFunction = (fields: FormState) => Record<string, string>;

const FormManager = (
    initialState: FormState,
    validateFields: ValidateFunction
    ) => {
        const [inputs, setInputs] = useState<FormState>(initialState);
        const [errors, setErrors] = useState<Record<string, string>>({});

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setInputs((prev) => ({ ...prev, [name]: value }));
          };
    const validate = () => {
        const validationErrors = validateFields(inputs);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
      };
    const resetForm = () => setInputs(initialState);
    return { inputs, errors, handleChange, validate, resetForm };
}
export default FormManager;