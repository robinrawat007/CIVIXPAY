import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import SectionContainer from "./SectionContainer";
import { Star, CheckCircle, Plus, X, Loader2, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "@/services/reviewService";
import { useAuth } from "@/store/useAuth";

const ReviewsSection = () => {
    const { user, openAuthModal } = useAuth();
    const queryClient = useQueryClient();
    const [isWriting, setIsWriting] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ["reviews"],
        queryFn: reviewService.getReviews,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });

    const submitMutation = useMutation({
        mutationFn: async () => {
            if (!user) throw new Error("Must be logged in");
            await reviewService.submitReview(user.id, rating, comment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            setIsWriting(false);
            setComment("");
            setRating(5);
            setSubmitError(null);
        },
        onError: (err: Error) => {
            setSubmitError(err.message || "Failed to submit review. Please try again.");
        }
    });

    const handleWriteReview = () => {
        if (!user) {
            openAuthModal();
            return;
        }
        setIsWriting(true);
        setSubmitError(null);
    };

    return (
        <SectionContainer id="reviews" className="relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-10 sm:mb-16 gap-4">
                <div className="text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
                    >
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">Millions</span> of Citizens
                    </motion.h2>
                    <p className="text-gray-500 text-sm sm:text-base font-medium">Join the thousands of citizens who have already transitioned to digital governance.</p>
                </div>

                {!isWriting && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWriteReview}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition self-start sm:self-auto"
                    >
                        <Plus size={18} />
                        Share Experience
                    </motion.button>
                )}
            </div>

            {/* Write Review Form */}
            <AnimatePresence>
                {isWriting && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-8"
                    >
                        <div className="bg-emerald-50 border border-emerald-100 p-6 sm:p-8 rounded-3xl relative">
                            <button
                                onClick={() => { setIsWriting(false); setSubmitError(null); }}
                                aria-label="Close review form"
                                className="absolute top-4 right-4 p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="font-bold text-lg text-emerald-950 mb-4">How was your experience?</h3>

                            {/* Star Rating */}
                            <div className="flex gap-2 mb-6" role="radiogroup" aria-label="Star rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                                        aria-pressed={star <= rating}
                                        onClick={() => setRating(star)}
                                        className="transition-transform hover:scale-110"
                                    >
                                        <Star
                                            size={32}
                                            fill={star <= rating ? "#059669" : "none"}
                                            className={star <= rating ? "text-emerald-600" : "text-emerald-200"}
                                        />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell us how CivixPay helped you today... (at least 10 characters)"
                                maxLength={1000}
                                aria-label="Review comment"
                                className="w-full bg-white border border-emerald-200 rounded-2xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 mb-2 text-gray-800 resize-none"
                            />
                            <p className="text-xs text-gray-400 mb-4 text-right">{comment.length}/1000</p>

                            {/* Submission Error */}
                            {submitError && (
                                <div role="alert" className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl text-sm mb-4 border border-red-100">
                                    <AlertCircle size={16} />
                                    {submitError}
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    onClick={() => submitMutation.mutate()}
                                    disabled={submitMutation.isPending || comment.trim().length < 10}
                                    className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {submitMutation.isPending && <Loader2 size={18} className="animate-spin" />}
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
                {isLoading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-[40px]" />)
                ) : isError ? (
                    <div className="col-span-full text-center p-12 bg-gray-50 rounded-3xl">
                        <AlertCircle size={40} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">Unable to load reviews right now. Please try again later.</p>
                    </div>
                ) : (
                    reviews.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="p-5 sm:p-8 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[28px] sm:rounded-[40px] shadow-2xl shadow-emerald-500/5 group flex flex-col h-full"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={item.avatar}
                                    alt={`${item.name} avatar`}
                                    loading="lazy"
                                    decoding="async"
                                    width="56"
                                    height="56"
                                    className="w-14 h-14 rounded-2xl object-cover shadow-lg group-hover:rotate-6 transition-transform"
                                />
                                <div>
                                    <h3 className="font-black text-gray-900 leading-none truncate max-w-[150px]">{item.name}</h3>
                                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{item.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4" aria-label={`Rating: ${item.rating} out of 5 stars`}>
                                {[...Array(5)].map((_, idx) => (
                                    <Star
                                        key={idx}
                                        size={14}
                                        fill={idx < item.rating ? "#059669" : "none"}
                                        className={idx < item.rating ? "text-emerald-600" : "text-gray-200"}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 font-medium leading-relaxed italic mb-8 flex-1">
                                &ldquo;{item.review}&rdquo;
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-100/50 mt-auto">
                                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                                    <CheckCircle size={14} />
                                    Verified
                                </div>
                                <span className="text-xs text-gray-400 font-bold">{item.paid}</span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </SectionContainer>
    );
};

export default React.memo(ReviewsSection);
