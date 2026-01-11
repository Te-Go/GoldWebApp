import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './GoldFAQ.css';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        id: 'q1',
        question: 'Gram altın nedir? Neden yatırım aracı olarak tercih edilir?',
        answer: 'Gram altın, 24 ayar saf altının gram cinsinden fiyatlandırılmasıdır. Küçük miktarlarda alım-satım yapılabilmesi, kolay saklanması ve likiditesinin yüksek olması nedeniyle yatırım aracı olarak tercih edilir.'
    },
    {
        id: 'q2',
        question: 'Çeyrek, yarım ve tam altın arasındaki fark nedir?',
        answer: 'Çeyrek altın yaklaşık 1.75 gram, yarım altın 3.5 gram ve tam altın 7 gram ağırlığındadır. Bu ağırlıklar 22 ayar altın içerir ve her birinin üzerinde işçilik maliyeti bulunur.'
    },
    {
        id: 'q3',
        question: 'Cumhuriyet altını ile Ata altını arasındaki fark nedir?',
        answer: 'Her ikisi de 7 gram ağırlığındadır ancak darphane tarafından basılan farklı dizaynlara sahiptir. Cumhuriyet altını Atatürk kabartmalı, Ata altını ise Atatürk portreli olarak basılır.'
    },
    {
        id: 'q4',
        question: 'Yeni ve eski (zayıf) altın ne demektir?',
        answer: 'Yeni altın, darphane tarafından yeni basılmış, işçiliği tam olan altınlardır. Eski altın ise zamanla aşınmış, işçiliği azalmış altınlardır ve fiyatı biraz daha düşüktür.'
    },
    {
        id: 'q5',
        question: 'Altın alırken nelere dikkat etmeliyim?',
        answer: 'Güvenilir kuyumculardan alışveriş yapın, fatura/belge alın, ayar ve gram bilgisini kontrol edin. Alış-satış arasındaki farkı (spread) karşılaştırın.'
    },
    {
        id: 'q6',
        question: 'Zekat hesaplamasında altın nasıl değerlendirilir?',
        answer: 'Zekat için nisab miktarı 80.18 gram altındır. Yıl boyunca bu miktarın üzerinde altına sahipseniz, değerinin %2.5\'ini zekat olarak vermeniz gerekir.'
    },
];

export const GoldFAQ = () => {
    const [openId, setOpenId] = useState<string | null>('q1');

    const toggleQuestion = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="gold-faq">
            <GlassCard className="faq-card">
                <div className="faq-header">
                    <div className="header-title">
                        <HelpCircle size={20} className="header-icon" />
                        <h3>Sık Sorulan Sorular</h3>
                    </div>
                    <span className="header-badge">SSS</span>
                </div>

                <div className="faq-list">
                    {faqData.map((item) => (
                        <div
                            key={item.id}
                            className={`faq-item ${openId === item.id ? 'open' : ''}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleQuestion(item.id)}
                            >
                                <span>{item.question}</span>
                                <ChevronDown size={18} className="chevron" />
                            </button>
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </section>
    );
};
