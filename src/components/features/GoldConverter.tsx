import { useState, useMemo } from 'react';
import { useGoldPrices } from '../../context/GoldContext';
import { GlassCard } from '../ui/GlassCard';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { gramWeights } from '../../data/extendedMarketData';
import './GoldConverter.css';

type ConversionDirection = 'toGold' | 'fromGold';

export const GoldConverter = () => {
    const [amount, setAmount] = useState<string>('1');
    const [selectedGoldType, setSelectedGoldType] = useState<string>('gram');
    const [direction, setDirection] = useState<ConversionDirection>('toGold');

    const prices = useGoldPrices();

    // Get the selected gold price
    const selectedPrice = useMemo(() => {
        return prices.find(p => p.id === selectedGoldType);
    }, [prices, selectedGoldType]);

    // Calculate conversion
    const conversion = useMemo(() => {
        const qty = parseFloat(amount) || 0;
        if (!selectedPrice || qty <= 0) {
            return { buyTotal: 0, sellTotal: 0, gramEquivalent: 0 };
        }

        // Get gram equivalent for display
        const gramPrice = prices.find(p => p.id === 'gram');
        const gramEquivalent = gramPrice ? (selectedPrice.sell / gramPrice.sell) * qty : qty;

        return {
            buyTotal: selectedPrice.buy * qty,
            sellTotal: selectedPrice.sell * qty,
            gramEquivalent: gramEquivalent
        };
    }, [amount, selectedPrice, prices]);

    // Format currency
    const formatCurrency = (value: number) => {
        return value.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // Swap direction
    const swapDirection = () => {
        setDirection(d => d === 'toGold' ? 'fromGold' : 'toGold');
    };

    // Quick amount presets
    const presets = [1, 5, 10, 25, 50, 100];

    return (
        <section className="gold-converter">
            <GlassCard className="converter-card">
                <h3 className="converter-title">
                    🔄 Altın Çevirici
                    <span className="converter-subtitle">Hızlı hesaplama aracı</span>
                </h3>

                <div className="converter-form">
                    {/* Amount Input */}
                    <div className="input-group">
                        <label className="input-label">Miktar</label>
                        <input
                            type="number"
                            className="input amount-input tabular-nums"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="0"
                            step="0.1"
                            placeholder="1"
                        />
                    </div>

                    {/* Gold Type Select */}
                    <div className="input-group">
                        <label className="input-label">Altın Türü</label>
                        <select
                            className="input gold-select"
                            value={selectedGoldType}
                            onChange={(e) => setSelectedGoldType(e.target.value)}
                        >
                            <optgroup label="Ziynet Altınları">
                                {prices.filter(p => !['ons'].includes(p.id)).map(price => (
                                    <option key={price.id} value={price.id}>
                                        {price.icon} {price.nameTr}
                                    </option>
                                ))}
                            </optgroup>
                            <optgroup label="Külçe Altın (Gram)">
                                {gramWeights.slice(0, 5).map(weight => (
                                    <option key={`weight-${weight.grams}`} value={`weight-${weight.grams}`}>
                                        📊 {weight.label} Külçe
                                    </option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                </div>

                {/* Quick Presets */}
                <div className="quick-presets">
                    {presets.map(preset => (
                        <button
                            key={preset}
                            className={`preset-btn ${amount === String(preset) ? 'active' : ''}`}
                            onClick={() => setAmount(String(preset))}
                        >
                            {preset}
                        </button>
                    ))}
                </div>

                {/* Direction Toggle */}
                <button className="direction-toggle" onClick={swapDirection}>
                    <span className={direction === 'toGold' ? 'active' : ''}>
                        ₺ → 🥇
                    </span>
                    <RefreshCw size={14} />
                    <span className={direction === 'fromGold' ? 'active' : ''}>
                        🥇 → ₺
                    </span>
                </button>

                {/* Results */}
                <div className="converter-results">
                    <div className="result-row">
                        <span className="result-label">Alış Fiyatı</span>
                        <span className="result-value buy tabular-nums">
                            ₺{formatCurrency(conversion.buyTotal)}
                        </span>
                    </div>
                    <div className="result-row">
                        <span className="result-label">Satış Fiyatı</span>
                        <span className="result-value sell tabular-nums">
                            ₺{formatCurrency(conversion.sellTotal)}
                        </span>
                    </div>
                    <div className="result-row spread">
                        <span className="result-label">Fark (Spread)</span>
                        <span className="result-value spread-value tabular-nums">
                            ₺{formatCurrency(conversion.sellTotal - conversion.buyTotal)}
                        </span>
                    </div>
                </div>

                {/* Gram Equivalent Info */}
                {selectedGoldType !== 'gram' && parseFloat(amount) > 0 && (
                    <div className="gram-equivalent">
                        <span className="eq-icon">≈</span>
                        <span className="eq-text">
                            {formatCurrency(conversion.gramEquivalent)} gram altın değerinde
                        </span>
                    </div>
                )}

                {/* Price Reference */}
                {selectedPrice && (
                    <div className="price-reference">
                        <span>Birim fiyat: </span>
                        <span className="tabular-nums">
                            ₺{formatCurrency(selectedPrice.buy)} / ₺{formatCurrency(selectedPrice.sell)}
                        </span>
                    </div>
                )}
            </GlassCard>
        </section>
    );
};
