import React from "react";
import { ChevronDown } from "lucide-react";

const HeaderBar = () => {
    return (
        <div className="h-16 w-full sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-end">

                <div className="flex items-center gap-6 cursor-pointer group">

                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-200 transition-transform group-hover:scale-110">
                            R
                        </div>

                        {/* Name */}
                        <div className="text-sm">
                            <p className="font-bold text-gray-900 leading-none">
                                Robin Rawat
                            </p>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1 opacity-70">
                                Verified Citizen
                            </p>
                        </div>

                        <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default React.memo(HeaderBar);
