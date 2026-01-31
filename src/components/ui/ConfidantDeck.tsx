import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from 'react';

const experiences = [
    {
        role: "AI / ML INTERN",
        company: "TATA CONSULTANCY SERVICES",
        duration: "JAN 2025 — JUN 2025",
        arcana: "THE MAGICIAN",
        desc: [
            "Designed a graph-based fraud detection system improving investigation efficiency by 25%.",
            "Reduced analyst query latency from 3ms to 1ms.",
            "Automated 60% of manual decision workflows using a multi-agent Copilot Studio hierarchy.",
            "Improved model trust by instrumenting telemetry, increasing action success by 20% and reducing false positives by 35%.",
            "Deployed multi-agent reporting pipelines for global banks."
        ],
        skills: ["GRAPH ANALYTICS", "AZURE", "COPILOT STUDIO", "NLP"]
    },
    {
        role: "CO-FOUNDER",
        company: "BELLEVIDCO",
        duration: "JUN 2023 — JUN 2025",
        arcana: "THE EMPEROR",
        desc: [
            "Generated $12,000 in revenue at ~70% margins.",
            "Led design strategy, branding, and digital execution.",
            "Leveraged 5+ years of cumulative design & media experience.",
            "Managed a team of 8+ specialists.",
            "Scaled reach by 200% and reduced media costs by 25% via analytics-driven optimization."
        ],
        skills: ["STRATEGY", "BRANDING", "ANALYTICS", "LEADERSHIP"]
    },
    {
        role: "AI INTERN",
        company: "COMPUSOFT ADVISORS",
        duration: "MAY 2024 — JUL 2024",
        arcana: "THE HIEROPHANT",
        desc: [
            "Reduced manual data-entry effort by 50% via AI-powered DMS automation.",
            "Built solutions using Azure Power Apps & Power Automate.",
            "Orchestrated Copilot Studio workflows with telemetry for usage visibility."
        ],
        skills: ["POWER APPS", "AUTOMATION", "COPILOT STUDIO", "AZURE"]
    },
    {
        role: "PRO-BONO CONSULTANT",
        company: "BRUCE SMOLEN BOOKS",
        duration: "OCT 2025 — DEC 2025",
        arcana: "THE HERMIT",
        desc: [
            "Built feasibility and profitability models using Amazon KDP benchmarks.",
            "Conducted pricing strategy and scenario analysis.",
            "Designed launch workflows and conversion readiness systems."
        ],
        skills: ["PRICING MODELS", "STRATEGY", "ANALYTICS"]
    }
];

export default function ConfidantDeck() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextCard = () => {
        setActiveIndex((prev) => (prev + 1) % experiences.length);
    };

    return (
        <div className="relative w-full max-w-[500px] h-[700px] flex items-center justify-center isolate select-none" onClick={nextCard}>

            <AnimatePresence mode="popLayout" initial={false}>
                {/* Background Stack Illusion (Static) */}
                <div className="absolute inset-0 w-[340px] md:w-[420px] h-[580px] bg-gray-800 border-4 border-gray-600 transform rotate-3 z-0 translate-x-6 translate-y-6 mx-auto"></div>
                <div className="absolute inset-0 w-[340px] md:w-[420px] h-[580px] bg-persona-red border-4 border-red-900 transform -rotate-2 z-0 translate-x-[-10px] translate-y-[-10px] mx-auto opacity-80"></div>

                <motion.div
                    key={activeIndex}
                    className="absolute w-[340px] md:w-[420px] bg-white border-4 border-gray-200 p-6 shadow-2xl cursor-pointer z-10 h-[600px] flex flex-col"
                    initial={{ x: 100, opacity: 0, rotate: 10, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, rotate: -2, scale: 1 }}
                    exit={{ x: -100, opacity: 0, rotate: -10, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    whileHover={{ scale: 1.02, rotate: 0 }}
                >
                    {/* Content Wrapper */}
                    <div className="flex-1 flex flex-col h-full overflow-hidden">

                        {/* Header */}
                        <div className="text-center border-b-2 border-black pb-2 mb-4 shrink-0">
                            <h3 className="font-display text-xs text-gray-400 uppercase tracking-widest">{experiences[activeIndex].arcana}</h3>
                            <h2 className="font-display text-2xl md:text-3xl text-black uppercase leading-none">{experiences[activeIndex].role}</h2>
                        </div>

                        {/* Image / Company */}
                        <div className="w-full h-32 bg-persona-black mb-4 relative overflow-hidden shrink-0 group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(230,0,18,0.5)_0%,transparent_70%)] opacity-60"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white font-display text-2xl z-10 relative text-center px-4">
                                {experiences[activeIndex].company}
                            </div>
                            {/* Accents */}
                            <div className="absolute top-0 right-0 w-8 h-8 bg-persona-yellow transform rotate-45 translate-x-4 -translate-y-4"></div>
                        </div>

                        {/* Scrollable Details Area */}
                        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-persona-red scrollbar-track-gray-100">
                            <div className="mb-4">
                                <p className="font-display text-persona-red text-xs mb-1">DURATION</p>
                                <p className="font-ui font-bold text-black text-sm">{experiences[activeIndex].duration}</p>
                            </div>

                            <div className="mb-4">
                                <p className="font-display text-persona-yellow text-xs mb-1 bg-black inline-block px-1 text-white transform -skew-x-12">MISSION REPORT</p>
                                <ul className="list-disc list-outside ml-4 mt-2 font-ui text-gray-700 text-xs space-y-2 leading-relaxed">
                                    {/* @ts-ignore */}
                                    {experiences[activeIndex].desc.map((item, idx) => (
                                        <li key={idx} className="pl-1">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-2 pb-4">
                                {experiences[activeIndex].skills.map(skill => (
                                    <span key={skill} className="px-2 py-1 bg-persona-yellow text-black text-[10px] font-bold uppercase border border-black transform hover:scale-105 transition-transform">{skill}</span>
                                ))}
                            </div>
                        </div>

                        {/* Footer Hint */}
                        <div className="mt-auto pt-2 border-t border-gray-200 text-left">
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest animate-pulse">Click to Next File</span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
