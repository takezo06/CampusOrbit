import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/api/auth'; // Import the API bridge

const signUpSchema = z.object({
name: z.string().min(2, 'Full name is required'),
email: z.string().email('Invalid email').refine((val) => val.endsWith('@up.edu.ph'), {
    message: 'Must be a valid UP email (@up.edu.ph)',
}),
username: z.string().min(3, 'Username must be at least 3 characters'),
password: z.string().min(8, 'Password must be at least 8 characters'), // Increased to 8 for security
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
    setError, // Added to handle backend validation errors
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

    // 2. Call the API
    const result = await registerUser(payload);

    if (result.success) {
        // 3. Store the token in LocalStorage for persistence
        localStorage.setItem('orbit_token', result.data.token);
        
        // 4. Redirect to Dashboard
        navigate('/dashboard');
    }
    } catch (error) {
    // 5. Handle Backend Validation Errors (e.g., Email already taken)
    if (error.response && error.response.status === 422) {
        const backendErrors = error.response.data.errors;
        // Map Laravel errors back to the specific React Hook Form fields
        Object.keys(backendErrors).forEach((field) => {
        setError(field, { type: 'manual', message: backendErrors[field][0] });
        });
    } else {
        alert(error.response?.data?.message || "An unexpected error occurred.");
    }
    }
};

return { register, handleSubmit, onSubmit, errors, isSubmitting, navigate };
};