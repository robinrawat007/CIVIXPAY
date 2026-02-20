import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import SectionContainer from "./SectionContainer";
import { Star, CheckCircle } from "lucide-react";
import { ReviewsSkeleton } from "../ui/PageSkeletons";

const reviews = [
    {
        name: "Arjun Sharma",
        role: "Property Owner",
        avatar: "https://i.pravatar.cc/150?u=arjun",
        review: "The fastest way to pay property tax. The glass UI is actually helpful and not just for show. Love the transparency.",
        rating: 5,
        paid: "₹4,500"
    },
    {
        name: "Priya Patel",
        role: "Business Owner",
        avatar: "https://i.pravatar.cc/150?u=priya",
        review: "CivixPay saved me hours of standing in lines. The AI assistant actually understands regional queries. Impressed!",
        rating: 5,
        paid: "₹12,800"
    },
    {
        name: "Vikram Singh",
        role: "Citizen",
        avatar: "https://i.pravatar.cc/150?u=vikram",
        review: "Settling traffic challans has never been this aesthetic. The mobile responsiveness is top-notch.",
        rating: 4,
        paid: "₹1,200"
    }
];

import useSafeTimeout from "../../hooks/useSafeTimeout";

const ReviewsSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { setSafeTimeout } = useSafeTimeout();

    useEffect(() => {
        setSafeTimeout(() => setIsLoading(false), 1800);
    }, [setSafeTimeout]);

    if (isLoading) return <ReviewsSkeleton />;

    return (
        <SectionContainer id="reviews" className="relative overflow-hidden">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black text-gray-900 mb-4"
                >
                    Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">Millions</span> of Citizens
                </motion.h2>
                <p className="text-gray-500 font-medium">Join the thousands of citizens who have already transitioned to digital governance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ y: -10 }}
                        className="p-8 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] shadow-2xl shadow-emerald-500/5 group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <img src={item.avatar} alt={item.name} className="w-14 h-14 rounded-2xl object-cover shadow-lg group-hover:rotate-6 transition-transform" />
                            <div>
                                <h4 className="font-black text-gray-900 leading-none">{item.name}</h4>
                                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{item.role}</p>
                            </div>
                        </div>

                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={i < item.rating ? "#059669" : "none"}
                                    className={i < item.rating ? "text-emerald-600" : "text-gray-200"}
                                />
                            ))}
                        </div>

                        <p className="text-gray-600 font-medium leading-relaxed italic mb-8">
                            "{item.review}"
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-100/50">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                                <CheckCircle size={14} />
                                Verified Payment
                            </div>
                            <span className="text-emerald-600 font-black">{item.paid}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default React.memo(ReviewsSection);
