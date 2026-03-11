import React from "react";
import {
    Activity,
    BookOpen,
    FileText,
    HelpCircle,
    LayoutDashboard,
    Leaf,
    MessageSquare,
    Search,
    X
} from "lucide-react";
import SidebarLogo from "./SidebarLogo";
import { useStore } from "@/store/useStore";

type SidebarItemProps = {
    icon: React.ElementType;
    label: string;
    path: string;
    collapsed: boolean;
    showTooltip?: boolean;
    onSelect?: () => void;
};

const SidebarItem = React.memo(
    ({
        icon: Icon,
        label,
        path,
        collapsed,
        showTooltip = true,
        onSelect
    }: SidebarItemProps) => {
        const handleSelect = () => {
            const id = path.split("#")[1];
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                } else if (id === "top") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            }
            onSelect?.();
        };

        return (
            <div className="relative group">
                <button
                    type="button"
                    onClick={handleSelect}
                    aria-label={label}
                    className="
                        w-full
                        flex items-center gap-3
                        px-4 py-3
                        rounded-2xl
                        cursor-pointer
                        transition-all duration-200
                        relative overflow-hidden
                        group/item
                        text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/70 hover:translate-x-1
                    "
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/5 to-emerald-600/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000"></div>
                    <Icon size={20} className="shrink-0 group-hover/item:scale-110 transition-transform" />

                    {!collapsed && (
                        <span className="text-sm font-bold whitespace-nowrap tracking-tight">
                            {label}
                        </span>
                    )}
                </button>

                {showTooltip && collapsed && (
                    <div
                        className="
                            absolute left-16 top-1/2 -translate-y-1/2
                            bg-black text-white text-xs
                            px-2 py-1 rounded
                            opacity-0 group-hover:opacity-100
                            pointer-events-none
                            transition
                            whitespace-nowrap
                            z-[110]
                        "
                    >
                        {label}
                    </div>
                )}
            </div>
        );
    }
);

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/#top" },
    { icon: Search, label: "Search", path: "/#search" },
    { icon: Activity, label: "Statistics", path: "/#stats" },
    { icon: BookOpen, label: "Guide", path: "/#how-it-works" },
    { icon: HelpCircle, label: "RulePro", path: "/#rule-pro" },
    { icon: Leaf, label: "Mastery Hub", path: "/#mastery" },
    { icon: MessageSquare, label: "Reviews", path: "/#reviews" },
    { icon: FileText, label: "Updates", path: "/#blogs" }
];

const Sidebar = () => {
    const {
        sidebarCollapsed,
        toggleSidebar,
        setSidebarCollapsed,
        mobileSidebarOpen,
        closeMobileSidebar
    } = useStore();

    const desktopSidebarRef = React.useRef<HTMLElement | null>(null);
    const mobileSidebarRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        const onDocumentMouseDown = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (target.closest("[data-sidebar-toggle='true']")) {
                return;
            }

            const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

            if (
                isDesktop &&
                !sidebarCollapsed &&
                desktopSidebarRef.current &&
                !desktopSidebarRef.current.contains(target)
            ) {
                setSidebarCollapsed(true);
            }

            if (
                !isDesktop &&
                mobileSidebarOpen &&
                mobileSidebarRef.current &&
                !mobileSidebarRef.current.contains(target)
            ) {
                closeMobileSidebar();
            }
        };

        document.addEventListener("mousedown", onDocumentMouseDown);
        return () => {
            document.removeEventListener("mousedown", onDocumentMouseDown);
        };
    }, [
        closeMobileSidebar,
        mobileSidebarOpen,
        setSidebarCollapsed,
        sidebarCollapsed
    ]);

    React.useEffect(() => {
        const onEscape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            if (mobileSidebarOpen) closeMobileSidebar();
            if (!sidebarCollapsed) setSidebarCollapsed(true);
        };

        document.addEventListener("keydown", onEscape);
        return () => {
            document.removeEventListener("keydown", onEscape);
        };
    }, [closeMobileSidebar, mobileSidebarOpen, setSidebarCollapsed, sidebarCollapsed]);

    React.useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024 && mobileSidebarOpen) {
                closeMobileSidebar();
            }
        };

        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [closeMobileSidebar, mobileSidebarOpen]);

    return (
        <>
            <aside
                ref={desktopSidebarRef}
                className={`
                    hidden lg:flex
                    h-screen
                    fixed
                    left-0
                    top-0
                    z-[100]
                    overflow-hidden
                    bg-white/60
                    backdrop-blur-2xl
                    border-r border-emerald-100/30
                    flex-col
                    overflow-y-auto
                    overflow-x-hidden
                    scrollbar-none
                    will-change-[width]
                    shadow-[10px_0_30px_rgba(0,0,0,0.02)]
                    transition-[width] duration-200 ease-in-out
                    ${sidebarCollapsed ? "w-20" : "w-[260px]"}
                `}
            >
                <SidebarLogo collapsed={sidebarCollapsed} toggle={toggleSidebar} />

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

                <div className="p-4 text-center text-[10px] font-bold text-gray-500 border-t border-gray-50 bg-gray-50/30 uppercase tracking-tighter">
                    {sidebarCollapsed ? "v1.2" : "Platform v1.2.4 (Beta)"}
                </div>
            </aside>

            {mobileSidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={closeMobileSidebar}
                        aria-label="Close sidebar overlay"
                        className="lg:hidden fixed inset-0 z-[104] bg-black/25 backdrop-blur-[2px]"
                    />

                    <aside
                        ref={mobileSidebarRef}
                        className="
                            lg:hidden
                            fixed
                            left-0
                            top-0
                            bottom-0
                            w-[280px]
                            max-w-[85vw]
                            z-[105]
                            bg-white/90
                            backdrop-blur-2xl
                            border-r border-emerald-100/40
                            shadow-[12px_0_40px_rgba(0,0,0,0.08)]
                            flex flex-col
                        "
                    >
                        <div className="p-4 flex items-center justify-between border-b border-emerald-100/40">
                            <img
                                src="/assets/fullLogo.png"
                                alt="CivixPay Logo"
                                className="h-9 w-auto object-contain"
                            />
                            <button
                                type="button"
                                onClick={closeMobileSidebar}
                                data-sidebar-toggle="true"
                                aria-label="Close sidebar"
                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar no-scrollbar">
                            {menuItems.map((item) => (
                                <SidebarItem
                                    key={`mobile-${item.path}`}
                                    icon={item.icon}
                                    label={item.label}
                                    path={item.path}
                                    collapsed={false}
                                    showTooltip={false}
                                    onSelect={closeMobileSidebar}
                                />
                            ))}
                        </nav>

                        <div className="p-4 text-center text-[10px] font-bold text-gray-500 border-t border-gray-50 bg-gray-50/30 uppercase tracking-tighter">
                            Platform v1.2.4 (Beta)
                        </div>
                    </aside>
                </>
            )}
        </>
    );
};

export default Sidebar;
