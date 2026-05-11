import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

const onSubmit = async (data) => {
    try {
    // Logic for §3.3 POST /auth/login will go here
    console.log('Logging in...', data);
    // On success: navigate(redirectPath);
    } catch (err) {
    console.error('Login failed', err);
    }
};

return { register, handleSubmit, onSubmit, errors, isSubmitting };
};