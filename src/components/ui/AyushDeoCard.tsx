
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function AyushDeoCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    // Physics Simulation
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = event.clientX - rect.left;
        const mouseYVal = event.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct * 20); // Tilt intensity
        y.set(yPct * 20);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Transforms
    const rotateX = useTransform(mouseY, (value) => value * -1); // Invert axis
    const rotateY = useTransform(mouseX, (value) => value);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d"
            }}
            className="perspective-1000 bg-black text-white p-4 border-2 border-white inline-block shadow-[6px_6px_0px_#e60012] cursor-default relative group hover:border-persona-red transition-colors duration-300"
        >
            {/* Inner Content */}
            <div style={{ transform: "translateZ(20px)" }} className="relative z-10 pointer-events-none">
                <h2 className="text-2xl md:text-3xl font-display text-persona-yellow leading-none group-hover:text-white transition-colors">AYUSH DEO</h2>
                <div className="w-full h-1 bg-white my-1 group-hover:bg-persona-red transition-colors"></div>
                <p className="font-ui font-bold text-sm tracking-widest uppercase mb-2 text-gray-200">
                    Product × AI × Design
                </p>
                <p className="font-ui text-xs text-gray-400 max-w-[220px] leading-tight group-hover:text-white transition-colors">
                    Product-focused engineer operating at the intersection of artificial intelligence, design systems, and scalable software.
                </p>
            </div>

            {/* Subtle Shine/Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
        </motion.div>
    );
}
