import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    twitterHandle?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = 'CivixPay - Secure Digital Gateway for Citizen Services',
    description = 'Pay and track your challans with ease. Experience transparent digital governance with CivixPay, India\'s leading citizen service platform.',
    canonical = 'https://civixpay.gov.in',
    ogType = 'website',
    ogImage = '/assets/og-image.png',
    twitterHandle = '@CivixPay'
}) => {
    const siteTitle = title.includes('CivixPay') ? title : `${title} | CivixPay`;

    return (
        <Helmet>
            {/* Base Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph Tags */}
            <meta property="og:site_name" content="CivixPay" />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#10b981" />
        </Helmet>
    );
};

export default React.memo(SEO);
