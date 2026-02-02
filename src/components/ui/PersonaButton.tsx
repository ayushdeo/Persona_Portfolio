import { motion } from "framer-motion";
import React from 'react';

interface Props {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    external?: boolean;
}

export default function PersonaButton({ href, children, onClick, className = "", external = false }: Props) {
    // Link vs Button
    const Component = href ? motion.a : motion.button;

    return (
        <Component
            href={href}
            onClick={onClick}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={`relative group inline-flex items-center justify-center font-display text-xl uppercase tracking-widest px-8 py-3 bg-persona-black text-persona-white border-4 border-persona-red overflow-hidden cursor-pointer ${className}`}
            whileHover={{
                rotate: -2,
                scale: 1.05,
                boxShadow: "5px 5px 0px 0px #ffffff",
                borderColor: "#ffffff"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
            <span className="relative z-10 group-hover:text-persona-red transition-colors duration-200 flex items-center gap-2">
                {children}
            </span>

            {/* Hover fill */}
            <motion.div
                className="absolute inset-0 bg-persona-white z-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
            />

            {/* Corners */}
            <div className="absolute top-0 right-0 p-1">
                <div className="w-2 h-2 bg-persona-yellow"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-1">
                <div className="w-2 h-2 bg-persona-yellow"></div>
            </div>
        </Component>
    );
}
