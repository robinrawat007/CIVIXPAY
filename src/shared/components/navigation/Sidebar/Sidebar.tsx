import React from "react";

import {
    LayoutDashboard,
    Search,
    Activity,
    Leaf,
    BookOpen,
    HelpCircle,
    MessageSquare,
    FileText
} from "lucide-react";

import { motion } from "framer-motion";

import SidebarLogo from "./SidebarLogo";
import { useStore } from "@/store/useStore";

/* ────────────────────────────────────────────── */
/* Sidebar Item Component (Memoized) */
/* ────────────────────────────────────────────── */

type SidebarItemProps = {
    icon: React.ElementType;
    label: string;
    path: string;
    collapsed: boolean;
};

const SidebarItem = React.memo(
    ({
        icon: Icon,
        label,
        path,
        collapsed
    }: SidebarItemProps) => {
        const handleScroll = () => {
            const id = path.split('#')[1];
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else if (id === 'top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
            // Future redirection logic:
            // navigate(path); 
        };

        return (
            <div className="relative group" onClick={handleScroll}>
                <motion.div
                    whileHover={{ x: 6, backgroundColor: "rgba(5, 150, 105, 0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }}
                    className={`
                flex items-center gap-3
                px-4 py-3
                rounded-2xl
                cursor-pointer
                transition-all
                relative overflow-hidden
                group/item
                text-gray-600 hover:text-emerald-700
              `}
                >
                    {/* Inner Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/5 to-emerald-600/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000"></div>

                    <Icon size={20} className="group-hover/item:scale-110 transition-transform" />

                    {!collapsed && (
                        <span className="text-sm font-bold whitespace-nowrap tracking-tight">
                            {label}
                        </span>
                    )}
                </motion.div>

                {/* Tooltip (always mounted → no lag) */}
                <div
                    className={`
                absolute left-16 top-1/2 -translate-y-1/2
                bg-black text-white text-xs
                px-2 py-1 rounded
                opacity-0 group-hover:opacity-100
                pointer-events-none
                transition
                whitespace-nowrap
                z-[100]
            `}
                >
                    {label}
                </div>

            </div>
        );
    }
);

/* ────────────────────────────────────────────── */
/* Sidebar Component */
/* ────────────────────────────────────────────── */

const Sidebar = () => {
    const { sidebarCollapsed, toggleSidebar } = useStore();

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            path: "/#top"
        },
        {
            icon: Search,
            label: "Search",
            path: "/#search"
        },
        {
            icon: Activity,
            label: "Statistics",
            path: "/#stats"
        },
        {
            icon: BookOpen,
            label: "Guide",
            path: "/#how-it-works"
        },
        {
            icon: HelpCircle,
            label: "RulePro",
            path: "/#rule-pro"
        },
        {
            icon: Leaf,
            label: "Mastery Hub",
            path: "/#mastery"
        },
        {
            icon: MessageSquare,
            label: "Reviews",
            path: "/#reviews"
        },
        {
            icon: FileText,
            label: "Updates",
            path: "/#blogs"
        }
    ];

    return (
        <motion.aside
            animate={{
                width: sidebarCollapsed ? 80 : 260
            }}
            transition={{
                duration: 0.22,
                ease: "easeInOut"
            }}

            /* Layout + Performance Optimizations */
            className="
        h-screen
        fixed
        left-0
        top-0
        z-[100]
        overflow-hidden
        bg-white/60
        backdrop-blur-2xl
        border-r border-emerald-100/30
        flex flex-col
        overflow-y-auto
        overflow-x-hidden
        scrollbar-none
        will-change-[width]
        shadow-[10px_0_30px_rgba(0,0,0,0.02)]
      "
        >
            {/* Logo + Toggle */}
            <SidebarLogo
                collapsed={sidebarCollapsed}
                toggle={toggleSidebar}
            />

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar no-scrollbar">

                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        collapsed={sidebarCollapsed}
                    />
                ))}

            </nav>

            {/* Bottom Slot */}
            <div className="p-4 text-center text-[10px] font-bold text-gray-500 border-t border-gray-50 bg-gray-50/30 uppercase tracking-tighter">
                {!sidebarCollapsed && "Platform v1.2.4 (Beta)"}
                {sidebarCollapsed && "v1.2"}
            </div>

        </motion.aside>
    );
};

export default Sidebar;
