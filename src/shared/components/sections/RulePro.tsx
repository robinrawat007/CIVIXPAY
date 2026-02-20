import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ShieldCheck, ArrowRight } from "lucide-react";
import SectionContainer from "./SectionContainer";

const violations = [
    { id: 1, title: "Overspeeding", fine: "₹2,000", points: "3 Points", icon: "⚡", accent: "amber" },
    { id: 2, title: "Drunken Driving", fine: "₹10,000", points: "Suspension", icon: "🍷", accent: "blue" },
    { id: 3, title: "No Helmet", fine: "₹1,000", points: "1 Point", icon: "🪖", accent: "emerald" },
    { id: 4, title: "Red Light Jump", fine: "₹5,000", points: "2 Points", icon: "🚥", accent: "amber" },
    { id: 5, title: "No Seatbelt", fine: "₹1,000", points: "1 Point", icon: "💺", accent: "emerald" }
];

const ACCENT_MAP: Record<string, { bg: string, shadow: string, text: string, hover: string }> = {
    amber: {
        bg: "bg-amber-600",
        shadow: "shadow-amber-500/30",
        text: "text-amber-700",
        hover: "hover:border-amber-400"
    },
    blue: {
        bg: "bg-blue-600",
        shadow: "shadow-blue-500/30",
        text: "text-blue-700",
        hover: "hover:border-blue-400"
    },
    emerald: {
        bg: "bg-emerald-600",
        shadow: "shadow-emerald-500/30",
        text: "text-emerald-700",
        hover: "hover:border-emerald-400"
    }
};

import { RuleProSkeleton } from "../ui/PageSkeletons";

import useSafeTimeout from "../../hooks/useSafeTimeout";

const RulePro = () => {
    const [selected, setSelected] = useState(violations[0]);
    const [isLoading, setIsLoading] = useState(true);
    const { setSafeTimeout } = useSafeTimeout();

    useEffect(() => {
        setSafeTimeout(() => setIsLoading(false), 2000);
    }, [setSafeTimeout]);

    if (isLoading) return <RuleProSkeleton />;

    return (
        <SectionContainer id="rule-pro" className="relative">
            <div className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-[60px] p-8 md:p-20 text-gray-950 overflow-hidden relative shadow-3xl">
                {/* Abstract Background Elements */}
                {/* ... existing bg elements ... */}

                <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        {/* ... existing content ... */}

                        <div className="grid grid-cols-2 gap-4" role="list">
                            {violations.map((v, i) => {
                                const accent = ACCENT_MAP[v.accent] || ACCENT_MAP.emerald;
                                return (
                                    <motion.button
                                        key={v.id}
                                        role="listitem"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => setSelected(v)}
                                        className={`p-4 rounded-2xl border-2 transition-all text-left group ${selected.id === v.id
                                            ? `${accent.bg} text-white border-transparent shadow-xl ${accent.shadow}`
                                            : `bg-white border-gray-200 ${accent.hover} text-gray-700 font-bold`
                                            }`}
                                    >
                                        <div className="text-2xl mb-2" aria-hidden="true">{v.icon}</div>
                                        <div className="text-sm font-black">{v.title}</div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selected.id}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="bg-white border-2 border-gray-100 rounded-[48px] p-12 relative shadow-2xl"
                            >
                                {(() => {
                                    const accent = ACCENT_MAP[selected.accent] || ACCENT_MAP.emerald;
                                    return (
                                        <>
                                            <div className={`absolute -top-6 -right-6 w-24 h-24 ${accent.bg} rounded-full flex items-center justify-center text-4xl shadow-2xl text-white`}>
                                                {selected.icon}
                                            </div>

                                            <div className="space-y-8">
                                                <div>
                                                    <p className={`text-xs font-black ${accent.text} uppercase tracking-widest mb-2`}>Rule Identification</p>
                                                    <h3 className="text-3xl font-black text-gray-950">{selected.title}</h3>
                                                </div>

                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="bg-gray-100/50 rounded-3xl p-6 border border-gray-100">
                                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Penalty</p>
                                                        <p className="text-3xl font-black text-red-600">{selected.fine}</p>
                                                    </div>
                                                    <div className="bg-gray-100/50 rounded-3xl p-6 border border-gray-100">
                                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">DL Impact</p>
                                                        <p className={`text-3xl font-black ${accent.text}`}>{selected.points}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                                                    <AlertCircle className="text-emerald-600 shrink-0" size={20} />
                                                    <p className="text-sm font-medium text-emerald-800/80 leading-relaxed">
                                                        Stay compliant to maintain your Gold Safety rating and qualify for paperless insurance renewals.
                                                    </p>
                                                </div>

                                                <button className="w-full bg-zinc-900 hover:bg-black text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-zinc-900/20 group">
                                                    GET MASTERY CERTIFICATE
                                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </>
                                    );
                                })()}
                            </motion.div>
                        </AnimatePresence>

                        {/* Verified Badge */}
                        {(() => {
                            const accent = ACCENT_MAP[selected.accent] || ACCENT_MAP.emerald;
                            return (
                                <div className={`absolute -bottom-10 right-10 flex items-center gap-3 ${accent.bg} text-white px-6 py-3 rounded-2xl font-black text-xs shadow-2xl`}>
                                    <ShieldCheck size={18} />
                                    ACT 2024 COMPLIANT
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

export default React.memo(RulePro);
