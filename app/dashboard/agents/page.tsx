"use client";
import Link from "next/link";

export default function AgentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-[family-name:var(--font-heading)] text-[#242929]">My Agents</h1>
                    <p className="text-[#242929]/60 font-light">Deploy and manage your autonomous workforce.</p>
                </div>
                <Link href="/dashboard/agents/new">
                    <button className="minimalist-btn text-sm px-6 py-2 bg-[#242929]">+ Deploy New Agent</button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#242929]/10 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-[#fafafa] border-b border-[#242929]/5 text-[#242929]/60">
                            <th className="p-4 font-medium">Agent Name</th>
                            <th className="p-4 font-medium">Persona</th>
                            <th className="p-4 font-medium">Active Channels</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#242929]/5 text-[#242929]">
                        {[1, 2, 3].map((row) => (
                            <tr key={row} className="hover:bg-[#fafafa] transition-colors">
                                <td className="p-4 font-medium">
                                    {row === 1 ? 'Sales Assistant' : row === 2 ? 'Tech Support' : 'Onboarding Guide'}
                                </td>
                                <td className="p-4 text-[#242929]/70">
                                    {row === 1 ? 'Aggressive Sales' : 'Empathetic Support'}
                                </td>
                                <td className="p-4">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                                        <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${row === 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${row === 1 ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                        {row === 1 ? 'Active' : 'Paused'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-[#242929]/40 hover:text-[#242929] font-medium">Configure</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
