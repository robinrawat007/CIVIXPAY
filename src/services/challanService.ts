// Challan Service
export interface DashboardStats {
    challansSettled: string;
    activeCitizens: string;
    securityRating: string;
}

const MOCK_STATS: DashboardStats = {
    challansSettled: "500000",
    activeCitizens: "1200000",
    securityRating: "99",
};

export const challanService = {
    getDashboardStats: async (): Promise<DashboardStats> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return MOCK_STATS;
    },
};
