import { motion } from "framer-motion";
import React from "react";
import SectionContainer
    from "./SectionContainer";

import {
    ShieldCheck,
    Lock,
    RefreshCcw,
    Globe
} from "lucide-react";

const badges = [
    {
        icon: ShieldCheck,
        title: "SSL Secured",
        desc: "256-bit encryption",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        icon: Lock,
        title: "Data Privacy",
        desc: "GDPR Compliant",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        icon: RefreshCcw,
        title: "Real-time Sync",
        desc: "Instant updates",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        icon: Globe,
        title: "Multi-Language",
        desc: "Local Support",
        color: "text-violet-600",
        bg: "bg-violet-50"
    }
];

const getBadgeVariants = (i: number) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: i * 0.15 },
    viewport: { once: true },
    whileHover: { y: -8, scale: 1.05 }
});

const TrustBadges = () => {
    return (
        <SectionContainer>

            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900">
                    Trusted & Secure Platform
                </h2>

                <p className="text-gray-500 mt-2">
                    Ensuring safe and reliable digital
                    challan payments.
                </p>
            </div>

            {/* Badges */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

                {badges.map((badge, i) => {
                    const Icon = badge.icon;

                    return (
                        <motion.div
                            key={i}
                            {...getBadgeVariants(i)}
                            className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 text-center shadow-2xl shadow-emerald-500/5 group hover:shadow-emerald-500/10 transition-all duration-500"
                        >
                            <div className={`w-16 h-16 mx-auto flex items-center justify-center rounded-2xl ${badge.bg} ${badge.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                <Icon size={28} />
                            </div>

                            <h3 className="mt-6 font-black text-gray-950">
                                {badge.title}
                            </h3>

                            <p className="text-gray-700 font-bold text-sm mt-3 leading-relaxed">
                                {badge.desc}
                            </p>
                        </motion.div>
                    );
                })}

            </div>

        </SectionContainer>
    );
};

export default React.memo(TrustBadges);
