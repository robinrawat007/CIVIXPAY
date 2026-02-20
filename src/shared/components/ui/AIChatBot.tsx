import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

const AIChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-3 sm:mb-4 w-[min(350px,calc(100vw-2rem))] bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[24px] sm:rounded-[32px] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-5 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Civix AI Assistant</p>
                                    <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest leading-none mt-1">Online & Ready</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close AI assistant"
                                className="hover:bg-white/10 p-1 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="h-72 sm:h-80 p-4 sm:p-6 space-y-4 overflow-y-auto">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-xs uppercase">AI</div>
                                <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-sm text-sm text-gray-700">
                                    Hello! How can I help you with your challans today?
                                </div>
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-3 sm:p-4 border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                placeholder="Ask about a ticket..."
                                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                            <button
                                type="button"
                                aria-label="Send message"
                                className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
                className="bg-gradient-to-br from-emerald-600 to-green-600 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-emerald-200 flex items-center gap-2 sm:gap-3 font-bold relative group"
            >
                <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
                <MessageSquare size={22} className="relative z-10" />
                <span className="relative z-10 pr-1 hidden sm:inline">AI Assistant</span>

                {/* Pulse Indicator */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-white bg-emerald-600"></span>
                </span>
            </motion.button>
        </div>
    );
};

export default React.memo(AIChatBot);
