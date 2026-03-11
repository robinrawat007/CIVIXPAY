import React from "react";
import SectionContainer from "./SectionContainer";
import BlogCard from "../ui/BlogCard";
import { BlogsSkeleton } from "../ui/PageSkeletons";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blogService";
import { AlertCircle, RefreshCw } from "lucide-react";

const BlogsSection = () => {
    const { data: blogs, isLoading, isError, refetch } = useQuery({
        queryKey: ["blogs"],
        queryFn: blogService.getBlogs,
        staleTime: 1000 * 60 * 10,
    });

    // Single top-level return — avoids Vite's $1 naming collision
    // caused by the same default import used in two separate return paths
    return (
        <SectionContainer id="blogs">
            {/* Heading */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 sm:mb-10">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Latest Updates &amp; Blogs
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Stay informed with traffic and payment updates.
                    </p>
                </div>
                <button className="self-start sm:self-auto text-emerald-600 font-medium hover:underline">
                    View All →
                </button>
            </div>

            {/* Blog Grid */}
            {isLoading ? (
                <BlogsSkeleton />
            ) : isError ? (
                <div className="flex flex-col items-center justify-center p-16 bg-gray-50 rounded-3xl text-center">
                    <AlertCircle size={40} className="text-gray-300 mb-3" />
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Couldn&apos;t load updates</h3>
                    <p className="text-gray-400 text-sm mb-6">Something went wrong while fetching the latest blogs.</p>
                    <button
                        onClick={() => refetch()}
                        className="flex items-center gap-2 text-emerald-600 font-bold text-sm hover:text-emerald-700 transition"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                    {(blogs ?? []).map((blog) => (
                        <BlogCard key={blog.title} {...blog} />
                    ))}
                </div>
            )}
        </SectionContainer>
    );
};

export default React.memo(BlogsSection);
