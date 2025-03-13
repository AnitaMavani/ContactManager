import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import FormManager from './useForm';
import Validation from '../utils/Validation';
import { useNavigate } from 'react-router-dom';

type FormState = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type UseAuthProps = {
  isRegister: boolean;
};

const useAuth = ({ isRegister }: UseAuthProps) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialState: FormState = isRegister
    ? { name: "", email: "", password: "", confirmPassword: "" }
    : { email: "", password: "" };

  const { inputs, errors, handleChange, validate, resetForm } = FormManager(initialState);

  useEffect(() => {
    resetForm(initialState);
  }, [isRegister]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (validate(Validation)) {
      setIsLoading(true);
      try {
        const endpoint = isRegister ? '/register' : '/login';
        const response = await axios.post(
          `http://localhost:5001/api/auth${endpoint}`,
          inputs
        );

        console.log(isRegister ? "Registration successful" : "Login successful", response.data);
        resetForm(initialState);

        if (!isRegister) {
          localStorage.setItem('token', response.data.token);
          login(response.data.user.name);
          navigate('/'); // Redirect to home or dashboard
        }
      } catch (error: any) {
        setError(error.response?.data?.error || 'Something went wrong');
        console.error('Auth error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Validation failed:", errors);
    }
  };

  return { inputs, errors, handleChange, isLoading, error, handleSubmit };
};

export default useAuth;
