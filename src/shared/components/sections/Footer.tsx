import React, { useMemo } from "react";
import {
    Phone,
    Mail
} from "lucide-react";

const Footer = () => {
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer className="relative mt-16 sm:mt-24 lg:mt-32 border-t border-white/50 bg-white/60 backdrop-blur-lg">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

                {/* Brand */}
                <div className="space-y-6">
                    <img
                        src="/assets/fullLogo.png"
                        alt="CivixPay - Secure Digital Gateway for Citizen Services"
                        loading="lazy"
                        className="h-8 sm:h-10 w-auto object-contain"
                    />

                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                        Leading the digital revolution in citizen services with secure,
                        transparent, and instant payment solutions.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-5 sm:mb-8">
                        Navigation
                    </h4>

                    <ul className="space-y-4 text-sm font-bold text-gray-600">
                        {[
                            { label: "Search Challan", id: "search" },
                            { label: "Live Statistics", id: "stats" },
                            { label: "Mastery Hub", id: "mastery" },
                            { label: "How It Works", id: "how-it-works" },
                            { label: "RulePro Guide", id: "rule-pro" },
                            { label: "Citizen Reviews", id: "reviews" },
                            { label: "Latest Updates", id: "blogs" }
                        ].map((link) => (
                            <li
                                key={link.id}
                                onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                                className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2 group"
                            >
                                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                                {link.label}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-5 sm:mb-8">
                        Resources
                    </h4>

                    <ul className="space-y-4 text-sm font-bold text-gray-600">
                        <li className="hover:text-emerald-600 cursor-pointer transition-colors">Help Center</li>
                        <li className="hover:text-emerald-600 cursor-pointer transition-colors">Documentation</li>
                        <li className="hover:text-emerald-600 cursor-pointer transition-colors">API Reference</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-5 sm:mb-8">
                        Official Desk
                    </h4>

                    <div className="space-y-4 text-sm font-bold text-gray-600">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-emerald-600 transition-colors border border-gray-100">
                                <Phone size={14} />
                            </div>
                            <span>1800-CIVIX-PAY</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                                <Mail size={14} />
                            </div>
                            <span>support@gov.in</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Strip */}
            <div className="border-t border-gray-100 py-8 sm:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        © {currentYear} CivixPay India. Secure Digital Gateway.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span className="hover:text-emerald-600 cursor-pointer transition-colors">Privacy Architecture</span>
                        <span className="hover:text-emerald-600 cursor-pointer transition-colors">Service Terms</span>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default React.memo(Footer);
