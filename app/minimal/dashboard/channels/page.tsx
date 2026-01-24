export default function ChannelsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-[family-name:var(--font-heading)] text-[#242929]">Integrations & Channels</h1>
                <p className="text-[#242929]/60 font-light">Connect your agents to the world.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['WhatsApp Business', 'Slack Workspace', 'Gmail / Email', 'Telegram Bot', 'Website Widget', 'Voice Gateway'].map((channel, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-[#242929]/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#242929]/5 rounded-lg flex items-center justify-center font-bold text-[#242929] text-xs">
                                {channel.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-medium text-[#242929] text-sm">{channel}</h3>
                                <p className="text-[10px] text-[#242929]/50">
                                    {i < 2 ? 'Connected' : 'Not Configured'}
                                </p>
                            </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${i < 2 ? 'bg-green-500' : 'bg-[#242929]/20'}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
