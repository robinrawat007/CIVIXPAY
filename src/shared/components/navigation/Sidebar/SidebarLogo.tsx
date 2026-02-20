import { ChevronLeft, Menu } from "lucide-react";

type Props = {
    collapsed: boolean;
    toggle: () => void;
};

const SidebarLogo = ({
    collapsed,
    toggle
}: Props) => {
    if (collapsed) {
        return (
            <div className="flex items-center justify-center p-3">
                <button
                    onClick={toggle}
                    data-sidebar-toggle="true"
                    aria-label="Open sidebar"
                    className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between p-4">

            {/* Logo */}
            <div className="flex items-center gap-2">
                <img
                    src="/assets/fullLogo.png"
                    alt="CivixPay Logo"
                    className="h-10 w-auto object-contain transition-all duration-300"
                />
            </div>

            {/* Collapse Arrow */}
            <button
                onClick={toggle}
                data-sidebar-toggle="true"
                aria-label="Close sidebar"
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
            >
                <ChevronLeft
                    className="transition-transform will-change-transform"
                    size={18}
                />
            </button>

        </div>
    );
};

export default SidebarLogo;
