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
const ChallanSearch = lazy(() => import("../../shared/components/sections/ChallanSearch"));
const DashboardSummary = lazy(() => import("../../shared/components/sections/DashboardSummary"));

const HowItWorks = lazy(() => import("../../shared/components/sections/HowItWorks"));
const ReviewsSection = lazy(() => import("../../shared/components/sections/ReviewsSection"));
const BlogsSection = lazy(() => import("../../shared/components/sections/BlogsSection"));
const MasteryHub = lazy(() => import("../../shared/components/sections/MasteryHub"));
const RulePro = lazy(() => import("../../shared/components/sections/RulePro"));
const TrustBadges = lazy(() => import("../../shared/components/sections/TrustBadges"));
const GovernmentLogos = lazy(() => import("../../shared/components/sections/GovernmentLogos"));
const Footer = lazy(() => import("../../shared/components/sections/Footer"));

// Pages
const ChallanResults = lazy(() => import("../../app/pages/ChallanResults"));

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
                                <Suspense fallback={<SectionFallback id="search" />}>
                                    <ChallanSearch />
                                </Suspense>
                                <Suspense fallback={<SectionFallback id="stats" />}>
                                    <DashboardSummary />
                                </Suspense>
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

                <Route
                    path="/challans"
                    element={
                        <ErrorBoundary>
                            <MainLayout>
                                <SEO title="Your Challans - CivixPay" description="View and pay your pending vehicle challans securely." />
                                <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-gray-50"><div className="animate-spin h-8 w-8 rounded-full border-4 border-emerald-500 border-t-transparent" /></div>}>
                                    <ChallanResults />
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
