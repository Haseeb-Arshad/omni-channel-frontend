"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function AuthPage() {
  const router = useRouter();
  const { login, register, isLoading, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    remember: false
  });
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear form error when user starts typing
    if (formError) {
      setFormError(null);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormError(null);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      remember: false
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    const { email, password, confirmPassword, name, remember } = formData;
    
    // Validate inputs
    if (!email || !password) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    if (!isLogin) {
      // Additional signup validation
      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        return;
      }
      
      if (password.length < 8) {
        setFormError('Password must be at least 8 characters');
        return;
      }
    }
    
    try {
      if (isLogin) {
        // Handle login
        console.log('[AuthPage] Attempting login with:', { email, remember });
        const success = await login(email, password, remember);
        console.log('[AuthPage] Login success status:', success);
        if (!success) {
          // If login returns false, AuthContext should have shown a toast.
          // Set formError if not already set by a caught error.
          if (!formError) { 
             setFormError('Login failed. Please check your credentials or see console for details.');
          }
        }
      } else {
        // Handle signup
        console.log('[AuthPage] Attempting signup with:', { email, name });
        const success = await register(email, password, name);
        console.log('[AuthPage] Signup success status:', success);
        if (!success) {
           if (!formError) {
             setFormError('Signup failed. Please try again or see console for details.');
           }
        }
      }
    } catch (error: any) {
      console.error('[AuthPage] handleSubmit error:', error);
      setFormError(error.message || 'Authentication failed');
      // toast.error('Authentication failed'); // AuthContext or specific handlers above should manage toasts
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-background to-background/95">
      {/* Left panel - visuals */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-indigo-600/30 z-10"></div>
        
        {/* Background animated elements */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/30 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl"></div>
        </motion.div>
        
        {/* Brand and feature showcase */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white p-12">
          <motion.div 
            className="w-full max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-4xl font-bold mb-2">OmniChannel</h1>
              <p className="text-xl opacity-80">Connect your world. One platform.</p>
            </motion.div>
            
            <motion.div variants={containerVariants} className="space-y-6">
              {/* Feature highlights */}
              {[
                { icon: <Mail className="h-5 w-5" />, title: "All channels in one place", desc: "SMS, WhatsApp, Telegram and more" },
                { icon: <User className="h-5 w-5" />, title: "AI-powered assistance", desc: "Intelligent responses for your customers" }
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="flex items-start p-4 rounded-xl backdrop-blur-sm bg-white/10"
                >
                  <div className="rounded-full bg-white/20 p-2 mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm opacity-80">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Right panel - auth form */}
      <motion.div 
        className="flex flex-col justify-center p-6 sm:p-12 md:p-16"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
              OmniChannel
            </h1>
            <p className="text-muted-foreground">Connect your world. One platform.</p>
          </div>
          
          {/* Auth form container */}
          <motion.div 
            className="rounded-2xl p-8 backdrop-blur-sm bg-card/80 border border-border/50 shadow-xl"
            layout
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-1">
                  {isLogin ? "Welcome back" : "Create account"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {isLogin ? "Sign in to your account" : "Register a new account"}
                </p>
              </div>
              
              {formError && (
                <div className="bg-destructive/10 text-destructive rounded-lg p-3 mb-4 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{formError}</p>
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input rounded-lg pl-10 pr-4 py-2.5 w-full bg-background/80 border-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      placeholder="name@example.com"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                {/* Name Field - Only for signup */}
                {!isLogin && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input rounded-lg pl-10 pr-4 py-2.5 w-full bg-background/80 border-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        placeholder="John Doe"
                        disabled={isLoading}
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input rounded-lg pl-10 pr-10 py-2.5 w-full bg-background/80 border-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      placeholder={isLogin ? "Enter password" : "Create password"}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                {/* Confirm Password - Only for signup */}
                {!isLogin && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="form-input rounded-lg pl-10 pr-4 py-2.5 w-full bg-background/80 border-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        placeholder="Confirm password"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Remember me & Forgot password */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        checked={formData.remember}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                        disabled={isLoading}
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-muted-foreground">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="text-primary hover:text-primary/80 font-medium">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                )}
                
                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: isLoading ? 1 : 1.01 }}
                  whileTap={{ scale: isLoading ? 1 : 0.99 }}
                  type="submit"
                  className="w-full py-2.5 px-4 flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white font-medium rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 focus:ring-4 focus:ring-primary/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </>
                  ) : (
                    <>
                      {isLogin ? "Login " : "Create account"}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
              
              {/* Divider */}
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => window.location.href = '/api/auth/google'}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-border bg-background/30 hover:bg-background/80 transition-colors duration-200"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  <span className="text-sm">Google</span>
                </button>
                <button
                  onClick={() => window.location.href = '/api/auth/facebook'}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-border bg-background/30 hover:bg-background/80 transition-colors duration-200"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                  </svg>
                  <span className="text-sm">Facebook</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Toggle auth mode */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleAuthMode}
                className="ml-1 text-primary hover:text-primary/80 font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
