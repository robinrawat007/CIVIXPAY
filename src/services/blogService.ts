// Blog Service
export interface Blog {
    title: string;
    desc: string;
    image: string;
    date: string;
}

const MOCK_BLOGS: Blog[] = [
    {
        title: "New Traffic Rules Introduced in 2026",
        desc: "Government has updated penalty structures for safer roads.",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=70",
        date: "12 Feb 2026",
    },
    {
        title: "How to Pay Challan Online",
        desc: "Step-by-step guide to quickly pay your challan digitally.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
        date: "5 Feb 2026",
    },
    {
        title: "Top Reasons for Traffic Violations",
        desc: "Understand common violations and how to avoid them.",
        image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=70",
        date: "28 Jan 2026",
    },
];

export const blogService = {
    getBlogs: async (): Promise<Blog[]> => {
        return MOCK_BLOGS;
    },
};
