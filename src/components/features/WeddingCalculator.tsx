import { useState, useMemo } from 'react';
import { useGoldPrices } from '../../context/GoldContext';
import { calculateWeddingBasket } from '../../data/mockPayload';
import { GlassCard } from '../ui/GlassCard';
import './WeddingCalculator.css';

export const WeddingCalculator = () => {
    const [budget, setBudget] = useState(50000);
    const prices = useGoldPrices();

    const basket = useMemo(() => {
        return calculateWeddingBasket(budget, prices);
    }, [budget, prices]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
    };

    return (
        <section className="wedding-calculator">
            <GlassCard className="calculator-card">
                <h3 className="calculator-title">
                    💒 Düğün Hesabı
                    <span className="calculator-subtitle">Bütçene göre altın sepeti</span>
                </h3>

                <div className="budget-input-group">
                    <label className="budget-label">Bütçem:</label>
                    <div className="budget-slider-row">
                        <input
                            type="range"
                            className="slider"
                            min={10000}
                            max={500000}
                            step={5000}
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                        />
                        <input
                            type="text"
                            className="input budget-text-input tabular-nums"
                            value={formatCurrency(budget)}
                            onChange={(e) => {
                                const val = parseInt(e.target.value.replace(/\D/g, ''));
                                if (!isNaN(val)) setBudget(Math.min(500000, Math.max(10000, val)));
                            }}
                        />
                    </div>
                </div>

                <div className="basket-display">
                    <div className="basket-title">Altın Sepetiniz:</div>
                    <div className="basket-coins">
                        {basket.coins.length === 0 ? (
                            <div className="basket-empty">Bütçe yetersiz</div>
                        ) : (
                            basket.coins.map((coin, idx) => (
                                <div key={idx} className="coin-group">
                                    {Array.from({ length: Math.min(coin.count, 10) }).map((_, i) => (
                                        <div key={i} className="coin-image" title={coin.type === 'ceyrek' ? 'Çeyrek Altın' : 'Gram Altın'}>
                                            {coin.type === 'ceyrek' ? '🥇' : '🪙'}
                                        </div>
                                    ))}
                                    {coin.count > 10 && (
                                        <span className="coin-overflow">+{coin.count - 10}</span>
                                    )}
                                    <span className="coin-label">
                                        {coin.count}x {coin.type === 'ceyrek' ? 'Çeyrek' : 'Gram'}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="basket-summary">
                    <div className="summary-row">
                        <span>Toplam Değer:</span>
                        <span className="tabular-nums">{formatCurrency(budget - basket.remaining)}</span>
                    </div>
                    <div className="summary-row remaining">
                        <span>Artan Para:</span>
                        <span className="text-gold tabular-nums">{formatCurrency(basket.remaining)}</span>
                    </div>
                </div>
            </GlassCard>
        </section>
    );
};
