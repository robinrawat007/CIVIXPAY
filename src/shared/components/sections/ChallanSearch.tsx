import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import SectionContainer from "./SectionContainer";
import { Search, Hash, ShieldCheck, Zap } from "lucide-react";

const ChallanSearch = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [vehicleNum, setVehicleNum] = useState("");

    return (
        <SectionContainer id="search" className="relative pb-16 sm:pb-24 lg:pb-32">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-white/60 backdrop-blur-3xl rounded-[28px] sm:rounded-[44px] lg:rounded-[60px] p-5 sm:p-10 lg:p-16 border border-white/60 shadow-3xl overflow-hidden"
            >
                {/* High-Tech Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                <div className="hidden md:block absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 mb-6 sm:mb-8 border border-emerald-500/20"
                    >
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Secure Verification Portal</span>
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight">
                        Search for a <br />
                        <span className="text-emerald-600">Vehicle Challan</span>
                    </h2>

                    <p className="text-gray-600 text-base sm:text-lg font-medium mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto leading-relaxed">
                        Enter your vehicle number below for instant access to your records. Verification will securely move you to your challan details page.
                    </p>

                    {/* Premium Input Section */}
                    <div className="relative max-w-2xl mx-auto group">
                        <motion.div
                            animate={{
                                boxShadow: isFocused ? "0 20px 50px rgba(16, 185, 129, 0.15)" : "0 10px 30px rgba(0,0,0,0.02)"
                            }}
                            className={`relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 transition-all duration-500 bg-white rounded-[24px] sm:rounded-[32px] border-2 ${isFocused ? 'border-emerald-500 p-2 shadow-2xl' : 'border-gray-100 p-1.5'}`}
                        >
                            <div className="flex-1 flex items-center gap-3 sm:gap-4 px-4 sm:px-6">
                                <Hash className={`${isFocused ? 'text-emerald-500' : 'text-gray-300'} transition-colors`} size={20} />
                                <input
                                    type="text"
                                    value={vehicleNum}
                                    onChange={(e) => setVehicleNum(e.target.value.toUpperCase())}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="DL 12 AB 1234"
                                    className="w-full bg-transparent py-4 sm:py-6 text-lg sm:text-2xl font-black text-gray-900 placeholder:text-gray-300 outline-none uppercase tracking-[0.15em] sm:tracking-widest"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-10 py-3.5 sm:py-5 rounded-[18px] sm:rounded-[24px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-colors"
                            >
                                <Search size={18} />
                                Verify
                            </motion.button>
                        </motion.div>

                        {/* Interactive Scan Line Overlay */}
                        <AnimatePresence>
                            {isFocused && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-x-3 sm:inset-x-8 -bottom-8 sm:-bottom-10 flex justify-center gap-3 sm:gap-4 text-emerald-600/50"
                                >
                                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                                        <Zap size={12} fill="currentColor" />
                                        Processing
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                                        <ShieldCheck size={12} />
                                        Encryption Active
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <p className="mt-10 sm:mt-16 text-[9px] sm:text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] sm:tracking-[0.5em]">
                        Verified by National Transport Authority
                    </p>
                </div>
            </motion.div>
        </SectionContainer>
    );
};

export default React.memo(ChallanSearch);
