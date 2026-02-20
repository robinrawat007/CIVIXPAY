import { motion } from "framer-motion";
import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
    id?: string;
};

const SectionContainer = ({
    children,
    className = "",
    id
}: Props) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`max-w-7xl mx-auto px-6 py-24 relative z-10 ${className}`}
        >
            {children}

            {/* Subtle Divider Glow */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
        </motion.section>
    );
};

export default React.memo(SectionContainer);
