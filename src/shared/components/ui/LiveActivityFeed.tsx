import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const activities = [
    { id: 1, user: "Robin R.", amount: "₹500", type: "Speeding", time: "Just now" },
    { id: 2, user: "Priya S.", amount: "₹1,200", type: "No Helmet", time: "2 mins ago" },
    { id: 3, user: "Vikram A.", amount: "₹2,500", type: "Red Light", time: "5 mins ago" },
    { id: 4, user: "Amit K.", amount: "₹300", type: "Parking", time: "10 mins ago" },
];

type Props = {
    sidebarCollapsed?: boolean;
};

const LiveActivityFeed = ({ sidebarCollapsed = false }: Props) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % activities.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const current = activities[index];

    return (
        <div className={`fixed bottom-6 z-40 hidden xl:block transition-all duration-300 ${sidebarCollapsed ? "left-28" : "left-72"}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="bg-white/80 backdrop-blur-md border border-white/50 shadow-xl rounded-2xl p-4 flex items-center gap-4 min-w-[280px]"
                >
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={18} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">{current.user}</span>
                            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase tracking-wider">Paid</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {current.type} • <span className="font-semibold text-gray-700">{current.amount}</span>
                        </p>
                    </div>
                    <div className="ml-auto text-[10px] text-gray-400 font-medium">
                        {current.time}
                    </div>

                    {/* Activity Indicator */}
                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default React.memo(LiveActivityFeed);
