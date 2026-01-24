export default function KnowledgePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-[family-name:var(--font-heading)] text-[#242929]">Knowledge Base</h1>
                <p className="text-[#242929]/60 font-light">Manage the data sources your agents use to learn.</p>
            </div>

            <div className="bg-white p-12 rounded-2xl border border border-dashed border-[#242929]/20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#242929]/5 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#242929]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-[#242929] mb-1">Upload Knowledge Sources</h3>
                <p className="text-sm text-[#242929]/50 mb-6 max-w-sm">
                    Drag and drop PDF, DOCX, or TXT files here to train your agents. You can also connect external URLs.
                </p>
                <button className="minimalist-btn text-sm px-6 py-3 bg-[#242929]">Browse Files</button>
            </div>
        </div>
    );
}
