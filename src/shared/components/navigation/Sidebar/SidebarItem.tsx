import { motion } from "framer-motion";
import React from "react";
type Props = {
    icon: any;
    label: string;
    collapsed: boolean;
};

const SidebarItem = ({
    icon: Icon,
    label,
    collapsed
}: Props) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl hover:bg-gray-100 transition"
        >
            <Icon size={20} />

            {!collapsed && (
                <span className="text-sm font-medium">
                    {label}
                </span>
            )}
        </motion.div>
    );
};

export default React.memo(SidebarItem);
