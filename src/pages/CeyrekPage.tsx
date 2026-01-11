import { useGoldPrice } from '../context/GoldContext';
import { GlassCard } from '../components/ui/GlassCard';
import { WeddingCalculator } from '../components/features/WeddingCalculator';
import { InflationChart } from '../components/features/InflationChart';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import './CeyrekPage.css';

interface CeyrekPageProps {
    onBack: () => void;
}

export const CeyrekPage = ({ onBack }: CeyrekPageProps) => {
    const ceyrekPrice = useGoldPrice('ceyrek');

    if (!ceyrekPrice) return null;

    return (
        <div className="ceyrek-page">
            {/* Header */}
            <header className="spoke-header">
                <button className="btn btn-ghost back-btn" onClick={onBack}>
                    <ArrowLeft size={20} />
                    Geri
                </button>
            </header>

            {/* Hero Price Card */}
            <section className="price-hero">
                <GlassCard variant="gold" className="hero-card animate-glow">
                    <div className="hero-icon">🥇</div>
                    <h1 className="hero-name">Çeyrek Altın</h1>

                    <div className="hero-prices">
                        <div className="hero-price-group">
                            <span className="hero-label">Alış</span>
                            <span className="hero-price tabular-nums">
                                ₺{ceyrekPrice.buy.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="hero-divider" />
                        <div className="hero-price-group">
                            <span className="hero-label">Satış</span>
                            <span className="hero-price tabular-nums">
                                ₺{ceyrekPrice.sell.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    <div className={`hero-change ${ceyrekPrice.changePercent >= 0 ? 'text-up' : 'text-down'}`}>
                        {ceyrekPrice.changePercent >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                        <span className="tabular-nums">
                            {ceyrekPrice.changePercent >= 0 ? '+' : ''}
                            {ceyrekPrice.change.toFixed(2)} TL ({ceyrekPrice.changePercent.toFixed(2)}%)
                        </span>
                    </div>
                </GlassCard>
            </section>

            {/* Wedding Calculator */}
            <WeddingCalculator />

            {/* Chart with Inflation Toggle */}
            <InflationChart goldType="ceyrek" />

            {/* Bank Comparison */}
            <section className="bank-comparison">
                <h3 className="section-title">Banka Karşılaştırması</h3>
                <GlassCard className="comparison-card">
                    <div className="bank-row">
                        <span className="bank-name">Ziraat Bankası</span>
                        <span className="bank-price tabular-nums">₺5,420</span>
                    </div>
                    <div className="bank-row">
                        <span className="bank-name">Vakıfbank</span>
                        <span className="bank-price tabular-nums">₺5,380</span>
                    </div>
                    <div className="bank-row">
                        <span className="bank-name">Halkbank</span>
                        <span className="bank-price tabular-nums">₺5,450</span>
                    </div>
                    <div className="bank-row highlight">
                        <span className="bank-name text-gold">Kapalıçarşı (En İyi)</span>
                        <span className="bank-price text-gold tabular-nums">
                            ₺{ceyrekPrice.sell.toLocaleString('tr-TR')}
                        </span>
                    </div>
                </GlassCard>
            </section>
        </div>
    );
};
