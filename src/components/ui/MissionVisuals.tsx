
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function MissionVisuals() {
    // Slow drift parallax
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Right Side Visuals */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 h-full z-0 opacity-60 mix-blend-hard-light">

                {/* Floating Shapes */}
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[10%] opacity-20"
                >
                    <div className="w-64 h-64 bg-persona-red transform rotate-45 border-4 border-black"></div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[60%] right-[20%] opacity-30"
                >
                    <div className="w-40 h-80 bg-black border-2 border-white transform -skew-x-12"></div>
                </motion.div>

                {/* Shards */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] right-[30%] opacity-40"
                >
                    <div className="text-9xl text-persona-black font-display">★</div>
                </motion.div>

                <motion.div
                    animate={{ x: [0, -15, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[20%] right-[5%] opacity-20"
                >
                    <div className="w-96 h-2 bg-persona-black transform -rotate-12"></div>
                </motion.div>

            </div>
        </div>
    );
}
