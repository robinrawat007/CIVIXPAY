

type Props = {
    className?: string;
};

const Skeleton = ({ className = "" }: Props) => {
    return (
        <div
            className={`
                bg-gray-200/50 
                rounded-2xl 
                relative 
                overflow-hidden 
                before:absolute 
                before:inset-0 
                before:-translate-x-full 
                before:animate-[shimmer_2s_infinite] 
                before:bg-gradient-to-r 
                before:from-transparent 
                before:via-white/40 
                before:to-transparent
                ${className}
            `}
        />
    );
};

export default Skeleton;
