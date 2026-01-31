import { motion } from "framer-motion";
import React from 'react';

export default function MaskReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
    return (
        <div className="relative py-6 px-4">
            <motion.div
                initial={{ y: "110%", skewY: 5, opacity: 0 }}
                animate={{ y: "0%", skewY: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay }}
                className={className}
            >
                {children}
            </motion.div>
        </div>
    );
}
