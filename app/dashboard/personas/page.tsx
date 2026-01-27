export default function PersonasPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-[family-name:var(--font-heading)] text-[#242929]">AI Personas</h1>
                <p className="text-[#242929]/60 font-light">Define the personality and behavioral traits of your agents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* New Persona Card */}
                <div className="bg-white p-6 rounded-2xl border border-dashed border-[#242929]/20 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#fafafa] transition-colors min-h-[200px]">
                    <div className="w-12 h-12 bg-[#242929] rounded-full flex items-center justify-center mb-3 text-white text-2xl font-light">+</div>
                    <h3 className="font-medium text-[#242929]">Create New Persona</h3>
                </div>

                {/* Example Persona */}
                <div className="bg-white p-6 rounded-2xl border border-[#242929]/10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                    <h3 className="font-bold text-lg text-[#242929] mb-1">Empathetic Support</h3>
                    <p className="text-sm text-[#242929]/60 mb-4 line-clamp-2">
                        Professional, patient, and solution-oriented. Uses "we" language and avoids technical jargon.
                    </p>
                    <div className="flex gap-2">
                        <span className="text-[10px] bg-[#242929]/5 px-2 py-1 rounded text-[#242929]/70">Formal</span>
                        <span className="text-[10px] bg-[#242929]/5 px-2 py-1 rounded text-[#242929]/70">Helpful</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#242929]/10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                    <h3 className="font-bold text-lg text-[#242929] mb-1">Aggressive Sales</h3>
                    <p className="text-sm text-[#242929]/60 mb-4 line-clamp-2">
                        High energy, persuasive, and closer-focused. Emphasizes value and uses urgency triggers.
                    </p>
                    <div className="flex gap-2">
                        <span className="text-[10px] bg-[#242929]/5 px-2 py-1 rounded text-[#242929]/70">Persuasive</span>
                        <span className="text-[10px] bg-[#242929]/5 px-2 py-1 rounded text-[#242929]/70">Direct</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
