import {
    Search,
    Info,
    HelpCircle,
    BookOpen
} from "lucide-react";

export const sidebarItems = [
    {
        key: "track",
        label: "Track Challan",
        icon: Search,
        path: "/track",
        roles: ["citizen", "admin"]
    },
    {
        key: "how",
        label: "How It Works",
        icon: Info,
        path: "/how-it-works",
        roles: ["citizen"]
    },
    {
        key: "support",
        label: "Support",
        icon: HelpCircle,
        path: "/support",
        roles: ["citizen"]
    },
    {
        key: "blogs",
        label: "Blogs",
        icon: BookOpen,
        path: "/blogs",
        roles: ["citizen"]
    }
];
