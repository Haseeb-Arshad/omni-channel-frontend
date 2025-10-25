import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

const tasks = [
    'Calendar Sync for 7/15',
    'Linear roadmap sync for 7/15',
    'Slack messages sync',
    'Competitors research',
    'CRM Enrichment',
    'Notion roadmap update',
]

export default function KnowledgebaseAgent() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-6xl gap-10 px-6 py-20 lg:grid lg:grid-cols-2">
                {/* Illustration with glass todo list */}
                <div className="relative h-[520px] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <Image
                        src="/img/Login-image-left.png"
                        alt="Scenic cloud illustration"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Floating todo list card */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/60 bg-white/55 p-4 shadow-xl backdrop-blur-md">
                        <div className="mb-2 flex items-center justify-between">
                            <div className="text-[14px] font-semibold text-gray-800">Todo List</div>
                            <span className="rounded-full bg-white/70 px-3 py-1 text-[12px] font-medium text-gray-700 border border-white/80">100%</span>
                        </div>
                        <div className="overflow-hidden rounded-xl border border-white/70">
                            {tasks.map((t, i) => (
                                <div
                                    key={t}
                                    className={[
                                        'flex items-center justify-between bg-white/70 px-4 py-4 backdrop-blur',
                                        i !== tasks.length - 1 ? 'border-b border-white/70' : '',
                                    ].join(' ')}
                                >
                                    <span className="text-[14px] text-gray-800">{t}</span>
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/80 text-emerald-600 shadow">
                                        <Check className="h-4 w-4" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copy */}
                <div className="mt-8 lg:mt-0">
                    <h3 className="text-2xl font-semibold tracking-[-0.01em] text-gray-900 md:text-3xl">Knowledgebase Agent</h3>
                    <p className="mt-5 max-w-[520px] text-[15px] leading-7 text-gray-600">
                        Connect your email, CRM, calendar, and Notion to build a complete and always‑updated memory for your
                        business.
                    </p>
                    <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-gray-600">
                        Cofounder Knowledgebase runs 24/7 to keep your business memory updated.
                    </p>
                </div>
            </div>
        </section>
    )
}




