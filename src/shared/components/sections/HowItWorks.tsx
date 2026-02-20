import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import SectionContainer
    from "./SectionContainer";

import {
    Search,
    FileText,
    CreditCard,
    CheckCircle
} from "lucide-react";

const COLOR_MAP: Record<string, { gradient: string, shadow: string, badge: string, hoverBadge: string, cardShadow: string }> = {
    emerald: {
        gradient: "from-emerald-600 to-emerald-500",
        shadow: "shadow-emerald-500/40",
        badge: "text-gray-200/80",
        hoverBadge: "group-hover:text-emerald-200",
        cardShadow: "shadow-emerald-500/10 group-hover:shadow-emerald-500/20"
    },
    blue: {
        gradient: "from-blue-600 to-blue-500",
        shadow: "shadow-blue-500/40",
        badge: "text-gray-200/80",
        hoverBadge: "group-hover:text-blue-200",
        cardShadow: "shadow-blue-500/10 group-hover:shadow-blue-500/20"
    },
    indigo: {
        gradient: "from-indigo-600 to-indigo-500",
        shadow: "shadow-indigo-500/40",
        badge: "text-gray-200/80",
        hoverBadge: "group-hover:text-indigo-200",
        cardShadow: "shadow-indigo-500/10 group-hover:shadow-indigo-500/20"
    },
    violet: {
        gradient: "from-violet-600 to-violet-500",
        shadow: "shadow-violet-500/40",
        badge: "text-gray-200/80",
        hoverBadge: "group-hover:text-violet-200",
        cardShadow: "shadow-violet-500/10 group-hover:shadow-violet-500/20"
    }
};

const steps = [
    {
        title: "Search Challan",
        desc: "Enter vehicle or challan number to fetch violation details.",
        icon: Search,
        color: "emerald"
    },
    {
        title: "View Details",
        desc: "Review challan information, penalties, and due dates.",
        icon: FileText,
        color: "blue"
    },
    {
        title: "Secure Payment",
        desc: "Pay online using trusted and encrypted payment gateways.",
        icon: CreditCard,
        color: "indigo"
    },
    {
        title: "Download Receipt",
        desc: "Get instant confirmation and downloadable receipt.",
        icon: CheckCircle,
        color: "violet"
    }
];

import { HowItWorksSkeleton } from "../ui/PageSkeletons";

import useSafeTimeout from "../../hooks/useSafeTimeout";

const HowItWorks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { setSafeTimeout } = useSafeTimeout();

    useEffect(() => {
        setSafeTimeout(() => setIsLoading(false), 1000);
    }, [setSafeTimeout]);

    if (isLoading) return <HowItWorksSkeleton />;

    return (
        <SectionContainer id="how-it-works" className="relative">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black text-gray-900"
                >
                    How To Use <span className="text-emerald-600">CivixPay</span>
                </motion.h2>

                <p className="text-gray-500 mt-4 text-lg font-medium">
                    Our process is engineered for speed, security, and absolute transparency.
                </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const styles = COLOR_MAP[step.color] || COLOR_MAP.emerald;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`relative bg-white/80 backdrop-blur-lg border-2 border-gray-100/50 rounded-[40px] p-8 text-center shadow-2xl transition-all duration-500 ${styles.cardShadow}`}
                        >
                            {/* Step Number Badge */}
                            <div className={`absolute top-6 right-8 text-[40px] font-black leading-none transition-colors ${styles.badge} ${styles.hoverBadge}`}>
                                0{index + 1}
                            </div>

                            {/* Icon */}
                            <div className={`w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br transition-all duration-300 ${styles.gradient} shadow-2xl ${styles.shadow} group-hover:scale-110 group-hover:rotate-6`}>
                                <Icon size={28} />
                            </div>

                            {/* Title */}
                            <h3 className="mt-8 font-black text-gray-950 text-xl tracking-tight">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 text-sm mt-3 font-bold leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </SectionContainer>
    );
};

export default React.memo(HowItWorks);
