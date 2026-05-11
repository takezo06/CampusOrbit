// src/pages/SignUpPage.jsx
import React from 'react';
import { useSignUpLogic } from '../features/auth/useSignUpLogic';
import smallRedLogo from '../assets/smallred.png';
import upminLogo from '../assets/up.png';
import orbitWhiteBg from '../assets/orbitWhitebg.png';
import { cn } from '../utils/cn';

const SignUpPage = () => {
const { register, handleSubmit, onSubmit, errors, isSubmitting, navigate } = useSignUpLogic();

return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative select-none -mb-[170px]">
    
    {/* Background Gradient */}
    <div 
        className="absolute inset-0 z-0"
        style={{ 
        background: 'linear-gradient(131deg, #003a00 0%, #840000 100%)',
        minHeight: '100%' 
        }} 
    />

    <main className="relative z-10 w-full max-w-[1550px] py-20 flex flex-col lg:flex-row items-center justify-center px-12 lg:gap-32">
        
        {/* LEFT SIDE: Branding (Hidden on small screens) */}
        <div className="hidden lg:flex flex-col items-center animate-in fade-in slide-in-from-left duration-1000">
        <div className="bg-white p-20 rounded-[60px] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <img src={orbitWhiteBg} alt="Campus Orbit" className="w-[600px] object-contain" />
        </div>
        </div>

        {/* RIGHT SIDE: Sign Up Card */}
        <div className="w-full max-w-[750px] bg-white rounded-[50px] p-16 shadow-[0_15px_100px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-right duration-1000">
        
        {/* Header */}
        <div className="flex justify-center items-center gap-10 mb-10">
            <img src={smallRedLogo} alt="Orbit Icon" className="w-24 h-24 object-contain" />
            <img src={upminLogo} alt="UPMin" className="h-24 object-contain" />
        </div>

        <h2 className="font-display font-bold text-[40px] text-[#840000] text-center mb-8 tracking-tight">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name - Spans 2 columns */}
            <div className="md:col-span-2 flex flex-col gap-2">
            <input {...register('name')} placeholder="Full Name" className={cn("w-full h-[70px] px-8 rounded-[20px] border-2 font-body text-[18px] outline-none transition-all", errors.name ? "border-red-500" : "border-[#dbdbdb] focus:border-[#840000]")} />
            {errors.name && <span className="text-red-600 text-sm font-bold ml-4">{errors.name.message}</span>}
            </div>

            {/* Email - Spans 2 columns */}
            <div className="md:col-span-2 flex flex-col gap-2">
            <input {...register('email')} placeholder="Enter Email" className={cn("w-full h-[70px] px-8 rounded-[20px] border-2 font-body text-[18px] outline-none transition-all", errors.email ? "border-red-500" : "border-[#dbdbdb] focus:border-[#840000]")} />
            {errors.email && <span className="text-red-600 text-sm font-bold ml-4">{errors.email.message}</span>}
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
            <input {...register('username')} placeholder="Username" className={cn("w-full h-[70px] px-8 rounded-[20px] border-2 font-body text-[18px] outline-none transition-all", errors.username ? "border-red-500" : "border-[#dbdbdb] focus:border-[#840000]")} />
            {errors.username && <span className="text-red-600 text-sm font-bold ml-4">{errors.username.message}</span>}
            </div>

            {/* Empty space/placeholder if needed or just let it stack */}

            {/* Password */}
            <div className="flex flex-col gap-2">
            <input {...register('password')} type="password" placeholder="Password" className={cn("w-full h-[70px] px-8 rounded-[20px] border-2 font-body text-[18px] outline-none transition-all", errors.password ? "border-red-500" : "border-[#dbdbdb] focus:border-[#840000]")} />
            {errors.password && <span className="text-red-600 text-sm font-bold ml-4">{errors.password.message}</span>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
            <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" className={cn("w-full h-[70px] px-8 rounded-[20px] border-2 font-body text-[18px] outline-none transition-all", errors.confirmPassword ? "border-red-500" : "border-[#dbdbdb] focus:border-[#840000]")} />
            {errors.confirmPassword && <span className="text-red-600 text-sm font-bold ml-4">{errors.confirmPassword.message}</span>}
            </div>

            {/* Submit Section */}
            <div className="md:col-span-2 flex flex-col gap-6 mt-6">
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[80px] bg-[#4e0000] rounded-[25px] font-display font-bold text-white text-[28px] shadow-xl hover:bg-[#840000] active:scale-[0.98] transition-all"
            >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>

            <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-body font-bold text-[18px] text-center transition-all"
            >
                Already have an account? <span className="text-[#840000] hover:underline">Login</span>
            </button>
            </div>
        </form>
        </div>
    </main>

    <div className="h-[170px] w-full relative z-10" />
    </div>
);
};

export default SignUpPage;