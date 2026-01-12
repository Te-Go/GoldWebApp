
import { useGold } from '../../context/GoldContext';
import { SchemaOrg } from './SchemaOrg';

export const LiveBlogSchema = () => {
    const { lastUpdate } = useGold();

    if (!lastUpdate) return null;

    // KILL SWITCH: If data is older than 2 hours, do not render schema
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
    const now = new Date();
    const diff = now.getTime() - new Date(lastUpdate).getTime();

    if (diff > TWO_HOURS_MS) {
        console.warn('SEO Kill Switch Active: Data is stale (>2h), disabling LiveBlog schema.');
        return null;
    }

    const today = new Date().toISOString().split('T')[0];
    const startTime = `${today}T00:00:01+03:00`;
    const endTime = `${today}T23:59:59+03:00`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "LiveBlogPosting",
        "headline": "Canlı Altın Fiyatları ve Piyasa Analizi",
        "description": "Gram altın, çeyrek altın ve döviz kurları canlı takip. Kapalıçarşı ve banka fiyatları anlık güncelleniyor.",
        "coverageStartTime": startTime,
        "coverageEndTime": endTime,
        "dateModified": new Date(lastUpdate).toISOString(),
        "author": {
            "@type": "Organization",
            "name": "TG Finans Masası",
            "url": "https://altin-fiyatlari.tr"
        },
        "publisher": {
            "@type": "Organization",
            "name": "TG Dijital",
            "logo": {
                "@type": "ImageObject",
                "url": "https://altin-fiyatlari.tr/logo.png"
            }
        },
        "about": [
            {
                "@type": "Thing",
                "name": "Gold",
                "sameAs": "https://www.wikidata.org/wiki/Q897"
            },
            {
                "@type": "Place",
                "name": "Istanbul",
                "sameAs": "https://www.wikidata.org/wiki/Q406"
            }
        ]
    };

    return <SchemaOrg schema={schema} />;
};
