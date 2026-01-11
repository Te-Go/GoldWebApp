import { useState } from 'react';
import { useGoldPrice } from '../../context/GoldContext';
import { GlassCard } from '../ui/GlassCard';
import './ZakatCalculator.css';

export const ZakatCalculator = () => {
    const [grams, setGrams] = useState<string>('100');
    const gramPrice = useGoldPrice('gram');

    const gramsNum = parseFloat(grams) || 0;
    const totalValue = gramsNum * (gramPrice?.sell || 0);
    const zakatAmount = totalValue * 0.025; // 2.5% = 1/40

    return (
        <section className="zakat-calculator">
            <GlassCard className="zakat-card">
                <h3 className="zakat-title">
                    ⚖️ Altın Varlık Hesabı
                </h3>

                <div className="zakat-input-group">
                    <label className="zakat-label">Toplam Altın (Gram):</label>
                    <input
                        type="number"
                        className="input zakat-input tabular-nums"
                        value={grams}
                        onChange={(e) => setGrams(e.target.value)}
                        min={0}
                        step={1}
                    />
                </div>

                <div className="zakat-results">
                    <div className="result-row">
                        <span className="result-label">Toplam Değer:</span>
                        <span className="result-value tabular-nums">
                            ₺{totalValue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="result-row highlight">
                        <span className="result-label">1/40 Payı (2.5%):</span>
                        <span className="result-value text-gold tabular-nums">
                            ₺{zakatAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                <p className="zakat-note">
                    * Bu hesaplama yalnızca bilgi amaçlıdır.
                </p>
            </GlassCard>
        </section>
    );
};
