import { motion, useInView, useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import SectionContainer from "./SectionContainer";
import { ShieldCheck, Users, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { challanService } from "@/services/challanService";
import { StatsSkeleton } from "../ui/PageSkeletons";

const COLOR_MAP: Record<string, { bg: string, shadow: string, pulse: string, text: string }> = {
    emerald: {
        bg: "bg-emerald-600",
        shadow: "shadow-emerald-500/40",
        pulse: "bg-emerald-500/40",
        text: "shadow-emerald-500/20 group-hover:shadow-emerald-500/30"
    },
    blue: {
        bg: "bg-blue-600",
        shadow: "shadow-blue-500/40",
        pulse: "bg-blue-500/40",
        text: "shadow-blue-500/20 group-hover:shadow-blue-500/30"
    },
    indigo: {
        bg: "bg-indigo-600",
        shadow: "shadow-indigo-500/40",
        pulse: "bg-indigo-500/40",
        text: "shadow-indigo-500/20 group-hover:shadow-indigo-500/30"
    }
};

const Counter = ({
    value,
    label,
    icon: Icon,
    delay = 0,
    color = "emerald"
}: {
    value: string,
    label: string,
    icon: React.ElementType,
    delay?: number,
    color?: string
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    const prefersReducedMotion = useReducedMotion();
    const styles = COLOR_MAP[color] || COLOR_MAP.emerald;

    useEffect(() => {
        if (isInView) {
            const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out expo for a premium feel
                const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                setCount(Math.floor(easeOutExpo * numericValue));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            const animationFrame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrame);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            className={`flex-1 bg-white/80 backdrop-blur-lg border border-white/40 p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] shadow-2xl transition-all duration-500 ${styles.text}`}
        >
            <div className="flex items-start justify-between">
                <div className="relative">
                    <div className={`p-3 sm:p-4 ${styles.bg} rounded-2xl text-white shadow-xl ${styles.shadow} group-hover:scale-110 transition-transform relative z-10`}>
                        <Icon size={24} />
                    </div>
                    {!prefersReducedMotion && (
                        <motion.div
                            animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0, 0.45] }}
                            transition={{ duration: 2.2, repeat: Infinity }}
                            className={`absolute inset-0 ${styles.pulse} rounded-2xl blur-md z-0`}
                        />
                    )}
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">
                        Live Stats
                    </p>
                    <h4 className="text-2xl sm:text-3xl font-black text-gray-950">
                        {`${count.toLocaleString()}+`}
                    </h4>
                </div>
            </div>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-black text-gray-700 uppercase tracking-wider">{label}</p>
        </motion.div>
    );
};

const DashboardSummary = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: challanService.getDashboardStats,
    });

    if (isLoading || !data) return <StatsSkeleton />;

    return (
        <SectionContainer id="stats" className="relative">
            <div className="flex flex-col lg:flex-row gap-8">
                <Counter
                    icon={Activity}
                    value={data.challansSettled}
                    label="Challans Settled"
                    color="emerald"
                />
                <Counter
                    icon={Users}
                    value={data.activeCitizens}
                    label="Active Citizens"
                    delay={0.1}
                    color="blue"
                />
                <Counter
                    icon={ShieldCheck}
                    value={data.securityRating}
                    label="Security Rating (%)"
                    delay={0.2}
                    color="indigo"
                />
            </div>
        </SectionContainer>
    );
};

export default React.memo(DashboardSummary);
