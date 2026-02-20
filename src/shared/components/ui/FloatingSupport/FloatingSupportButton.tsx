import { motion } from "framer-motion";
import React from "react";
import { Headset } from "lucide-react";

const containerVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 }
};

const FloatingSupportButton = () => {
    return (
        <motion.div
            {...containerVariants}
            className="fixed bottom-6 right-6 z-50"
        >
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition"
            >
                <Headset size={22} />

                {/* Pulse Ring */}
                <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-30"></span>
            </motion.button>
        </motion.div>
    );
};

export default React.memo(FloatingSupportButton);
