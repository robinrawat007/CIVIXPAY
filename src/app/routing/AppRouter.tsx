import { lazy, Suspense } from "react";
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

const HowItWorks = lazy(() => import("../../shared/components/sections/HowItWorks"));
const ReviewsSection = lazy(() => import("../../shared/components/sections/ReviewsSection"));
const BlogsSection = lazy(() => import("../../shared/components/sections/BlogsSection"));
const MasteryHub = lazy(() => import("../../shared/components/sections/MasteryHub"));
const RulePro = lazy(() => import("../../shared/components/sections/RulePro"));
const TrustBadges = lazy(() => import("../../shared/components/sections/TrustBadges"));
const GovernmentLogos = lazy(() => import("../../shared/components/sections/GovernmentLogos"));
const Footer = lazy(() => import("../../shared/components/sections/Footer"));

const SectionFallback = ({ id }: { id?: string }) => (
    <section
        id={id}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24"
    >
        <div className="h-24 rounded-3xl bg-white/40 animate-pulse" />
    </section>
);

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
                                <Suspense fallback={<SectionFallback id="how-it-works" />}>
                                    <HowItWorks />
                                </Suspense>
                                <Suspense fallback={<SectionFallback id="rule-pro" />}>
                                    <RulePro />
                                </Suspense>
                                <Suspense fallback={<SectionFallback id="mastery" />}>
                                    <MasteryHub />
                                </Suspense>
                                <Suspense fallback={<SectionFallback id="reviews" />}>
                                    <ReviewsSection />
                                </Suspense>
                                <Suspense fallback={<SectionFallback id="blogs" />}>
                                    <BlogsSection />
                                </Suspense>
                                <Suspense fallback={<SectionFallback />}>
                                    <TrustBadges />
                                </Suspense>
                                <Suspense fallback={<SectionFallback />}>
                                    <GovernmentLogos />
                                </Suspense>
                                <Suspense fallback={<SectionFallback />}>
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
