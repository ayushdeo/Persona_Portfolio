import { motion } from "framer-motion";
import React from 'react';

interface Props {
    skill: string;
    category: string;
    level: number; // 1-5
    description?: string;
    delay?: number;
}

export default function StatCard({ skill, category, level, description, delay = 0 }: Props) {
    return (
        <motion.div
            className="bg-persona-black border-2 border-persona-white p-4 relative group cursor-default"
            initial={{ opacity: 0, y: 50, skewX: -5 }}
            animate={{ opacity: 1, y: 0, skewX: -5 }}
            transition={{ delay, type: "spring", stiffness: 100, damping: 12 }}
            whileHover={{
                scale: 1.05,
                zIndex: 10,
                borderColor: "#f5c400",
                boxShadow: "5px 5px 0px 0px #f5c400"
            }}
        >
            <div className="transform skew-x-5"> {/* Unskew content */}
                <h4 className="text-gray-500 font-ui font-black text-xs tracking-widest uppercase mb-1">{category}</h4>
                <h3 className="text-2xl font-display text-white uppercase group-hover:text-persona-yellow transition-colors">{skill}</h3>

                {description && (
                    <p className="font-ui text-xs text-gray-300 mt-2 mb-3 border-l-2 border-persona-red pl-2">
                        {description}
                    </p>
                )}

                <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-8 transform -skew-x-12 ${i < level
                                ? "bg-persona-red group-hover:bg-persona-yellow"
                                : "bg-gray-800"
                                } transition-colors duration-200`}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.div>
    );
}
