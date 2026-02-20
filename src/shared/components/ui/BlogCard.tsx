import { motion } from "framer-motion";
import React from "react";
import { ArrowUpRight } from "lucide-react";

type Props = {
    title: string;
    desc: string;
    image: string;
    date: string;
};

const BlogCard = ({
    title,
    desc,
    image,
    date
}: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -5 }}
            className="group relative bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300"
        >
            {/* Image Wrapper */}
            <div className="h-56 overflow-hidden relative">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width="1200"
                    height="800"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-widest shadow-sm">
                    {date}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2 mb-3">
                    {title}
                </h3>

                <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6 flex-1">
                    {desc}
                </p>

                <div className="pt-4 border-t border-gray-100/50 flex items-center justify-between group/link cursor-pointer">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover/link:text-emerald-600 transition-colors">
                        Read Analysis
                    </span>
                    <ArrowUpRight size={18} className="text-gray-300 group-hover/link:text-emerald-600 transition-all" />
                </div>
            </div>
        </motion.div>
    );
};

export default React.memo(BlogCard);
