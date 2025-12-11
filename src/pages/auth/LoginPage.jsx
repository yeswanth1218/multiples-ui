import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Check, Sun, Moon, Apple, Globe } from 'lucide-react';
import multiplesLogo from '../../assets/multiples.png';

export default function LoginPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('signin');
    const navigate = useNavigate();

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleContinue = () => {
        navigate('/dashboard/home');
    };

    return (
        <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500 ${isDarkMode ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-900'}`}>

            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className={`absolute top-6 right-6 p-3 rounded-full shadow-lg transition-all ${isDarkMode ? 'bg-brand-muted/20 text-yellow-400 hover:bg-brand-muted/30' : 'bg-white text-brand-primary hover:bg-gray-50'}`}
                title="Toggle Theme"
            >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Main Card Container */}
            <div className={`w-full max-w-[1100px] h-auto md:h-[700px] grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-b from-brand-dark to-brand-dark/90 border border-brand-muted/10 shadow-black/50' : 'bg-white shadow-gray-200'}`}>

                {/* Left Side - Visual/Image */}
                <div className={`relative hidden md:flex flex-col items-center justify-center p-8 overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>
                    {/* New Logo */}
                    <img
                        src={multiplesLogo}
                        alt="Multiples Logo"
                        className="w-48 h-auto object-contain"
                    />
                </div>

                {/* Right Side - Form */}
                <div className={`relative flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 transition-colors duration-500 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className={`text-3xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Welcome Back
                        </h1>
                        <p className={`text-sm ${isDarkMode ? 'text-brand-muted' : 'text-slate-500'}`}>
                            Please, {activeTab === 'signin' ? 'Sign In to' : 'Create'} your account
                        </p>
                    </div>

                    {/* Tabs (Sign In / Sign Up) */}
                    <div className={`w-full p-1.5 rounded-2xl mb-8 flex transition-colors duration-300 ${isDarkMode ? 'bg-black/40 border border-brand-muted/10' : 'bg-gray-100'}`}>
                        <button
                            onClick={() => setActiveTab('signin')}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === 'signin'
                                ? (isDarkMode ? 'bg-gradient-to-b from-brand-muted/20 to-brand-muted/10 border-t border-brand-muted/10 text-white shadow-lg shadow-black/20' : 'bg-white text-slate-900 shadow-sm')
                                : (isDarkMode ? 'text-brand-muted hover:text-white' : 'text-slate-500 hover:text-slate-700')
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setActiveTab('signup')}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === 'signup'
                                ? (isDarkMode ? 'bg-gradient-to-b from-brand-muted/20 to-brand-muted/10 border-t border-brand-muted/10 text-white shadow-lg shadow-black/20' : 'bg-white text-slate-900 shadow-sm')
                                : (isDarkMode ? 'text-brand-muted hover:text-white' : 'text-slate-500 hover:text-slate-700')
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Input Fields */}
                    <div className="w-full space-y-4 mb-8">
                        {/* Email Field */}
                        <div className="group">
                            <div className={`relative flex items-center w-full h-14 rounded-2xl border transition-all duration-300 ${isDarkMode
                                ? 'bg-brand-dark/50 border-brand-muted/10 focus-within:border-brand-muted/30 focus-within:bg-brand-dark/80'
                                : 'bg-white border-gray-200 focus-within:border-gray-300 focus-within:shadow-sm'
                                }`}>
                                <div className={`pl-5 pr-3 ${isDarkMode ? 'text-brand-muted' : 'text-slate-400'}`}>
                                    <Mail size={20} />
                                </div>
                                <div className="flex-1 flex flex-col justify-center h-full">
                                    <span className={`text-[10px] font-medium mb-[-2px] ${isDarkMode ? 'text-brand-muted' : 'text-slate-400'}`}>Email Address</span>
                                    <input
                                        type="email"
                                        defaultValue="info@multiples.global"
                                        className={`w-full bg-transparent border-none outline-none text-sm font-medium h-6 p-0 focus:ring-0 ${isDarkMode ? 'text-white placeholder-brand-muted' : 'text-slate-900 placeholder-slate-400'}`}
                                    />
                                </div>
                                <div className="pr-5 pl-2">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check size={12} className="text-green-500" strokeWidth={3} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Password Field (Only shows in signup) */}
                        {activeTab === 'signup' && (
                            <div className={`relative flex items-center w-full h-14 rounded-2xl border transition-all duration-300 ${isDarkMode
                                ? 'bg-brand-dark/50 border-brand-muted/10 focus-within:border-brand-muted/30 focus-within:bg-brand-dark/80'
                                : 'bg-white border-gray-200 focus-within:border-gray-300 focus-within:shadow-sm'
                                }`}>
                                <div className={`pl-5 pr-3 ${isDarkMode ? 'text-brand-muted' : 'text-slate-400'}`}>
                                    <div className="w-5 h-5 border-2 border-current rounded-md flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-center h-full">
                                    <span className={`text-[10px] font-medium mb-[-2px] ${isDarkMode ? 'text-brand-muted' : 'text-slate-400'}`}>Password</span>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className={`w-full bg-transparent border-none outline-none text-sm font-medium h-6 p-0 focus:ring-0 ${isDarkMode ? 'text-white placeholder-brand-muted' : 'text-slate-900 placeholder-slate-400'}`}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        className={`w-full h-14 rounded-full flex items-center justify-center gap-3 font-semibold text-sm transition-transform active:scale-[0.98] ${isDarkMode
                            ? 'bg-white text-black hover:bg-gray-100'
                            : 'bg-brand-primary text-white hover:bg-brand-primary/90'
                            }`}
                    >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isDarkMode ? 'border-black' : 'border-white'
                            }`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                            </svg>
                        </div>
                        Continue
                    </button>

                    {/* Divider */}
                    <div className="w-full flex items-center gap-4 my-8">
                        <div className={`flex-1 h-[1px] ${isDarkMode ? 'bg-brand-muted/20' : 'bg-gray-200'}`}></div>
                        <span className={`text-xs font-medium ${isDarkMode ? 'text-brand-muted' : 'text-slate-400'}`}>Or continue with</span>
                        <div className={`flex-1 h-[1px] ${isDarkMode ? 'bg-brand-muted/20' : 'bg-gray-200'}`}></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex gap-4 mb-12">
                        {/* Google */}
                        <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDarkMode
                            ? 'bg-gradient-to-b from-brand-muted/20 to-brand-muted/10 border border-brand-muted/10 hover:border-brand-muted/20 text-white shadow-lg'
                            : 'bg-white border border-gray-200 hover:bg-gray-50 text-slate-800'
                            }`}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </button>

                        {/* Apple */}
                        <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDarkMode
                            ? 'bg-gradient-to-b from-brand-muted/20 to-brand-muted/10 border border-brand-muted/10 hover:border-brand-muted/20 text-white shadow-lg'
                            : 'bg-white border border-gray-200 hover:bg-gray-50 text-black'
                            }`}>
                            <Apple size={22} fill="currentColor" />
                        </button>

                        {/* Edge/Browser */}
                        <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDarkMode
                            ? 'bg-gradient-to-b from-brand-muted/20 to-brand-muted/10 border border-brand-muted/10 hover:border-brand-muted/20 text-white shadow-lg'
                            : 'bg-white border border-gray-200 hover:bg-gray-50 text-slate-800'
                            }`}>
                            <Globe size={22} />
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-6 md:bottom-8 text-center">
                        <p className={`text-[10px] ${isDarkMode ? 'text-brand-muted' : 'text-slate-400'}`}>
                            By continuing, you agree with Multiples LLC <a href="#" className="underline hover:text-current">Privacy Policy</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
