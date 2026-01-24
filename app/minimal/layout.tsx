import "@/app/minimalist-theme.css";
import { Metadata } from "next";
// Assuming Public Sans is loaded here or via CSS import, but adding Next.js font optimization is better
import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-body",
});

export const metadata: Metadata = {
    title: "OmniAgent - Autonomous Intelligence",
    description: "Deploy agentic AI across every channel.",
};

export default function MinimalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`minimalist min-h-screen bg-white text-charcoal selection:bg-charcoal selection:text-white ${publicSans.variable}`}>
            {children}
        </div>
    );
}
