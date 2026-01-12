
import { SchemaOrg } from './SchemaOrg';

interface WebAppSchemaProps {
    name: string;
    url: string;
    screenshot?: string;
}

export const WebAppSchema = ({ name, url, screenshot }: WebAppSchemaProps) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": name,
        "url": url,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "screenshot": screenshot || "https://altin-fiyatlari.tr/screenshot.png", // Default or dynamic
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "TRY"
        },
        "featureList": "Live Gold Prices, Instant Calculator, Zakat Calculation"
    };

    return <SchemaOrg schema={schema} />;
};
