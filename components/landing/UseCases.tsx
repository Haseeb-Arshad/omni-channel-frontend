import React from 'react'

// Minimal inline brand glyphs to match the screenshot styling
function NotionGlyph() {
    return (
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
            <rect x="6" y="6" width="36" height="36" rx="8" fill="#111" />
            <path d="M18 16h12v2.6h-3.7V32H23V18.6H18V16z" fill="#fff" />
        </svg>
    )
}

function SlackGlyph() {
    return (
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
            <rect x="6" y="6" width="36" height="36" rx="12" fill="#fff" />
            <g transform="translate(12,12)">
                <rect width="8" height="4" rx="2" x="8" y="0" fill="#36C5F0" />
                <rect width="4" height="8" rx="2" x="20" y="8" transform="rotate(90 22 12)" fill="#36C5F0" />
                <rect width="8" height="4" rx="2" x="8" y="20" fill="#2EB67D" />
                <rect width="4" height="8" rx="2" x="0" y="8" transform="rotate(90 2 12)" fill="#2EB67D" />
                <rect width="4" height="8" rx="2" x="0" y="8" fill="#ECB22E" />
                <rect width="8" height="4" rx="2" x="8" y="0" transform="rotate(90 12 2)" fill="#ECB22E" />
                <rect width="4" height="8" rx="2" x="20" y="8" fill="#E01E5A" />
                <rect width="8" height="4" rx="2" x="8" y="20" transform="rotate(90 12 22)" fill="#E01E5A" />
            </g>
        </svg>
    )
}

function GlobeGlyph() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-500" aria-hidden>
            <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2m0 2c2.6 0 4.9 1.4 6.2 3.5h-3a15 15 0 0 0-2.6-3.1C12.4 4.1 12.2 4 12 4m-2.6.4c-.9.8-1.7 1.9-2.3 3.1H4.2A8.02 8.02 0 0 1 9.4 4.4M4 12c0-.7.1-1.3.3-2h3.3c-.1.6-.1 1.3-.1 2s0 1.4.1 2H4.3c-.2-.7-.3-1.3-.3-2m.2 3.5h2.9c.6 1.2 1.4 2.3 2.3 3.1a8.02 8.02 0 0 1-5.2-3.1m7.8 4.5c-.2 0-.4-.1-.6-.2a15 15 0 0 1-2.6-3.1h6.4c-.7 1.2-1.6 2.3-2.6 3.1-.2.1-.4.2-.6.2m3.9-1.4c.9-.8 1.7-1.9 2.3-3.1h3a8.02 8.02 0 0 1-5.3 3.1M19.7 14H16.4c.1-.6.1-1.3.1-2s0-1.4-.1-2h3.3c.2.7.3 1.3.3 2 0 .7-.1 1.3-.3 2m-3.5-6.5h2.9a8.02 8.02 0 0 0-5.2-3.1c.9.8 1.7 1.9 2.3 3.1M8 12c0-.8.1-1.6.2-2.4h7.6c.1.8.2 1.6.2 2.4s-.1 1.6-.2 2.4H8.2c-.1-.8-.2-1.6-.2-2.4" />
        </svg>
    )
}

function GmailGlyph() {
    return (
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
            <rect x="6" y="12" width="36" height="24" rx="4" fill="#fff" stroke="#e5e7eb" />
            <path d="M8 14l16 12L40 14" fill="none" stroke="#EA4335" strokeWidth="4" />
            <path d="M8 34V16l16 12 16-12v18" fill="none" stroke="#34A853" strokeWidth="3" />
        </svg>
    )
}

function CalendarGlyph() {
    return (
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
            <rect x="8" y="10" width="32" height="28" rx="6" fill="#fff" stroke="#e5e7eb" />
            <rect x="8" y="16" width="32" height="6" fill="#1a73e8" />
            <rect x="14" y="26" width="8" height="8" rx="2" fill="#1a73e8" />
        </svg>
    )
}

type Card = {
    title: string
    description: string
    icons: ('notion' | 'slack' | 'globe' | 'gmail' | 'calendar')[]
}

const cards: Card[] = [
    {
        title: 'Analyze this startup (Cofounder)',
        description:
            'Run a VC‑style startup deep dive: build an analysis spreadsheet, research online, benchmark competitors, and enrich staff profiles.',
        icons: ['globe']
    },
    {
        title: "What’s going on in engineering",
        description:
            "Get a snapshot of your engineering team’s status, priorities, and challenges.",
        icons: ['notion', 'slack']
    },
    {
        title: 'Make me a resume based on what you know',
        description:
            'Create a public‑ready PDF resume from known data and online research, omitting all personal contact details.',
        icons: ['globe']
    },
    {
        title: 'Make this into pixel art',
        description:
            'Convert any image into retro pixel art with adjustable pixel size.',
        icons: []
    },
    {
        title: 'Monitor Tech Blogs and Auto‑Email New Posts Every Monday',
        description:
            'Monitor top AI and engineering blogs for new posts and email a Monday summary with key takeaways and links.',
        icons: ['globe']
    },
    {
        title: 'Daily calendar briefing',
        description:
            'Each morning, summarize your day’s calendar with key context and suggested prep.',
        icons: ['gmail', 'calendar']
    }
]

export default function UseCases() {
    return (
        <section className="relative bg-white">
            <div className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="mb-10 text-center text-[22px] font-medium tracking-[-0.01em] text-gray-900">
                    Here’s some of the things Cofounder can do for you
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((c, idx) => (
                        <article
                            key={idx}
                            className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            <h3 className="text-[15px] font-semibold text-gray-900">{c.title}</h3>
                            <p className="mt-3 text-[14px] leading-6 text-gray-600">{c.description}</p>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {c.icons.includes('globe') && (
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                                            <GlobeGlyph />
                                        </span>
                                    )}
                                    {c.icons.includes('notion') && (
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white">
                                            <NotionGlyph />
                                        </span>
                                    )}
                                    {c.icons.includes('slack') && (
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white">
                                            <SlackGlyph />
                                        </span>
                                    )}
                                    {c.icons.includes('gmail') && (
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white">
                                            <GmailGlyph />
                                        </span>
                                    )}
                                    {c.icons.includes('calendar') && (
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white">
                                            <CalendarGlyph />
                                        </span>
                                    )}
                                </div>
                                <button
                                    className="invisible translate-x-1 rounded-full bg-gray-900 px-3 py-1.5 text-[12px] font-medium text-white opacity-0 shadow-sm transition-all duration-200 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100"
                                    aria-label="See it work"
                                >
                                    See it work
                                    <span className="ml-1">›</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}



