import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard";
import "./globals.css";
import "./minimalist-theme.css";
import { PerformanceMonitor } from '@/components/performance-monitor';
import { Playfair_Display, Public_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "OmniAgent - Autonomous Intelligence",
  description: "Deploy agentic AI across every channel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/abc1def.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;500;600;700&family=Minion+Pro:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={`${playfair.variable} ${publicSans.variable} minimalist selection:bg-[#242929] selection:text-white`}>
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
