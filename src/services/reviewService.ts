import { supabase } from "@/lib/supabase";

export interface Review {
    id: string;
    name: string;
    role: string;
    avatar: string;
    review: string;
    rating: number;
    paid: string;
}

// Typed to match the Supabase join query structure
interface DbReview {
    id: string;
    rating: number;
    comment: string;
    profiles: {
        email: string | null;
        kyc_status: string | null;
    } | null;
}

const MOCK_REVIEWS: Review[] = [
    {
        id: "mock-1",
        name: "Arjun Sharma",
        role: "Property Owner",
        avatar: "https://i.pravatar.cc/150?u=arjun",
        review: "The fastest way to pay property tax. The glass UI is actually helpful and not just for show. Love the transparency.",
        rating: 5,
        paid: "₹4,500"
    },
    {
        id: "mock-2",
        name: "Priya Patel",
        role: "Business Owner",
        avatar: "https://i.pravatar.cc/150?u=priya",
        review: "CivixPay saved me hours of standing in lines. Impressed!",
        rating: 5,
        paid: "₹12,800"
    },
    {
        id: "mock-3",
        name: "Vikram Singh",
        role: "Citizen",
        avatar: "https://i.pravatar.cc/150?u=vikram",
        review: "Settling traffic challans has never been this aesthetic. The mobile responsiveness is top-notch.",
        rating: 4,
        paid: "₹1,200"
    }
];

const mapDbReviewToReview = (item: DbReview): Review => ({
    id: item.id,
    name: item.profiles?.email?.split('@')[0] || "Citizen",
    role: item.profiles?.kyc_status === 'verified' ? "Verified Citizen" : "Citizen",
    avatar: `https://i.pravatar.cc/150?u=${item.id}`,
    review: item.comment,
    rating: item.rating,
    paid: "Verified"
});

export const reviewService = {
    getReviews: async (): Promise<Review[]> => {
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select(`
                    id,
                    rating,
                    comment,
                    profiles (
                        email,
                        kyc_status
                    )
                `)
                .order('created_at', { ascending: false })
                .limit(6);

            if (error || !data || data.length === 0) {
                return MOCK_REVIEWS;
            }

            return (data as unknown as DbReview[]).map(mapDbReviewToReview);

        } catch (e) {
            console.error("Failed to fetch reviews", e);
            return MOCK_REVIEWS;
        }
    },

    submitReview: async (userId: string, rating: number, comment: string): Promise<boolean> => {
        if (!comment.trim() || comment.trim().length < 10) {
            throw new Error("Review must be at least 10 characters.");
        }
        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5.");
        }

        const { error } = await supabase
            .from('reviews')
            .insert({
                user_id: userId,
                rating,
                comment: comment.trim()
            });

        if (error) {
            console.error("Failed to submit review:", error);
            throw new Error(error.message);
        }
        return true;
    }
};
