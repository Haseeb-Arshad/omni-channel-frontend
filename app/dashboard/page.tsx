"use client";

import { Activity, ArrowUpRight, MessageSquare, Users, Zap } from "lucide-react";

// Mock Data for the chart styling
const activityData = [40, 65, 55, 80, 70, 90, 85];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-[family-name:var(--font-heading)] text-[#242929] mb-2">
                        Welcome back, Alex.
                    </h1>
                    <p className="text-[#242929]/60 font-light">
                        Your autonomous workforce is running smoothly today.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-[#242929]/40">System Status</div>
                    <div className="flex items-center gap-2 text-[#242929] font-medium">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        All Systems Operational
                    </div>
                </div>
            </div>

            {/* Stats Grid - Keeping functionality but improving 'Oboe' look (softer borders, clean white) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Agents", value: "12", change: "+2", icon: Zap },
                    { label: "Conversations", value: "1,248", change: "+18%", icon: MessageSquare },
                    { label: "Avg. Response", value: "1.4s", change: "-12%", icon: Activity },
                    { label: "Success Rate", value: "98.5%", change: "+0.5%", icon: Users },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#242929]/5 hover:border-[#242929]/10 hover:shadow-sm transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-[#242929]/5 rounded-xl text-[#242929] group-hover:scale-110 transition-transform">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <ArrowUpRight className="w-3 h-3" />
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-3xl font-[family-name:var(--font-heading)] text-[#242929] mb-1">
                            {stat.value}
                        </div>
                        <div className="text-sm text-[#242929]/40 font-medium">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-[#242929]/5 flex flex-col justify-between min-h-[400px]">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-[family-name:var(--font-heading)] text-[#242929]">Communication Volume</h3>
                            <p className="text-sm text-[#242929]/40">Incoming messages across all channels</p>
                        </div>
                        <select className="bg-[#fafafa] border border-[#242929]/10 rounded-lg text-sm px-3 py-1.5 outline-none text-[#242929]">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    {/* CSS-only Chart Placeholder */}
                    <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
                        {activityData.map((h, i) => (
                            <div key={i} className="w-full bg-[#242929]/5 rounded-t-lg relative group overflow-hidden" style={{ height: `${h}%` }}>
                                <div className="absolute bottom-0 left-0 w-full bg-[#242929] h-0 group-hover:h-full transition-all duration-500 opacity-80 ease-out" />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between px-4 text-xs text-[#242929]/30 font-medium mt-4">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Right Column: Live Feed */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-[#242929]/5 h-full">
                    <h3 className="text-xl font-[family-name:var(--font-heading)] text-[#242929] mb-6">Live Activity</h3>
                    <div className="space-y-6">
                        {[
                            { type: "Success", msg: "SalesBot closed a deal", time: "2m ago" },
                            { type: "New User", msg: "New signup from Web", time: "15m ago" },
                            { type: "System", msg: "Knowledge base synced", time: "1h ago" },
                            { type: "Alert", msg: "High traffic detected", time: "3h ago" },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start pb-6 border-b border-[#242929]/5 last:border-0 last:pb-0">
                                <div className={`w-2 h-2 mt-2 rounded-full ${item.type === 'Alert' ? 'bg-red-500' : 'bg-[#242929]'}`} />
                                <div>
                                    <p className="text-sm font-medium text-[#242929] leading-tight">{item.msg}</p>
                                    <p className="text-xs text-[#242929]/40 mt-1">{item.time} • {item.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 rounded-xl border border-[#242929]/10 text-sm font-medium text-[#242929]/60 hover:border-[#242929] hover:text-[#242929] transition-all">
                        View System Logs
                    </button>
                </div>
            </div>
        </div>
    );
}
