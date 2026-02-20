import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import React from "react";
import Sidebar
    from "../../shared/components/navigation/Sidebar/Sidebar";
import HeaderBar
    from "../../shared/components/navigation/Header/HeaderBar";
import { useStore } from "@/store/useStore";
import useEventListener from "../../shared/hooks/useEventListener";

type Props = {
    children: React.ReactNode;
};

const AIChatBot = React.lazy(() => import("../../shared/components/ui/AIChatBot"));
const LiveActivityFeed = React.lazy(() => import("../../shared/components/ui/LiveActivityFeed"));

const MainLayout = ({
    children
}: Props) => {
    const { sidebarCollapsed } = useStore();
    const prefersReducedMotion = useReducedMotion();
    const [showDeferredWidgets, setShowDeferredWidgets] = React.useState(false);
    const [isDesktopViewport, setIsDesktopViewport] = React.useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(min-width: 1024px)").matches
            : true
    );
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const onChange = (event: MediaQueryListEvent) => {
            setIsDesktopViewport(event.matches);
        };

        setIsDesktopViewport(mediaQuery.matches);
        mediaQuery.addEventListener("change", onChange);

        return () => {
            mediaQuery.removeEventListener("change", onChange);
        };
    }, []);

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

    // Correct implementation of thottled mouse move with useEventListener
    const lastCall = React.useRef(0);
    const onMouseMove = React.useCallback((e: MouseEvent) => {
        if (!isDesktopViewport || prefersReducedMotion) return;
        const now = performance.now();
        if (now - lastCall.current < 16) return;
        lastCall.current = now;
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    }, [isDesktopViewport, prefersReducedMotion, mouseX, mouseY]);

    useEventListener("mousemove", onMouseMove, window, { passive: true });

    return (
        <div className="flex mesh-bg min-h-screen relative overflow-x-hidden">
            {/* Interactive Aura Background - Hidden on mobile for performance */}
            <motion.div
                style={{
                    left: springX,
                    top: springY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                className={`fixed w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none z-0 ${
                    prefersReducedMotion ? "hidden" : "hidden lg:block"
                }`}
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
        </div>
    );
};

export default MainLayout;
