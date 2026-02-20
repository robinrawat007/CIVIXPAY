import Skeleton from "./Skeleton";

export const HeroSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="flex-1 space-y-8">
            <Skeleton className="w-32 h-6 rounded-full" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-3/4 h-20" />
            <Skeleton className="w-2/3 h-6" />
            <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="w-full sm:w-40 h-12 sm:h-14" />
                <Skeleton className="w-full sm:w-40 h-12 sm:h-14" />
            </div>
        </div>
        <div className="flex-1 w-full">
            <Skeleton className="w-full aspect-video rounded-[24px] sm:rounded-[40px]" />
        </div>
    </div>
);

export const SearchSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 lg:pb-32">
        <div className="bg-white/40 backdrop-blur-3xl rounded-[28px] sm:rounded-[44px] lg:rounded-[60px] p-5 sm:p-10 lg:p-16 border border-white/60">
            <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
                <Skeleton className="w-48 h-8 rounded-full" />
                <Skeleton className="w-full sm:w-2/3 h-14 sm:h-16" />
                <Skeleton className="w-full h-16 sm:h-20 rounded-[24px] sm:rounded-[32px]" />
            </div>
        </div>
    </div>
);

export const StatsSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 sm:h-48 rounded-[24px] sm:rounded-[32px]" />
        ))}
    </div>
);

export const HowItWorksSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="text-center mb-10 sm:mb-16 space-y-4 flex flex-col items-center">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-full max-w-96 h-10 sm:h-12" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-56 sm:h-64 rounded-[28px] sm:rounded-[40px]" />
            ))}
        </div>
    </div>
);

export const RuleProSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="bg-white/40 backdrop-blur-3xl rounded-[28px] sm:rounded-[44px] lg:rounded-[60px] p-5 sm:p-8 lg:p-16 border border-white/60 grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
            <div className="space-y-8">
                <Skeleton className="w-48 h-8" />
                <Skeleton className="w-full h-16" />
                <Skeleton className="w-3/4 h-16" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-24 rounded-2xl" />
                    ))}
                </div>
            </div>
            <Skeleton className="w-full h-[380px] sm:h-[500px] rounded-[24px] sm:rounded-[48px]" />
        </div>
    </div>
);

export const BlogsSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 sm:mb-10">
            <div className="space-y-2">
                <Skeleton className="w-64 h-8" />
                <Skeleton className="w-48 h-4" />
            </div>
            <Skeleton className="w-20 h-6" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-96 rounded-3xl" />
            ))}
        </div>
    </div>
);

export const ReviewsSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="text-center mb-10 sm:mb-16 space-y-4 flex flex-col items-center">
            <Skeleton className="w-full max-w-96 h-10 sm:h-12" />
            <Skeleton className="w-64 h-4" />
        </div>
        <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-56 sm:h-64 rounded-[28px] sm:rounded-[40px]" />
            ))}
        </div>
    </div>
);

export const PageSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="grid gap-5 sm:gap-8">
            <Skeleton className="h-10 w-40 rounded-full" />
            <Skeleton className="h-16 w-full max-w-3xl" />
            <Skeleton className="h-[260px] sm:h-[360px] w-full rounded-[24px] sm:rounded-[40px]" />
        </div>
    </div>
);
