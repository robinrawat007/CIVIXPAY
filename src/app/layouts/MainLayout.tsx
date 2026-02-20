import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";
import Sidebar
    from "../../shared/components/navigation/Sidebar/Sidebar";
import AIChatBot from "../../shared/components/ui/AIChatBot";
import LiveActivityFeed from "../../shared/components/ui/LiveActivityFeed";
import HeaderBar
    from "../../shared/components/navigation/Header/HeaderBar";
import { useStore } from "@/store/useStore";

type Props = {
    children: React.ReactNode;
};

import useEventListener from "../../shared/hooks/useEventListener";

const MainLayout = ({
    children
}: Props) => {
    const { sidebarCollapsed } = useStore();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Correct implementation of thottled mouse move with useEventListener
    const lastCall = React.useRef(0);
    const onMouseMove = React.useCallback((e: MouseEvent) => {
        const now = performance.now();
        if (now - lastCall.current < 16) return;
        lastCall.current = now;
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    }, [mouseX, mouseY]);

    useEventListener("mousemove", onMouseMove, window, { passive: true });

    return (
        <div className="flex mesh-bg min-h-screen relative overflow-hidden">
            {/* Interactive Aura Background - Hidden on mobile for performance */}
            <motion.div
                style={{
                    left: springX,
                    top: springY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                className="fixed w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none z-0 hidden lg:block"
            />

            <Sidebar />

            <main className="flex-1 px-6 pb-6 relative z-10 transition-all duration-300 pl-24">
                <div className="max-w-7xl mx-auto">
                    <HeaderBar />
                    <div className="pt-2">
                        {children}
                    </div>
                </div>
            </main>
            <AIChatBot />
            <LiveActivityFeed sidebarCollapsed={sidebarCollapsed} />
        </div>
    );
};

export default MainLayout;
