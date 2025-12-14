import "@/app/minimalist-theme.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Minimalist OmniChannel",
    description: "A top-tier minimalistic experience",
};

export default function MinimalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="minimalist min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
            {children}
        </div>
    );
}
