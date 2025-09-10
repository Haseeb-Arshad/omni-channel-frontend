import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard";
import "./globals.css";
import { PerformanceMonitor } from '@/components/performance-monitor';
import { Playfair_Display } from "next/font/google";

// Self-host Playfair Display via next/font for broad serif coverage (fallback when Canela isn't available)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  variable: "--font-serif",
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
      <body className={`${playfair.variable}`}>
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
      </body>
    </html>
  );
}
