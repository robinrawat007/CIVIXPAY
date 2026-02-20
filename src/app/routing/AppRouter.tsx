import { Suspense, lazy } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout
    from "../layouts/MainLayout";
import SEO from "../../shared/components/ui/SEO";
import ErrorBoundary from "../../shared/components/ui/ErrorBoundary";

const HeroBanner = lazy(() => import("../../shared/components/sections/HeroBanner"));
const DashboardSummary = lazy(() => import("../../shared/components/sections/DashboardSummary"));
const ChallanSearch = lazy(() => import("../../shared/components/sections/ChallanSearch"));
const HowItWorks = lazy(() => import("../../shared/components/sections/HowItWorks"));
const ReviewsSection = lazy(() => import("../../shared/components/sections/ReviewsSection"));
const BlogsSection = lazy(() => import("../../shared/components/sections/BlogsSection"));
const MasteryHub = lazy(() => import("../../shared/components/sections/MasteryHub"));
const RulePro = lazy(() => import("../../shared/components/sections/RulePro"));
const TrustBadges = lazy(() => import("../../shared/components/sections/TrustBadges"));
const GovernmentLogos = lazy(() => import("../../shared/components/sections/GovernmentLogos"));
const Footer = lazy(() => import("../../shared/components/sections/Footer"));

import { PageSkeleton } from "../../shared/components/ui/PageSkeletons";

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
                                <Suspense fallback={<PageSkeleton />}>
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
                                </Suspense>
                            </MainLayout>
                        </ErrorBoundary>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
