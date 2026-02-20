import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout
    from "../layouts/MainLayout";
import SEO from "../../shared/components/ui/SEO";
import ErrorBoundary from "../../shared/components/ui/ErrorBoundary";

import HeroBanner from "../../shared/components/sections/HeroBanner";
import DashboardSummary from "../../shared/components/sections/DashboardSummary";
import ChallanSearch from "../../shared/components/sections/ChallanSearch";
import HowItWorks from "../../shared/components/sections/HowItWorks";
import ReviewsSection from "../../shared/components/sections/ReviewsSection";
import BlogsSection from "../../shared/components/sections/BlogsSection";
import MasteryHub from "../../shared/components/sections/MasteryHub";
import RulePro from "../../shared/components/sections/RulePro";
import TrustBadges from "../../shared/components/sections/TrustBadges";
import GovernmentLogos from "../../shared/components/sections/GovernmentLogos";
import Footer from "../../shared/components/sections/Footer";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={
                        <ErrorBoundary>
                            <MainLayout>
                                <SEO />
                                <HeroBanner />
                                <ChallanSearch />
                                <DashboardSummary />
                                <HowItWorks />
                                <RulePro />
                                <MasteryHub />
                                <ReviewsSection />
                                <BlogsSection />
                                <TrustBadges />
                                <GovernmentLogos />
                                <Footer />
                            </MainLayout>
                        </ErrorBoundary>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
