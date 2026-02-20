import { ChevronLeft } from "lucide-react";

type Props = {
    collapsed: boolean;
    toggle: () => void;
};

const SidebarLogo = ({
    collapsed,
    toggle
}: Props) => {
    return (
        <div className={`flex items-center justify-between ${collapsed ? "p-3" : "p-4"}`}>

            {/* Logo */}
            <div className="flex items-center gap-2">
                <img
                    src={collapsed ? "/assets/shortLogo.png" : "/assets/fullLogo.png"}
                    alt="CivixPay Logo"
                    className={`${collapsed ? "w-14 h-14" : "h-10 w-auto"} object-contain transition-all duration-300`}
                />
            </div>

            {/* Collapse Arrow */}
            <button
                onClick={toggle}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
            >
                <ChevronLeft
                    className={`
    transition-transform
    will-change-transform
    ${collapsed ? "rotate-180" : ""}
  `}
                    size={18}
                />
            </button>

        </div>
    );
};

export default SidebarLogo;
