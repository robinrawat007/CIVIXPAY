import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import SectionContainer from "./SectionContainer";

const HeroBanner = () => {
    const prefersReducedMotion = useReducedMotion();
    const heroImageBase =
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=60";

    return (
        <div className="relative overflow-hidden">
            {/* Animated Decorative Shapes */}
            <motion.div
                animate={
                    prefersReducedMotion
                        ? { opacity: 1 }
                        : {
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            x: [0, 50, 0],
                            y: [0, 30, 0]
                        }
                }
                transition={{ duration: 20, repeat: prefersReducedMotion ? 0 : Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-5%] w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-emerald-400/10 blur-[100px] rounded-full z-0 hidden md:block"
            />
            <motion.div
                animate={
                    prefersReducedMotion
                        ? { opacity: 1 }
                        : {
                            scale: [1.2, 1, 1.2],
                            rotate: [0, -90, 0],
                            x: [0, -30, 0],
                            y: [0, 50, 0]
                        }
                }
                transition={{ duration: 25, repeat: prefersReducedMotion ? 0 : Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-5%] w-[360px] h-[360px] lg:w-[500px] lg:h-[500px] bg-green-400/10 blur-[100px] rounded-full z-0 hidden md:block"
            />

            <SectionContainer className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-12 sm:py-16 lg:py-24 relative z-10">

                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block px-3 sm:px-4 py-1.5 mb-6 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] bg-emerald-700 text-white rounded-full shadow-xl shadow-emerald-500/20">
                            Digital Governance 2.0
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
                            Pay & Track <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-800">
                                Your Challans
                            </span>
                        </h1>

                        <p className="mt-6 sm:mt-8 text-gray-500 text-base sm:text-lg lg:text-xl font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Experience the future of citizen-centric transparency.
                            Track, manage, and settle your challans with military-grade security.
                        </p>

                        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto bg-gradient-to-br from-emerald-600 to-green-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black uppercase tracking-[0.12em] sm:tracking-widest text-xs sm:text-sm shadow-2xl shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50"
                            >
                                Get Started
                            </motion.button>

                            <button
                                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-3 text-gray-900 font-bold hover:text-emerald-600 transition-colors group"
                            >
                                <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                    </svg>
                                </div>
                                <span className="uppercase text-[11px] sm:text-xs tracking-widest">How it works</span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Visual Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex-1 relative w-full"
                >
                    <div className="relative z-10 p-2 sm:p-4 bg-white/40 backdrop-blur-lg rounded-[24px] sm:rounded-[40px] border border-white/60 shadow-3xl">
                        <div className="bg-gray-900 aspect-video rounded-[18px] sm:rounded-[32px] flex items-center justify-center overflow-hidden shadow-2xl relative group">
                            <img
                                src={`${heroImageBase}&w=960`}
                                srcSet={`${heroImageBase}&w=480 480w, ${heroImageBase}&w=768 768w, ${heroImageBase}&w=960 960w`}
                                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 46vw"
                                className="w-full h-full object-cover opacity-60 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                                alt="CivixPay Digital Governance Dashboard - Secure and Transparent"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                width="960"
                                height="540"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    className="px-6 py-3 bg-emerald-800/95 backdrop-blur-md text-white rounded-2xl font-black uppercase tracking-tighter text-sm shadow-2xl shadow-emerald-500/40"
                                >
                                    Systems Operational
                                </motion.span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </SectionContainer>
        </div>
    );
};

export default React.memo(HeroBanner);
