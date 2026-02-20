import React from "react";
import SectionContainer
    from "./SectionContainer";

import BlogCard
    from "../ui/BlogCard";
import { BlogsSkeleton } from "../ui/PageSkeletons";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blogService";

const BlogsSection = () => {
    const { data: blogs, isLoading } = useQuery({
        queryKey: ["blogs"],
        queryFn: blogService.getBlogs,
    });

    if (isLoading || !blogs) return <BlogsSkeleton />;

    return (
        <SectionContainer id="blogs">

            {/* Heading */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 sm:mb-10">

                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Latest Updates & Blogs
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Stay informed with traffic and
                        payment updates.
                    </p>
                </div>

                <button className="self-start sm:self-auto text-emerald-600 font-medium hover:underline">
                    View All →
                </button>

            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {blogs.map((blog, i) => (
                    <BlogCard key={i} {...blog} />
                ))}
            </div>

        </SectionContainer>
    );
};

export default React.memo(BlogsSection);
