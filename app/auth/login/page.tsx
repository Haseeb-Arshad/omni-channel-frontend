"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Eye, EyeOff, Mail, 
  Lock, Loader2, AlertCircle,
  MessageCircle, Shield, Bot
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    const { email, password, remember } = formData;
    
    // Validate inputs
    if (!email || !password) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    try {
      // Handle login
      console.log('[LoginPage] Attempting login with:', { email, remember });
      const success = await login(email, password, remember);
      console.log('[LoginPage] Login success status:', success);
      
      if (!success && !formError) {
        setFormError('Login failed. Please check your credentials.');
      }
    } catch (error: any) {
      console.error('[LoginPage] handleSubmit error:', error);
      setFormError(error.message || 'Authentication failed');
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
              <p className="text-xl opacity-80">Welcome back to your channels.</p>
            </motion.div>
            
            <motion.div variants={containerVariants} className="space-y-6">
              {/* Feature highlights */}
              {[
                { 
                  icon: <MessageCircle className="h-5 w-5" />, 
                  title: "All channels in one place", 
                  desc: "SMS, WhatsApp, Telegram and more" 
                },
                { 
                  icon: <Bot className="h-5 w-5" />, 
                  title: "AI-powered assistance", 
                  desc: "Intelligent responses for your customers" 
                },
                { 
                  icon: <Shield className="h-5 w-5" />, 
                  title: "Secure & reliable", 
                  desc: "Your data is protected with advanced encryption" 
                }
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
      
      {/* Right panel - login form */}
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
            <p className="text-muted-foreground">Welcome back to your channels.</p>
          </div>
          
          {/* Login form container */}
          <motion.div 
            className="rounded-2xl p-8 backdrop-blur-sm bg-card/80 border border-border/50 shadow-xl"
            layout
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
                <p className="text-muted-foreground text-sm">Sign in to your account</p>
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
                      placeholder="Enter password"
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
                
                {/* Remember me & Forgot password */}
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
                      Signing in...
                    </>
                  ) : (
                    <>
                      Log in
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
              
              {/* Register link */}
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
