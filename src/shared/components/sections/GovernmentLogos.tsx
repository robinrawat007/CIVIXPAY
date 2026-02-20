import { motion, useReducedMotion } from "framer-motion";
import React from "react";

const departments = [
    "National Transport",
    "Traffic Police",
    "Road Safety Board",
    "Digital India",
    "Civic Services"
];

const GovernmentLogos = () => {
    const prefersReducedMotion = useReducedMotion();
    const chipItems = [...departments, ...departments];

    return (
        <div className="relative overflow-hidden py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                    Trusted by National Departments
                </p>
            </div>

            {/* Marquee Container */}
            <div className="flex relative items-center">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 lg:w-32 bg-gradient-to-r from-[#fafdfb] to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 lg:w-32 bg-gradient-to-l from-[#fafdfb] to-transparent z-10"></div>

                <motion.div
                    animate={prefersReducedMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
                    transition={{
                        duration: 26,
                        repeat: prefersReducedMotion ? 0 : Infinity,
                        ease: "linear"
                    }}
                    className="flex items-center gap-4 sm:gap-6 whitespace-nowrap px-6 sm:px-10"
                >
                    {chipItems.map((department, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/80 border border-emerald-100 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500"
                        >
                            {department}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Subtle Reflection Divider */}
            <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-200/40 to-transparent max-w-4xl mx-auto"></div>
        </div>
    );
};

export default React.memo(GovernmentLogos);
