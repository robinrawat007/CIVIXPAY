import { motion } from "framer-motion";
import React from "react";
const logos = [
    "/assets/logos/gov1.png",
    "/assets/logos/gov2.png",
    "/assets/logos/gov3.png",
    "/assets/logos/gov4.png",
    "/assets/logos/gov5.png"
];

const GovernmentLogos = () => {
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
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex items-center gap-10 sm:gap-16 lg:gap-20 whitespace-nowrap px-6 sm:px-10"
                >
                    {[...logos, ...logos].map((logo, i) => (
                        <img
                            key={i}
                            src={logo}
                            alt="Gov Logo"
                            className="h-8 sm:h-10 w-auto opacity-30 hover:opacity-100 transition-opacity Filter grayscale hover:grayscale-0"
                        />
                    ))}
                </motion.div>
            </div>

            {/* Subtle Reflection Divider */}
            <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-200/40 to-transparent max-w-4xl mx-auto"></div>
        </div>
    );
};

export default React.memo(GovernmentLogos);
