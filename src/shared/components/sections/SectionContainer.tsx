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
        <section
            id={id}
            className={`section-cv w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24 relative z-10 overflow-x-hidden ${className}`}
        >
            {children}

            {/* Subtle Divider Glow */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
        </section>
    );
};

export default React.memo(SectionContainer);
