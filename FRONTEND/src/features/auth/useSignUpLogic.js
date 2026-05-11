import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/api'; // Use your standard api utility

const signUpSchema = z.object({
    name: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email').refine((val) => val.endsWith('@up.edu.ph'), {
        message: 'Must be a valid UP email (@up.edu.ph)',
    }),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const useSignUpLogic = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data) => {
        try {
            // 1. Prepare payload (Laravel expects password_confirmation)
            const payload = {
                name: data.name,
                email: data.email,
                username: data.username,
                password: data.password,
                password_confirmation: data.confirmPassword,
            };

            // 2. Call the API with the correct /auth prefix
            const response = await api.post('/auth/register', payload);

            if (response.data.success) {
                // 3. Store token using 'token' key (matches api.js interceptor)
                // Accessing response.data.data.token based on your AuthController
                const token = response.data.data.token;
                localStorage.setItem('token', token);
                
                // 4. Redirect to Dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            // 5. Handle Backend Validation Errors (e.g., Email already taken)
            if (error.response && error.response.status === 422) {
                const backendErrors = error.response.data.errors;
                Object.keys(backendErrors).forEach((field) => {
                    setError(field, { type: 'manual', message: backendErrors[field][0] });
                });
            } else {
                alert(error.response?.data?.message || "An unexpected error occurred.");
            }
        }
    };

    // Return handleSubmit(onSubmit) to avoid the "white screen" conflict in the UI
    return { register, handleSubmit: handleSubmit(onSubmit), errors, isSubmitting, navigate };
};