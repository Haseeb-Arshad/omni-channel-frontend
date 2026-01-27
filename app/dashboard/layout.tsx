"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Network,
    LayoutDashboard,
    Database,
    Users,
    Share2,
    Bot,
    MessageSquare,
    Settings,
    LogOut,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Database, label: "Knowledge Base", href: "/dashboard/knowledge" },
    { icon: Users, label: "AI Personas", href: "/dashboard/personas" },
    { icon: Share2, label: "Channels", href: "/dashboard/channels" },
    { icon: Bot, label: "Agents", href: "/dashboard/agents" },
    { icon: MessageSquare, label: "Communication", href: "/dashboard/communication" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-transparent">
            {/* 
               Background is handled by body .minimalist class with the linear-gradient.
               We keep the layout transparent to let it shine through, 
               or use specific semi-transparent backgrounds.
            */}

            {/* Sidebar - Restored fixed detailed sidebar but with Oboe-ish styling (cleaner, minimal borders) */}
            <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-[#242929]/5 flex flex-col fixed inset-y-0 z-50">
                <div className="p-8 pb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#242929] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#242929]/10">
                        <Network className="w-4 h-4" />
                    </div>
                    <span className="font-[family-name:var(--font-heading)] text-lg text-[#242929] tracking-tight font-medium">OmniAgent</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                                    isActive
                                        ? "bg-[#242929] text-white shadow-md shadow-[#242929]/10"
                                        : "text-[#242929]/60 hover:bg-[#242929]/5 hover:text-[#242929]"
                                )}
                            >
                                <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-[#242929]/60 group-hover:text-[#242929]")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#242929]/5 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#242929]/60 hover:bg-[#242929]/5 hover:text-[#242929] transition-all">
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500/70 hover:bg-red-50 hover:text-red-600 transition-all">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 min-h-screen flex flex-col">
                {/* Top Header - Restored */}
                <header className="h-16 px-8 flex items-center justify-between bg-white/40 backdrop-blur-sm sticky top-0 z-40 border-b border-[#242929]/5">
                    <div className="text-sm text-[#242929]/40 font-medium">
                        Dashboard / <span className="text-[#242929]">{sidebarItems.find(i => i.href === pathname)?.label || 'Overview'}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#242929]/5 text-[#242929]/60 transition-colors relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-[#242929]/10">
                            <div className="text-right hidden sm:block">
                                <div className="text-xs font-semibold text-[#242929]">Alex Chen</div>
                                <div className="text-[10px] text-[#242929]/50">Enterprise Admin</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#242929]/10 flex items-center justify-center text-[#242929] font-bold text-xs">AC</div>
                        </div>
                    </div>
                </header>

                {/* Content Container */}
                <div className="p-8 max-w-[1600px] w-full mx-auto animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
