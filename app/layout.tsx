import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard";
import "./globals.css";
import { PerformanceMonitor } from '@/components/performance-monitor';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OmniChannel AI - Connect Your Communication Channels",
  description: "A powerful omnichannel communication platform with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <RouteGuard>
              <div className="relative min-h-screen">
                {/* Background gradient effects */}
                <div className="fixed inset-0 z-[-1] gradient-bg overflow-hidden">
                  <div className="blur-dot top-20 left-20 opacity-60"></div>
                  <div className="blur-dot bottom-20 right-20 opacity-40"></div>
                  <div className="blur-dot top-1/2 left-1/2 opacity-30"></div>
                </div>
                
                {/* Main content */}
                <main className="animate-in">
                  {children}
                  {/* Performance monitor only shown in development */}
                  {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
                </main>
                
                {/* Toaster for notifications */}
                <Toaster position="top-right" closeButton richColors />
              </div>
            </RouteGuard>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
