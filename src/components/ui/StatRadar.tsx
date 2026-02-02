import { motion } from "framer-motion";
import React from 'react';

// Config
interface StatPoint {
    label: string;
    value: number; // 0-5 for discrete levels
    angle: number; // degrees for label positioning
}

const stats: StatPoint[] = [
    { label: "AI / ML", value: 5, angle: -90 }, // Top
    { label: "DESIGN", value: 4, angle: -18 }, // Upper Right
    { label: "STRATEGY", value: 4, angle: 54 }, // Lower Right
    { label: "RESEARCH", value: 4, angle: 126 }, // Lower Left
    { label: "ENGINEERING", value: 5, angle: 198 }, // Upper Left
];

// Polar -> Cartesian
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

export default function StatRadar({ className = "" }: { className?: string }) {
    // Size adjustments for 650px viewbox
    const size = 700;
    const center = size / 2;
    const outerRadius = 184; // Increased by ~15% (160 -> 184)
    const innerRadius = 81;  // Increased by ~15% (70 -> 81)

    // Star path (10 points)
    const generateStarPath = () => {
        let path = "M";
        for (let i = 0; i < 5; i++) {
            // Outer point
            const outerAngle = -90 + (i * 72);
            const outerP = polarToCartesian(center, center, outerRadius, outerAngle);
            path += `${i === 0 ? "" : " L"}${outerP.x},${outerP.y}`;

            // Inner point
            const innerAngle = outerAngle + 36;
            const innerP = polarToCartesian(center, center, innerRadius, innerAngle);
            path += ` L${innerP.x},${innerP.y}`;
        }
        path += " Z";
        return path;
    };

    const starPath = generateStarPath();

    return (
        <div className={`relative ${className} flex flex-col items-center justify-center w-full`}>

            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto overflow-visible max-w-full">
                <defs>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9d50bb" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#9d50bb" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Star Shape */}
                <motion.g
                    initial={{ scale: 0.9, opacity: 0, rotate: 5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 5 }}
                    whileHover={{ rotate: 365, transition: { duration: 1.5, ease: "easeInOut" } }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="origin-center cursor-pointer"
                >
                    {/* Glow Layer */}
                    <path
                        d={starPath}
                        fill="url(#starGradient)"
                        stroke="#bfa2db" // Lighter purple for stroke
                        strokeWidth="3"
                        filter="url(#glow)"
                        className="drop-shadow-[0_0_15px_rgba(157,80,187,0.6)]"
                    />
                    {/* Inner Deco Lines */}
                    <path
                        d={starPath}
                        fill="none"
                        stroke="#9d50bb"
                        strokeWidth="1"
                        transform={`scale(0.7) translate(${center * 0.3}, ${center * 0.3})`} // Scuffed scaling fix
                        className="opacity-50"
                    />
                </motion.g>

                {/* Labels & Levels */}
                {stats.map((s, i) => {
                    // Push labels out further
                    const labelRadius = outerRadius + 60;
                    const labelPos = polarToCartesian(center, center, labelRadius, s.angle);

                    // Determine text anchor based on angle to keep text outside
                    let xOffset = 0;
                    if (s.angle > -90 && s.angle < 90) xOffset = 15; // Nudge right
                    if (s.angle > 90 && s.angle < 270) xOffset = -15; // Nudge left
                    if (s.angle === -90) xOffset = 0; // Top

                    return (
                        <motion.g
                            key={i}
                            initial={{ opacity: 0, x: (labelPos.x - center) * 0.5, y: (labelPos.y - center) * 0.5 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                        >
                            {/* Label */}
                            <text
                                x={labelPos.x + xOffset}
                                y={labelPos.y}
                                fill="white"
                                fontSize="36" // Bumped from 24
                                textAnchor={s.angle === -90 ? "middle" : (s.angle < 90 && s.angle > -90) ? "start" : "end"}
                                dominantBaseline="middle"
                                fontFamily="Inter" // Secondary Display
                                className="uppercase font-black tracking-widest drop-shadow-md select-none"
                                transform={`rotate(-5, ${labelPos.x}, ${labelPos.y})`} // Tilt
                            >
                                {s.label}
                            </text>

                            {/* Blocks */}
                            <g transform={`translate(${labelPos.x + (s.angle === -90 ? -30 : (s.angle < 90 && s.angle > -90 ? 0 : -60)) + xOffset}, ${labelPos.y + 16}) rotate(-5)`}>
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <rect
                                        key={level}
                                        x={(level - 1) * 14} // Spacing
                                        y={0}
                                        width="10"
                                        height="8"
                                        className={level <= s.value ? "fill-persona-purple drop-shadow-[0_0_4px_#9d50bb]" : "fill-gray-800"}
                                        stroke="none"
                                    />
                                ))}
                            </g>
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
}
