import React from "react";
import Sidebar
    from "../../shared/components/navigation/Sidebar/Sidebar";
import HeaderBar
    from "../../shared/components/navigation/Header/HeaderBar";
import { useStore } from "@/store/useStore";

type Props = {
    children: React.ReactNode;
};

const AIChatBot = React.lazy(() => import("../../shared/components/ui/AIChatBot"));
const LiveActivityFeed = React.lazy(() => import("../../shared/components/ui/LiveActivityFeed"));
const AuthModal = React.lazy(() => import("../../shared/components/auth/AuthModal"));

const MainLayout = ({
    children
}: Props) => {
    const { sidebarCollapsed } = useStore();
    const [showDeferredWidgets, setShowDeferredWidgets] = React.useState(false);

    React.useEffect(() => {
        const requestIdle = (window as Window & {
            requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
            cancelIdleCallback?: (id: number) => void;
        }).requestIdleCallback;
        const cancelIdle = (window as Window & {
            requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
            cancelIdleCallback?: (id: number) => void;
        }).cancelIdleCallback;

        let timeoutId: number | null = null;
        let idleId: number | null = null;

        const showWidgets = () => {
            setShowDeferredWidgets(true);
        };

        if (requestIdle) {
            idleId = requestIdle(showWidgets, { timeout: 1200 });
        } else {
            timeoutId = window.setTimeout(showWidgets, 700);
        }

        return () => {
            if (idleId !== null && cancelIdle) {
                cancelIdle(idleId);
            }
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, []);

    return (
        <div className="flex mesh-bg min-h-screen relative overflow-x-hidden">
            {/* Interactive Aura Background - Hidden on mobile for performance */}
            <div
                className="
                    hidden lg:block
                    fixed left-1/2 top-24 -translate-x-1/2
                    w-[560px] h-[560px]
                    bg-emerald-500/5 blur-[120px] rounded-full
                    pointer-events-none z-0
                "
            />

            <Sidebar />

            <main
                className={`flex-1 w-full min-w-0 px-4 sm:px-6 pb-6 relative z-10 transition-all duration-300 ${
                    sidebarCollapsed ? "lg:pl-24" : "lg:pl-[260px]"
                }`}
            >
                <div className="max-w-7xl mx-auto">
                    <HeaderBar />
                    <div className="pt-2">
                        {children}
                    </div>
                </div>
            </main>

            {showDeferredWidgets && (
                <React.Suspense fallback={null}>
                    <AIChatBot />
                    <LiveActivityFeed sidebarCollapsed={sidebarCollapsed} />
                </React.Suspense>
            )}
            
            <React.Suspense fallback={null}>
                <AuthModal />
            </React.Suspense>
        </div>
    );
};

export default MainLayout;
