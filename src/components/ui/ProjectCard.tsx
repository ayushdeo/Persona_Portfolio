import { motion } from "framer-motion";
import React from 'react';

interface Props {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    index: number;
    impact?: string[];
}

export default function ProjectCard({ title, description, tags, link, index, impact }: Props) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            className={`relative w-full max-w-3xl mx-auto mb-32 group cursor-pointer overflow-visible text-left`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "circOut" }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Skewed container */}
            <div className={`absolute inset-0 bg-gray-900 border-2 border-white transform ${isEven ? "skew-x-[-6deg]" : "skew-x-[6deg]"} group-hover:bg-persona-black group-hover:border-persona-red transition-colors duration-300 shadow-xl`}></div>

            <div className={`relative pt-12 pb-16 px-10 z-10 flex flex-col items-start`}>

                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-persona-red font-mono text-4xl">0{index + 1}</span>
                    <div className="h-1 w-12 bg-white"></div>
                </div>

                <h3 className="text-4xl md:text-6xl font-display uppercase text-white drop-shadow-[4px_4px_0px_#000] group-hover:text-persona-yellow transition-colors">
                    {title}
                </h3>

                <p className="font-ui text-gray-300 max-w-lg mt-4 text-lg border-l-2 border-persona-accent pl-4">
                    {description}
                </p>

                {impact && (
                    <ul className="mt-4 ml-4 space-y-1">
                        {impact.map(i => (
                            <li key={i} className="font-mono text-sm text-persona-accent">• {i}</li>
                        ))}
                    </ul>
                )}

                <div className="flex flex-wrap gap-2 mt-6 justify-end">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs font-mono font-bold bg-white text-black px-2 py-1 uppercase tracking-wider transform -skew-x-12">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Fake CTA */}
                <div className={`mt-8 px-6 py-2 bg-persona-red text-white uppercase font-ui font-black tracking-widest text-xl border-2 border-white transform -skew-x-12 group-hover:bg-white group-hover:text-persona-red transition-all`}>
                    EXECUTE_
                </div>

            </div>

            {/* Background stars */}
            <div className="absolute -z-10 top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(245,196,0,0.1)_0%,transparent_70%)]"></div>
            </div>
        </motion.div>
    );
}
