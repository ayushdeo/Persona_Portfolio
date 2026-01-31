import React from 'react';
import { motion } from 'framer-motion';

interface PersonaCommandButtonsProps {
    mode?: 'red' | 'blue' | 'yellow' | 'purple';
}

export default function PersonaCommandButtons({ mode = 'red' }: PersonaCommandButtonsProps) {
    const links = [
        { label: "GITHUB", url: "https://github.com/ayushdeo", delay: 0 },
        { label: "LINKEDIN", url: "http://www.linkedin.com/in/ayushdeo", delay: 0.1 },
        { label: "HANDSHAKE", url: "https://app.joinhandshake.com/profiles/ayushdeo", delay: 0.2 }
    ];

    // Map mode to accent colors for hover
    const accentColorClass = {
        red: "group-hover:bg-persona-red group-hover:text-white",
        blue: "group-hover:bg-persona-blue group-hover:text-white",
        yellow: "group-hover:bg-persona-yellow group-hover:text-black", // Yellow text usually black
        purple: "group-hover:bg-persona-purple group-hover:text-white",
    }[mode];

    const borderColorClass = {
        red: "group-hover:border-persona-red",
        blue: "group-hover:border-persona-blue",
        yellow: "group-hover:border-persona-yellow",
        purple: "group-hover:border-persona-purple",
    }[mode];

    // Default text color matches the page theme (for visibility on white background)
    const textColorClass = {
        red: "text-persona-red",
        blue: "text-persona-blue",
        yellow: "text-yellow-600", // Darkened for readability on white
        purple: "text-persona-purple",
    }[mode];

    return (
        <div className="flex items-center gap-1 z-50 relative">
            {links.map((link, i) => (
                <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative group cursor-pointer block select-none`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: link.delay, duration: 0.4, ease: "backOut" }}
                    whileHover="hover"
                    whileTap="tap"
                >
                    {/* Background layer for depth/flash */}
                    <motion.div
                        className={`absolute inset-0 bg-black transform skew-x-[-12deg] translate-x-1 translate-y-1 ${borderColorClass} border-2 transition-colors duration-0`}
                        variants={{
                            hover: { x: 4, y: 4, skewX: -12 },
                            tap: { x: 0, y: 0, skewX: -12 }
                        }}
                    />

                    {/* Main Button Block */}
                    <motion.div
                        className={`relative bg-white border-2 border-black transform skew-x-[-12deg] px-4 py-1 ${textColorClass} ${accentColorClass} transition-colors duration-100 ease-linear`}
                        variants={{
                            hover: { rotate: i % 2 === 0 ? 3 : -3, skewX: -12, scale: 1.05 },
                            tap: { rotate: 0, skewX: -12, scale: 0.95 }
                        }}
                    >
                        <span className="block font-display text-lg tracking-tight uppercase transform skew-x-[12deg]">
                            {link.label}
                        </span>
                    </motion.div>
                </motion.a>
            ))}
        </div>
    );
}
