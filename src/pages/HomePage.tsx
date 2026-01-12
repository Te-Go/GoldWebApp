import { useState } from 'react';
import { Search } from 'lucide-react';
import { SpreadMatrix } from '../components/features/SpreadMatrix';
import { GoldToGoods } from '../components/features/GoldToGoods';
import { PriceTable } from '../components/features/PriceTable';
import { SentimentMeter } from '../components/features/SentimentMeter';
import { InflationChart } from '../components/features/InflationChart';
import { GlassCard } from '../components/ui/GlassCard';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import './HomePage.css';

const quickChips = [
    { id: 'gram', label: 'Gram' },
    { id: 'ceyrek', label: 'Çeyrek' },
    { id: 'usd', label: 'Dolar' },
    { id: 'eur', label: 'Euro' },
];

import { LiveBlogSchema } from '../components/seo/LiveBlogSchema';
import { TrustBox } from '../components/global/TrustBox';
import { NeuralCurrencyWidget } from '../components/neural/NeuralCurrencyWidget';

export const HomePage = () => {
    const [activeChip, setActiveChip] = useState('gram');

    return (
        <div className="home-page">
            <LiveBlogSchema />
            {/* Header */}
            <header className="page-header">
                <div className="header-brand">
                    <h1 className="logo-text">Altın-<span className="text-gold">Fiyatları</span><span className="text-muted">.tr</span></h1>
                </div>
                <div className="header-actions">
                    <div className="header-search">
                        <Search size={18} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Altın ara..."
                        />
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            {/* Hero - Spread Matrix */}
            <SpreadMatrix />

            {/* Quick Chips - Now Links for SEO? No, keep as filter for chart. Links should be in PriceTable. */}
            <div className="quick-chips">
                {quickChips.map((chip) => (
                    <button
                        key={chip.id}
                        className={`chip ${activeChip === chip.id ? 'active' : ''}`}
                        onClick={() => setActiveChip(chip.id)}
                    >
                        {chip.label}
                    </button>
                ))}
            </div>

            {/* Gold-to-Goods */}
            <GoldToGoods />

            {/* Price Table */}
            <PriceTable />

            {/* Chart */}
            <InflationChart goldType="gram" />

            {/* Sentiment + News Row */}
            <div className="sentiment-news-row">
                <div className="sentiment-col">
                    <NeuralCurrencyWidget />
                    <SentimentMeter />
                </div>
                <div className="news-col">
                    <GlassCard className="news-card">
                        <h3 className="news-title">Piyasa Haberleri</h3>
                        <div className="news-list">
                            <a href="#" className="news-item">
                                <span className="news-date">07 Oca</span>
                                <span className="news-headline">Altın fiyatları yeni haftaya yükselişle başladı</span>
                            </a>
                            <a href="#" className="news-item">
                                <span className="news-date">06 Oca</span>
                                <span className="news-headline">Merkez Bankası faiz kararı bekleniyor</span>
                            </a>
                            <a href="#" className="news-item">
                                <span className="news-date">05 Oca</span>
                                <span className="news-headline">Gram altın 3.200 TL'yi geçti</span>
                            </a>
                        </div>
                        <div style={{
                            marginTop: '12px',
                            fontSize: '0.7rem',
                            color: 'rgba(255,255,255,0.4)',
                            textAlign: 'right',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            paddingTop: '8px'
                        }}>
                            Haber Kaynağı: <span style={{ color: '#d4af37' }}>TG Finans Masası</span>
                        </div>
                    </GlassCard>
                </div>
            </div>

            <TrustBox />
        </div>
    );
};

