import Skeleton from "./Skeleton";

export const HeroSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
            <Skeleton className="w-32 h-6 rounded-full" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-3/4 h-20" />
            <Skeleton className="w-2/3 h-6" />
            <div className="flex gap-4">
                <Skeleton className="w-40 h-14" />
                <Skeleton className="w-40 h-14" />
            </div>
        </div>
        <div className="flex-1 w-full">
            <Skeleton className="w-full aspect-video rounded-[40px]" />
        </div>
    </div>
);

export const SearchSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-white/40 backdrop-blur-3xl rounded-[60px] p-20 border border-white/60">
            <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
                <Skeleton className="w-48 h-8 rounded-full" />
                <Skeleton className="w-2/3 h-16" />
                <Skeleton className="w-full h-20 rounded-[32px]" />
            </div>
        </div>
    </div>
);

export const StatsSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-24 flex gap-8">
        {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="flex-1 h-48 rounded-[32px]" />
        ))}
    </div>
);

export const HowItWorksSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 space-y-4 flex flex-col items-center">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-96 h-12" />
        </div>
        <div className="grid grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-64 rounded-[40px]" />
            ))}
        </div>
    </div>
);

export const RuleProSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white/40 backdrop-blur-3xl rounded-[60px] p-20 border border-white/60 grid lg:grid-cols-2 gap-20">
            <div className="space-y-8">
                <Skeleton className="w-48 h-8" />
                <Skeleton className="w-full h-16" />
                <Skeleton className="w-3/4 h-16" />
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-24 rounded-2xl" />
                    ))}
                </div>
            </div>
            <Skeleton className="w-full h-[500px] rounded-[48px]" />
        </div>
    </div>
);

export const BlogsSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-center mb-10">
            <div className="space-y-2">
                <Skeleton className="w-64 h-8" />
                <Skeleton className="w-48 h-4" />
            </div>
            <Skeleton className="w-20 h-6" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-96 rounded-3xl" />
            ))}
        </div>
    </div>
);

export const ReviewsSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 space-y-4 flex flex-col items-center">
            <Skeleton className="w-96 h-12" />
            <Skeleton className="w-64 h-4" />
        </div>
        <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 rounded-[40px]" />
            ))}
        </div>
    </div>
);

export const PageSkeleton = () => (
    <div className="space-y-0">
        <HeroSkeleton />
        <SearchSkeleton />
        <StatsSkeleton />
        <HowItWorksSkeleton />
        <RuleProSkeleton />
        <ReviewsSkeleton />
        <BlogsSkeleton />
    </div>
);
