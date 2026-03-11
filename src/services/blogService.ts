import { supabase } from "@/lib/supabase";

export interface Blog {
    title: string;
    desc: string;
    image: string;
    date: string;
}

export const blogService = {
    getBlogs: async (): Promise<Blog[]> => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('is_published', true)
                .order('published_at', { ascending: false })
                .limit(3);

            if (error || !data || data.length === 0) {
                console.warn("Falling back to generic blog data", error);
                return [
                    {
                        title: "Welcome to CivixPay Digital Platform",
                        desc: "Smarter, faster, and more transparent citizen services powered by Web3 technologies.",
                        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=70",
                        date: "Today"
                    }
                ];
            }

            return data.map((blog) => ({
                title: blog.title,
                desc: (blog.content?.substring(0, 80) || '') + '...',
                date: new Date(blog.published_at || blog.created_at || Date.now()).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }),
                image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=70", // Placeholder until we add storage
            }));
        } catch (e) {
            console.error("Get blogs error", e);
            return [];
        }
    },
};
