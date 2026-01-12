
import { SchemaOrg } from './SchemaOrg';

export const FAQSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Gram altın fiyatı ne kadar?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Canlı verilere göre gram altın serbest piyasada ve Kapalıçarşı'da anlık olarak güncellenmektedir. Güncel alış ve satış fiyatlarını tablomuzdan takip edebilirsiniz."
                }
            },
            {
                "@type": "Question",
                "name": "Çeyrek altın ne kadar?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Çeyrek altın fiyatları darphane basım maliyetlerine göre değişebilir. Güncel Kapalıçarşı çeyrek altın satış fiyatını sayfamızda bulabilirsiniz."
                }
            },
            {
                "@type": "Question",
                "name": "Altın fiyatları düşecek mi yüksülecek mi?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Altın fiyatları küresel enflasyon, FED faiz kararları ve jeopolitik risklere göre değişmektedir. Uzman analizleri ve anlık piyasa trendlerini 'Piyasa Analizi' bölümümüzden inceleyebilirsiniz."
                }
            },
            {
                "@type": "Question",
                "name": "Makas aralığı en düşük banka hangisi?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bankaların altın makas aralıkları mesai saatlerine göre değişmektedir. Genellikle kamu bankaları ve dijital bankacılık uygulamaları mesai saatleri içinde daha rekabetçi kurlar sunmaktadır."
                }
            }
        ]
    };

    return <SchemaOrg schema={schema} />;
};
