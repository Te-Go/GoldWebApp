import { GlassCard } from '../ui/GlassCard';
import { Scale, Coins } from 'lucide-react';
import './BulkPricing.css';

interface KiloPrice {
    id: string;
    name: string;
    purity: string;
    buy: number;
    sell: number;
    change: number;
}

interface SilverPrice {
    id: string;
    name: string;
    weight: string;
    buy: number;
    sell: number;
    change: number;
}

// Kilo Altın Fiyatları (For institutional/bulk buyers)
const kiloAltinData: KiloPrice[] = [
    { id: 'usdkg', name: 'USD/KG', purity: '(0.995)', buy: 146518, sell: 147226, change: 0.07 },
    { id: 'eurkg', name: 'EUR/KG', purity: '(0.995)', buy: 125625, sell: 126440, change: 0.10 },
    { id: 'trykg', name: 'TRY/KG', purity: '(0.995)', buy: 6317103, sell: 6361017, change: 0.15 },
];

// Gümüş Fiyatları (Silver prices)
const gumusData: SilverPrice[] = [
    { id: 'granul', name: 'Granül Gümüş', weight: '1 gr', buy: 115.493, sell: 125.525, change: -0.12 },
    { id: 'kulce50', name: 'Külçe Gümüş', weight: '50 gr', buy: 5341.27, sell: 8803.16, change: -0.08 },
    { id: 'kulce500', name: 'Külçe Gümüş', weight: '500 gr', buy: 56860.57, sell: 72473.65, change: -0.11 },
    { id: 'kulce1kg', name: 'Külçe Gümüş', weight: '1 kg', buy: 115534.02, sell: 125599.35, change: -0.09 },
];

export const BulkPricing = () => {
    const formatPrice = (price: number, decimals = 2) => {
        return price.toLocaleString('tr-TR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    return (
        <section className="bulk-pricing">
            {/* Kilo Altın */}
            <GlassCard className="bulk-card">
                <div className="bulk-header">
                    <div className="header-title">
                        <Scale size={20} className="header-icon gold" />
                        <h3>Kilo Altın</h3>
                    </div>
                    <span className="header-badge">Kurumsal</span>
                </div>

                <p className="bulk-desc">
                    Yatırım ve kurumsal alımlar için kilogram bazlı altın fiyatları
                </p>

                <div className="bulk-table">
                    <div className="table-header-row">
                        <span className="th-name">Birim</span>
                        <span className="th-price">Alış</span>
                        <span className="th-price">Satış</span>
                        <span className="th-change">%</span>
                    </div>

                    <div className="table-body">
                        {kiloAltinData.map((item) => (
                            <div key={item.id} className="table-row">
                                <div className="td-name">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-purity">{item.purity}</span>
                                </div>
                                <div className="td-price tabular-nums">
                                    {item.id === 'trykg' ? `₺${formatPrice(item.buy, 0)}` : `$${formatPrice(item.buy, 0)}`}
                                </div>
                                <div className="td-price tabular-nums">
                                    {item.id === 'trykg' ? `₺${formatPrice(item.sell, 0)}` : `$${formatPrice(item.sell, 0)}`}
                                </div>
                                <div className={`td-change tabular-nums ${item.change >= 0 ? 'text-up' : 'text-down'}`}>
                                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </GlassCard>

            {/* Gümüş */}
            <GlassCard className="bulk-card silver">
                <div className="bulk-header">
                    <div className="header-title">
                        <Coins size={20} className="header-icon silver" />
                        <h3>Gümüş Fiyatları</h3>
                    </div>
                    <span className="header-badge silver">Ag</span>
                </div>

                <div className="bulk-table">
                    <div className="table-header-row">
                        <span className="th-name">Tür</span>
                        <span className="th-weight">Ağırlık</span>
                        <span className="th-price">Alış</span>
                        <span className="th-price">Satış</span>
                    </div>

                    <div className="table-body">
                        {gumusData.map((item) => (
                            <div key={item.id} className="table-row">
                                <div className="td-name">
                                    <span className="item-name">{item.name}</span>
                                </div>
                                <div className="td-weight">
                                    <span className="weight-badge">{item.weight}</span>
                                </div>
                                <div className="td-price tabular-nums">
                                    ₺{formatPrice(item.buy)}
                                </div>
                                <div className="td-price tabular-nums">
                                    ₺{formatPrice(item.sell)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="bulk-note">
                    💡 Gümüş fiyatları ayrıntılı bilgi için yakında geliyor
                </p>
            </GlassCard>
        </section>
    );
};
