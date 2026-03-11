import React from "react";
import { ChevronDown, Menu } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/store/useAuth";

const HeaderBar = () => {
    const { openMobileSidebar } = useStore();
    const { user, profile, openAuthModal } = useAuth();

    return (
        <div className="h-14 sm:h-16 w-full sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-0 sm:px-2 h-full flex items-center justify-between lg:justify-end">
                <button
                    onClick={openMobileSidebar}
                    data-sidebar-toggle="true"
                    aria-label="Open sidebar"
                    className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-white/70 border border-white/60 shadow-sm"
                >
                    <Menu size={20} />
                </button>

                <div className="flex items-center gap-3 sm:gap-6">
                    {user ? (
                        <div className="flex items-center gap-3 cursor-pointer group">
                            {/* Avatar */}
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-200 transition-transform group-hover:scale-110">
                                {(profile?.email || 'U')[0].toUpperCase()}
                            </div>

                            {/* Name */}
                            <div className="text-xs sm:text-sm">
                                <p className="font-bold text-gray-900 leading-none truncate max-w-[120px] sm:max-w-none">
                                    {profile?.email?.split('@')[0] || 'Citizen'}
                                </p>
                                <p className="hidden sm:block text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1 opacity-70">
                                    {profile?.kycStatus === 'verified' ? 'Verified Citizen' : 'Citizen'}
                                </p>
                            </div>

                            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                    ) : (
                        <button 
                            onClick={() => openAuthModal()}
                            className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700 transition"
                        >
                            Login
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default React.memo(HeaderBar);
