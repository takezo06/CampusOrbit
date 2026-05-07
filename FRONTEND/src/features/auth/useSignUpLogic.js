// src/features/auth/useSignUpLogic.js
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';

const signUpSchema = z.object({
name: z.string().min(2, 'Full name is required'),
email: z.string().email('Invalid email').refine((val) => val.endsWith('@up.edu.ph'), {
    message: 'Must be a valid UP email (@up.edu.ph)',
}),
username: z.string().min(3, 'Username must be at least 3 characters'),
password: z.string().min(6, 'Password must be at least 6 characters'),
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
    formState: { errors, isSubmitting },
} = useForm({
    resolver: zodResolver(signUpSchema),
});

const onSubmit = async (data) => {
    console.log('Registering user...', data);
    // Logic for §3.3 Registration will go here
};

return { register, handleSubmit, onSubmit, errors, isSubmitting, navigate };
};