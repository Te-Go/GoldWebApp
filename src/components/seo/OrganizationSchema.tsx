
import { SchemaOrg } from './SchemaOrg';

export const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TG Dijital",
        "url": "https://altin-fiyatlari.tr",
        "logo": "https://altin-fiyatlari.tr/tg-dijital-logo.png",
        "sameAs": [
            "https://www.linkedin.com/company/tg-dijital",
            "https://twitter.com/tg_dijital"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "destek@tgdijital.com"
        }
    };

    return <SchemaOrg schema={schema} />;
};
