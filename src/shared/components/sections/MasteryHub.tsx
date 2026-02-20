import React from "react";
import { FileText, Shield, GraduationCap, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import SectionContainer from "./SectionContainer";

const items = [
    {
        icon: FileText,
        value: "840K+",
        label: "Digital Records",
        detail: "Zero paper wastage",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        icon: Shield,
        value: "99.9%",
        label: "Rule Compliance",
        detail: "Active monitoring",
        color: "text-zinc-900",
        bg: "bg-zinc-100"
    },
    {
        icon: GraduationCap,
        value: "25+",
        label: "Mastery Modules",
        detail: "Interactive learning",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        icon: Star,
        value: "Gold",
        label: "Safety Rating",
        detail: "Citizen verification",
        color: "text-zinc-900",
        bg: "bg-zinc-100"
    }
];

const MasteryHub = () => {
    return (
        <SectionContainer id="mastery" className="relative group overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4 block"
                    >
                        Education & Sustainability
                    </motion.span>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                        The <span className="text-emerald-600">Civix Mastery</span> Hub
                    </h2>
                    <p className="mt-4 text-gray-500 font-medium max-w-2xl mx-auto">
                        We blend high-end citizen education with a commitment to a paperless, sustainable future for our cities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-[40px] hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 group/card"
                        >
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-500`}>
                                <item.icon size={28} />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-3xl font-black text-gray-900 tabular-nums">
                                    {item.value}
                                </h3>
                                <p className="text-sm font-bold text-gray-600">
                                    {item.label}
                                </p>
                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest pt-2 flex items-center gap-2">
                                    <CheckCircle size={10} className="text-emerald-500" />
                                    {item.detail}
                                </p>
                            </div>

                            {/* Decorative Line */}
                            <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
};

export default React.memo(MasteryHub);
