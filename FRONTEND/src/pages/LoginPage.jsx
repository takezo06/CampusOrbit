import React from 'react';
import { useLoginLogic } from '../features/auth/useLoginLogic';
import smallRedLogo from '../assets/smallred.png'; // Updated asset
import upminLogo from '../assets/up.png';
import orbitWhiteBg from '../assets/orbitWhitebg.png';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
const navigate = useNavigate();
const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLoginLogic();

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

    {/* Main Content Area */}
    <main className="relative z-10 w-full max-w-[1550px] py-20 flex flex-col lg:flex-row items-center justify-center px-12 lg:gap-32">
        
        {/* LEFT SIDE: Brand Branding */}
        <div className="hidden lg:flex flex-col items-center animate-in fade-in slide-in-from-left duration-1000">
        <div className="bg-white p-20 rounded-[60px] shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.02] duration-500">
            <img src={orbitWhiteBg} alt="Campus Orbit" className="w-[600px] object-contain" />
        </div>
        </div>

        {/* RIGHT SIDE: Login Card */}
        <div className="w-full max-w-[700px] bg-white rounded-[50px] p-20 shadow-[0_15px_100px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-right duration-1000">
        
        {/* Top Logo Header */}
        <div className="flex justify-center items-center gap-10 mb-14">
            {/* Using smallred.png as requested */}
            <img src={smallRedLogo} alt="Orbit Icon" className="w-28 h-28 object-contain" />
            <img src={upminLogo} alt="UPMin" className="h-28 object-contain" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* Input Fields */}
            <div className="flex flex-col gap-2">
            <input
                {...register('login')}
                type="text"
                placeholder="Username / email"
                className={cn(
                "w-full h-[80px] px-10 rounded-[25px] border-2 font-body text-[22px] outline-none transition-all",
                errors.login ? "border-red-500 bg-red-50" : "border-[#dbdbdb] focus:border-[#840000]"
                )}
            />
            {errors.login && <span className="text-red-600 text-[16px] font-bold ml-4">{errors.login.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
            <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className={cn(
                "w-full h-[80px] px-10 rounded-[25px] border-2 font-body text-[22px] outline-none transition-all",
                errors.password ? "border-red-500 bg-red-50" : "border-[#dbdbdb] focus:border-[#840000]"
                )}
            />
            {errors.password && <span className="text-red-600 text-[16px] font-bold ml-4">{errors.password.message}</span>}
            </div>

            {/* Helpers */}
            <div className="flex flex-col gap-6 mt-2">
            <label className="flex items-center gap-5 cursor-pointer group">
                <input type="checkbox" {...register('remember')} className="w-7 h-7 accent-[#003a00]" />
                <span className="font-body text-[#003a00] text-[20px] font-semibold group-hover:underline">Remember username</span>
            </label>

            <div className="flex flex-col gap-2">
                <a href="#" className="font-body text-[#003a00] text-[19px] font-medium hover:underline">Forgotten your username or password?</a>
                <p className="font-body text-[#003a00] text-[19px] opacity-70 italic font-medium">Cookies must be enabled in your browser</p>
            </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-6 mt-8">
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[85px] bg-[#4e0000] rounded-[28px] font-display font-bold text-white text-[32px] shadow-2xl hover:bg-[#840000] active:scale-[0.98] transition-all disabled:opacity-50"
            >
                {isSubmitting ? 'Authenticating...' : 'Login'}
            </button>

            <button
                type="button"
                className="w-full h-[80px] bg-[#f2f2f2] border border-[#dbdbdb] rounded-[28px] flex items-center justify-center gap-6 hover:bg-gray-100 transition-colors shadow-sm"
            >
                <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" className="w-8 h-8" />
                <span className="font-body font-bold text-[#1f1f1f] text-[22px]">Sign in with Google</span>
            </button>

            {/* Sign Up Section */}
            <div className="flex flex-col items-center gap-6 mt-6">
                <div className="w-full h-[1px] bg-[#dbdbdb] relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 text-[#757373] font-body text-[18px]">or</span>
                </div>
                <button type="button"
                    onClick={() => navigate('/signup')} // Direct trigger for the /signup route
                    className="font-body font-bold text-[20px] hover:underline transition-all"
                    >
                    <span className="text-[#840000]">Don’t have an account?</span> 
                    <span className="text-[#003a00]"> Sign up</span>
                </button>
            </div>
            </div>
        </form>
        </div>
    </main>

    <div className="h-[170px] w-full relative z-10" />
    </div>
    
);
};

export default LoginPage;