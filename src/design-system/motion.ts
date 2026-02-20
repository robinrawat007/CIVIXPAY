export const motionPresets = {
    sidebar: {
        expanded: {
            width: 260
        },
        collapsed: {
            width: 80
        },
        transition: {
            duration: 0.22,     // faster
            ease: "easeInOut"  // smoother
        }
    },
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4 }
    },
    slideUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    },
    staggerContainer: {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }
};