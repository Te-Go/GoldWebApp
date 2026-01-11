import { useState, useMemo } from 'react';
import { useGoldPrices } from '../../context/GoldContext';
import { useWatchlist } from '../../context/WatchlistContext';
import { GlassCard } from '../ui/GlassCard';
import { TrendingUp, TrendingDown, Award, Building2, Scale, Gem, Star, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { forexRates, gramWeights, jewelryKarats, bankPrices, getBestBankPrices } from '../../data/extendedMarketData';
import { Sparkline, generateMockHistory } from '../charts/Sparkline';
import { AlertModal } from './AlertModal';
import './PriceTable.css';

type TabType = 'altin' | 'banka' | 'gram' | 'ziynet' | 'doviz';

const MOBILE_ROW_LIMIT = 6;

export const PriceTable = () => {
    const [activeTab, setActiveTab] = useState<TabType>('altin');
    const [alertModal, setAlertModal] = useState<{ id: string; name: string; price: number } | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const prices = useGoldPrices();
    const { favorites, isFavorite, toggleFavorite } = useWatchlist();
    const { bestBuy, bestSell } = getBestBankPrices();

    // Sort prices: favorites first, then by original order
    const sortedPrices = useMemo(() => {
        return [...prices].sort((a, b) => {
            const aFav = favorites.includes(a.id) ? 0 : 1;
            const bFav = favorites.includes(b.id) ? 0 : 1;
            return aFav - bFav;
        });
    }, [prices, favorites]);

    // Generate mock history for sparklines (in real app, this would come from API)
    const priceHistory = useMemo(() => {
        const history: Record<string, number[]> = {};
        prices.forEach(p => {
            history[p.id] = generateMockHistory(p.sell, 7);
        });
        return history;
    }, [prices]);

    const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
        { id: 'altin', label: 'Altın', icon: <Award size={16} /> },
        { id: 'banka', label: 'Bankalar', icon: <Building2 size={16} /> },
        { id: 'gram', label: 'Gram', icon: <Scale size={16} /> },
        { id: 'ziynet', label: 'Ziynet', icon: <Gem size={16} /> },
        { id: 'doviz', label: 'Döviz', icon: <TrendingUp size={16} /> },
    ];

    const formatPrice = (price: number, decimals = 2) => {
        return price.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };

    return (
        <section className="price-table-enhanced">
            <div className="table-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <GlassCard padding="none" className="table-card">
                {/* Altın (Gold Types) Tab */}
                {activeTab === 'altin' && (
                    <>
                        <div className="table-scroll-wrapper">
                            <div className="table-inner">
                                <div className="table-header-row">
                                    <span className="th-col th-fav"></span>
                                    <span className="th-col th-name">Altın Türü</span>
                                    <span className="th-col th-sell">Satış</span>
                                    <span className="th-col th-change">Değişim</span>
                                    <span className="th-col th-buy">Alış</span>
                                    <span className="th-col th-trend">Trend</span>
                                    <span className="th-col th-actions"></span>
                                </div>
                                <div className="table-body">
                                    {(isExpanded ? sortedPrices : sortedPrices.slice(0, MOBILE_ROW_LIMIT)).map((price) => (
                                        <div key={price.id} className={`table-row ${isFavorite(price.id) ? 'is-favorite' : ''}`}>
                                            <div className="td-col td-fav">
                                                <button
                                                    className={`fav-btn ${isFavorite(price.id) ? 'active' : ''}`}
                                                    onClick={() => toggleFavorite(price.id)}
                                                    title={isFavorite(price.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                                                >
                                                    <Star size={16} fill={isFavorite(price.id) ? 'var(--gold-primary)' : 'none'} />
                                                </button>
                                            </div>
                                            <div className="td-col td-name">
                                                <span className="gold-icon">{price.icon}</span>
                                                <div className="name-stack">
                                                    <span className="gold-name">{price.nameTr}</span>
                                                    <span className="gold-subname">{price.name}</span>
                                                </div>
                                            </div>
                                            <div className="td-col td-sell tabular-nums">
                                                ₺{formatPrice(price.sell)}
                                            </div>
                                            <div className={`td-col td-change ${price.changePercent >= 0 ? 'text-up' : 'text-down'}`}>
                                                {price.changePercent >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                <span className="tabular-nums">
                                                    {price.changePercent >= 0 ? '+' : ''}{price.changePercent.toFixed(2)}%
                                                </span>
                                            </div>
                                            <div className="td-col td-buy tabular-nums">
                                                ₺{formatPrice(price.buy)}
                                            </div>
                                            <div className="td-col td-trend">
                                                <Sparkline data={priceHistory[price.id] || []} height={30} />
                                            </div>
                                            <div className="td-col td-actions">
                                                <button
                                                    className="alert-btn"
                                                    title="Fiyat Alarmı Kur"
                                                    onClick={() => setAlertModal({ id: price.id, name: price.nameTr, price: price.sell })}
                                                >
                                                    <Bell size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Swipe hint for mobile */}
                        <div className="swipe-hint">
                            <span>← Kaydır →</span>
                        </div>
                        {sortedPrices.length > MOBILE_ROW_LIMIT && (
                            <button
                                className="show-more-btn"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? (
                                    <>
                                        <ChevronUp size={18} />
                                        <span>Daha Az Göster</span>
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown size={18} />
                                        <span>Daha Fazla Göster (+{sortedPrices.length - MOBILE_ROW_LIMIT})</span>
                                    </>
                                )}
                            </button>
                        )}
                    </>
                )}

                {/* Banka (Banks) Tab */}
                {activeTab === 'banka' && (
                    <>
                        <div className="table-header-row bank-header">
                            <span className="th-col th-name">Banka</span>
                            <span className="th-col th-buy">Gram Alış</span>
                            <span className="th-col th-sell">Gram Satış</span>
                            <span className="th-col th-spread">Fark</span>
                        </div>
                        <div className="table-body">
                            {bankPrices.map((bank) => {
                                const spread = bank.gramSell - bank.gramBuy;
                                const isBestBuy = bank.bankId === bestBuy.bankId;
                                const isBestSell = bank.bankId === bestSell.bankId;
                                return (
                                    <div key={bank.bankId} className="table-row bank-row">
                                        <div className="td-col td-name">
                                            <Building2 size={18} className="bank-icon" />
                                            <div className="name-stack">
                                                <span className="bank-name">{bank.shortName}</span>
                                                <span className="bank-time">{bank.lastUpdate}</span>
                                            </div>
                                        </div>
                                        <div className={`td-col td-buy tabular-nums ${isBestBuy ? 'best-price' : ''}`}>
                                            {isBestBuy && <span className="best-badge">EN İYİ</span>}
                                            ₺{formatPrice(bank.gramBuy)}
                                        </div>
                                        <div className={`td-col td-sell tabular-nums ${isBestSell ? 'best-price' : ''}`}>
                                            {isBestSell && <span className="best-badge">EN İYİ</span>}
                                            ₺{formatPrice(bank.gramSell)}
                                        </div>
                                        <div className="td-col td-spread tabular-nums text-muted">
                                            ₺{formatPrice(spread)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="table-footer">
                            <span className="footer-note">
                                💡 En düşük spread, en iyi alım-satım farkını gösterir
                            </span>
                        </div>
                    </>
                )}

                {/* Gram Weight Tab */}
                {activeTab === 'gram' && (
                    <>
                        <div className="table-header-row">
                            <span className="th-col th-name">Ağırlık</span>
                            <span className="th-col th-buy">Alış</span>
                            <span className="th-col th-sell">Satış</span>
                        </div>
                        <div className="table-body">
                            {gramWeights.map((weight) => (
                                <div key={weight.grams} className="table-row">
                                    <div className="td-col td-name">
                                        <Scale size={18} className="weight-icon" />
                                        <div className="name-stack">
                                            <span className="weight-label">{weight.label}</span>
                                            <span className="weight-desc">{weight.grams} Gram Altın</span>
                                        </div>
                                    </div>
                                    <div className="td-col td-buy tabular-nums">
                                        ₺{formatPrice(weight.buy)}
                                    </div>
                                    <div className="td-col td-sell tabular-nums">
                                        ₺{formatPrice(weight.sell)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Ziynet (Jewelry Karat) Tab */}
                {activeTab === 'ziynet' && (
                    <>
                        <div className="table-header-row">
                            <span className="th-col th-name">Ayar</span>
                            <span className="th-col th-buy">Alış (₺/gr)</span>
                            <span className="th-col th-sell">Satış (₺/gr)</span>
                        </div>
                        <div className="table-body">
                            {jewelryKarats.map((karat) => (
                                <div key={karat.karat} className="table-row">
                                    <div className="td-col td-name">
                                        <div className={`karat-badge karat-${karat.karat}`}>{karat.label}</div>
                                        <span className="karat-name">{karat.labelTr}</span>
                                    </div>
                                    <div className="td-col td-buy tabular-nums">
                                        ₺{formatPrice(karat.buy)}
                                    </div>
                                    <div className="td-col td-sell tabular-nums">
                                        ₺{formatPrice(karat.sell)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="table-footer">
                            <span className="footer-note">
                                💎 Ziynet altını kuyumcu işçilik fiyatlarını içermez
                            </span>
                        </div>
                    </>
                )}

                {/* Döviz (Forex) Tab */}
                {activeTab === 'doviz' && (
                    <>
                        <div className="table-header-row">
                            <span className="th-col th-name">Döviz</span>
                            <span className="th-col th-buy">Alış</span>
                            <span className="th-col th-sell">Satış</span>
                            <span className="th-col th-change">Değişim</span>
                        </div>
                        <div className="table-body">
                            {forexRates.map((rate) => (
                                <div key={rate.pair} className="table-row">
                                    <div className="td-col td-name">
                                        <span className="forex-pair">{rate.pair}</span>
                                        <span className="forex-name">{rate.pairTr}</span>
                                    </div>
                                    <div className="td-col td-buy tabular-nums">
                                        {rate.pair.includes('XAU') ? `$${formatPrice(rate.buy)}` : `₺${formatPrice(rate.buy)}`}
                                    </div>
                                    <div className="td-col td-sell tabular-nums">
                                        {rate.pair.includes('XAU') ? `$${formatPrice(rate.sell)}` : `₺${formatPrice(rate.sell)}`}
                                    </div>
                                    <div className={`td-col td-change ${rate.change >= 0 ? 'text-up' : 'text-down'}`}>
                                        {rate.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        <span className="tabular-nums">
                                            {rate.change >= 0 ? '+' : ''}{rate.change.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </GlassCard>

            <p className="data-source">
                Veriler: TCMB, Kapalı Çarşı, Banka API'leri • Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}
            </p>

            {
                alertModal && (
                    <AlertModal
                        isOpen={true}
                        onClose={() => setAlertModal(null)}
                        goldId={alertModal.id}
                        goldName={alertModal.name}
                        currentPrice={alertModal.price}
                    />
                )
            }
        </section >
    );
};
