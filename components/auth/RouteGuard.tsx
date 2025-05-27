"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip redirection logic if we're still loading
    if (isLoading) {
      return;
    }

    // Protected routes require authentication
    const isProtectedRoute = pathname.startsWith('/dashboard');
    
    // Redirect unauthenticated users away from protected routes
    if (!isAuthenticated && isProtectedRoute) {
      console.log('[RouteGuard] Redirecting to auth page');
      router.push('/auth');
      return;
    }
    
    // Redirect authenticated users away from the auth page
    if (isAuthenticated && pathname === '/auth') {
      console.log('[RouteGuard] Redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Show loading indicator while checking authentication
  if ((isLoading || (!isAuthenticated && pathname.startsWith('/dashboard')))) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/95">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Loading...</h3>
          <p className="text-muted-foreground">Please wait while we verify your session</p>
        </div>
      </div>
    );
  }

  // Render the children only if the user is allowed to access the route
  return <>{children}</>;
};

export default RouteGuard;
