"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard";
import { PerformanceMonitor } from '@/components/performance-monitor';

export default function TempLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <AuthProvider>
                <RouteGuard>
                    <div className="app-root">
                        <main>
                            {children}
                            {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
                        </main>
                        <Toaster position="top-right" closeButton richColors />
                    </div>
                </RouteGuard>
            </AuthProvider>
        </ThemeProvider>
    );
}
