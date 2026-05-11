import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '@/utils/api'; 

const loginSchema = z.object({
    login: z.string().min(1, 'Username or email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    remember: z.boolean().default(false),
});

export const useLoginLogic = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/dashboard';

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { remember: false }
    });

    const onSubmit = async (formData) => {
        try {
            // This matches your AuthController 'login' and 'password' fields
            const response = await api.post('/auth/login', {
                login: formData.login,
                password: formData.password
            });

            // FIX: Your backend returns { success: true, data: { token: '...', user: {...} } }
            // So we need response.data.data.token
            if (response.data.success) {
                const token = response.data.data.token;
                localStorage.setItem('orbit_token', token);
                
                console.log('Login successful');
                navigate(redirectPath);
            }
        } catch (err) {
            console.error('Login error:', err.response?.data);
            alert(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return { 
        register, 
        handleSubmit: handleSubmit(onSubmit), // This allows you to just use onSubmit={handleSubmit}
        errors, 
        isSubmitting 
    };
};