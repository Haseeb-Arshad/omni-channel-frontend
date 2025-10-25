import React from 'react'
import { ArrowUp, Paperclip } from 'lucide-react'
import '../../styling/hero-playground.css'

export default function PromptPlayground() {
    return (
        <section className="relative overflow-hidden bg-white">
            <div className="mx-auto max-w-[1280px] px-6 py-20">
                {/* Grid paper background */}
                <div className="playground-surface relative overflow-hidden rounded-[16px] border border-gray-200/70 bg-white">
                    <div className="playground-grid absolute inset-0" aria-hidden />

                    <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
                        <h2 className="text-[36px] leading-[1.15] tracking-[-0.02em] text-gray-900 md:text-[40px]">
                            Good morning, Andrew
                        </h2>
                        <p className="mt-3 text-[16px] text-gray-500">
                            Describe what you want to automate — we’ll
                            <br className="hidden sm:block" />
                            take it from there.
                        </p>

                        {/* Prompt card */}
                        <div className="mx-auto mt-10 max-w-2xl">
                            <div className="relative rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm">
                                <p className="text-[15px] leading-7 text-gray-700">
                                    Monitor linear for issues marked as done or completed. Filter for
                                    issues tagged with{' '}
                                    <span className="rounded-md bg-blue-50 px-2 py-[2px] text-[13px] font-medium text-blue-700">feature</span>{' '}
                                    or{' '}
                                    <span className="rounded-md bg-blue-50 px-2 py-[2px] text-[13px] font-medium text-blue-700">bug</span>{' '}
                                    that should be included in release notes. For each qualifying issue, append an entry to the
                                    release notes page.
                                </p>

                                {/* bottom actions */}
                                <div className="mt-4 flex items-center justify-between">
                                    <button
                                        type="button"
                                        aria-label="Attach"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50"
                                    >
                                        <Paperclip className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        aria-label="Submit"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm transition hover:bg-black"
                                    >
                                        <ArrowUp className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p className="mx-auto mt-12 max-w-2xl text-[14px] leading-6 text-gray-500">
                            Automate your life with natural language, driving the software you’re already familiar with.
                            Change what your agent does anytime—with plain English.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}


