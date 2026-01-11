import { useGoldPrice, useMacro } from '../../context/GoldContext';
import { calculateGoldToGoods } from '../../data/mockPayload';
import { GlassCard } from '../ui/GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './GoldToGoods.css';

export const GoldToGoods = () => {
    const gramPrice = useGoldPrice('gram');
    const macro = useMacro();

    if (!gramPrice) return null;

    const goods = calculateGoldToGoods(gramPrice.sell, macro);

    const cards = [
        {
            icon: '🍞',
            title: 'Ekmek Endeksi',
            value: goods.bread.count,
            unit: 'Ekmek',
            comparison: `2020: ${goods.bread.comparison2020}`,
            trend: goods.bread.trend as 'up' | 'down',
        },
        {
            icon: '⛽',
            title: 'Benzin Endeksi',
            value: goods.fuel.liters,
            unit: 'Lt Benzin',
            comparison: `2020: ${goods.fuel.comparison2020} Lt`,
            trend: goods.fuel.trend as 'up' | 'down',
        },
        {
            icon: '📱',
            title: 'iPhone Endeksi',
            value: goods.iphone.ratio,
            unit: 'Gram = 1 iPhone',
            comparison: `1 Cumhuriyet ≈ ${goods.iphone.cumhuriyetRatio} iPhone`,
            trend: 'up' as const,
        },
    ];

    return (
        <section className="gold-to-goods">
            <h3 className="section-title">1 Gram Altın = ?</h3>

            <div className="goods-carousel scroll-x">
                {cards.map((card, idx) => (
                    <GlassCard key={idx} variant="hover" className="goods-card">
                        <div className="goods-icon">{card.icon}</div>
                        <div className="goods-content">
                            <div className="goods-title">{card.title}</div>
                            <div className="goods-value">
                                <span className="goods-number tabular-nums">{card.value}</span>
                                <span className="goods-unit">{card.unit}</span>
                            </div>
                            <div className={`goods-comparison ${card.trend === 'up' ? 'text-up' : 'text-down'}`}>
                                {card.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {card.comparison}
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
};
