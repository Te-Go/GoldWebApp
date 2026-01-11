import { useSpread, useMacro, useGoldPrice } from '../../context/GoldContext';
import { GlassCard } from '../ui/GlassCard';
import { AlertTriangle } from 'lucide-react';
import './SpreadMatrix.css';

export const SpreadMatrix = () => {
    const spread = useSpread();
    const macro = useMacro();
    const gramPrice = useGoldPrice('gram');

    const bankSpread = spread.bankAvgSell - spread.bankAvgBuy;
    const bazaarSpread = spread.bazaarSell - spread.bazaarBuy;
    const spreadDiff = bankSpread - bazaarSpread;
    const isHighSpread = spreadDiff > 50;
    const hasPanicMode = macro.bazaarSpreadOverride > 0;

    return (
        <section className="spread-matrix">
            <h2 className="spread-title">
                Altın Alım Karşılaştırması
                {hasPanicMode && (
                    <span className="panic-badge">
                        <AlertTriangle size={14} />
                        Canlı Manuel Güncelleme
                    </span>
                )}
            </h2>

            <div className="spread-grid">
                {/* Bank Column */}
                <GlassCard className="spread-card spread-card-bank">
                    <div className="spread-source">Ortalama Banka</div>
                    <div className="spread-prices">
                        <div className="spread-price-row">
                            <span className="spread-label">Alış</span>
                            <span className="spread-price bank-price tabular-nums">
                                ₺{spread.bankAvgBuy.toLocaleString('tr-TR')}
                            </span>
                        </div>
                        <div className="spread-price-row">
                            <span className="spread-label">Satış</span>
                            <span className="spread-price bank-price tabular-nums">
                                ₺{spread.bankAvgSell.toLocaleString('tr-TR')}
                            </span>
                        </div>
                    </div>
                    <div className="spread-info">
                        Makas: ₺{bankSpread.toFixed(0)}
                    </div>
                </GlassCard>

                {/* Bazaar Column - Highlighted */}
                <GlassCard variant="gold" className="spread-card spread-card-bazaar animate-glow">
                    <div className="spread-source">
                        Kapalıçarşı
                        <span className="live-badge">Canlı</span>
                    </div>
                    <div className="spread-prices">
                        <div className="spread-price-row">
                            <span className="spread-label">Alış</span>
                            <span className="spread-price bazaar-price price-large tabular-nums">
                                ₺{spread.bazaarBuy.toLocaleString('tr-TR')}
                            </span>
                        </div>
                        <div className="spread-price-row">
                            <span className="spread-label">Satış</span>
                            <span className="spread-price bazaar-price price-large tabular-nums">
                                ₺{spread.bazaarSell.toLocaleString('tr-TR')}
                            </span>
                        </div>
                    </div>
                    <div className="spread-info text-gold">
                        Makas: ₺{bazaarSpread.toFixed(0)}
                    </div>
                </GlassCard>

                {/* Savings Column */}
                <GlassCard className="spread-card spread-card-savings">
                    <div className="spread-source">Tasarrufunuz</div>
                    <div className="savings-value">
                        <span className={`savings-amount ${isHighSpread ? 'text-up' : 'text-gold'}`}>
                            ₺{spreadDiff.toFixed(0)}
                        </span>
                        <span className="savings-label">daha az makas</span>
                    </div>
                    {isHighSpread && (
                        <div className="spread-warning badge badge-down">
                            ⚠️ Yüksek Banka Makası
                        </div>
                    )}
                </GlassCard>
            </div>
        </section>
    );
};
